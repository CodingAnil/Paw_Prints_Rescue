import { Cashfree, CFEnvironment } from "cashfree-pg";
import { NextResponse } from "next/server";

const environment =
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

const cashfree = new Cashfree(
  environment,
  process.env.CASHFREE_CLIENT_ID || "",
  process.env.CASHFREE_CLIENT_SECRET || ""
);

// Define a global cache to track processed orders in-memory to prevent double-logging
const globalForCache = global as typeof globalThis & {
  processedOrders?: Set<string>;
};
if (!globalForCache.processedOrders) {
  globalForCache.processedOrders = new Set<string>();
}
const processedOrders = globalForCache.processedOrders;

/**
 * Logs a successful donation to the configured Google Sheet
 */
export async function logDonationToSpreadsheet(
  name: string,
  email: string,
  phone: string,
  amount: number,
  orderId: string,
  source?: string,
) {
  if (processedOrders.has(orderId)) {
    console.log(`Donation ${orderId} already logged, skipping duplicate.`);
    return true;
  }

  const scriptFirst = process.env.NEXT_PUBLIC_DONATION_SCRIPT_URL_FIRST ?? "";
  const scriptSecond = process.env.NEXT_PUBLIC_DONATION_SCRIPT_URL_SECOND ?? "";
  const activeScriptKey = process.env.NEXT_PUBLIC_DONATION_FILE_USED;

  const sourceToUse = source || activeScriptKey;
  const scriptURL = sourceToUse === "paw&prints" ? scriptFirst : scriptSecond;

  if (!scriptURL) {
    console.error("Spreadsheet URL not configured for source:", sourceToUse);
    return false;
  }

  try {
    const contactInfo = `${name} - ${phone} / ${email} (Order: ${orderId})`;
    console.log("Sending logging request to Google Sheet script:", scriptURL);

    const response = await fetch(scriptURL, {
      method: "POST",
      body: JSON.stringify({
        contact: contactInfo,
        amount: amount,
        source: sourceToUse,
      }),
    });

    if (response.ok) {
      processedOrders.add(orderId);
      console.log(`Successfully logged order ${orderId} to Google Sheet.`);
      return true;
    } else {
      console.error(`Google Sheet logging failed with HTTP status: ${response.status}`);
      return false;
    }
  } catch (error) {
    console.error("Google Sheet logging network/JSON error:", error);
    return false;
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const orderId = searchParams.get("order_id");
    let source = searchParams.get("source") || undefined;

    if (!orderId) {
      return NextResponse.json(
        { error: "order_id is a required parameter" },
        { status: 400 },
      );
    }

    // Decode source from orderId if not explicitly provided in URL params
    if (!source && orderId) {
      const orderIdParts = orderId.split("_");
      const lastPart = orderIdParts[orderIdParts.length - 1];
      if (lastPart && lastPart !== "default") {
        source = lastPart.replace("__and__", "&");
      }
    }

    console.log("Verifying Cashfree order status for order ID:", orderId);
    const response = await cashfree.PGFetchOrder(orderId);

    const orderStatus = response.data.order_status;
    const paymentSuccess = orderStatus === "PAID";

    if (paymentSuccess) {
      const name = response.data.customer_details?.customer_name || "Anonymous Donor";
      const email = response.data.customer_details?.customer_email || "";
      const phone = response.data.customer_details?.customer_phone || "";
      const amount = response.data.order_amount || 0;

      // Safe spreadsheet logging with duplicate prevention
      await logDonationToSpreadsheet(name, email, phone, amount, orderId, source);
    }

    return NextResponse.json({
      order_id: response.data.order_id,
      order_status: orderStatus,
      order_amount: response.data.order_amount,
      order_currency: response.data.order_currency,
      payment_success: paymentSuccess,
      customer_details: response.data.customer_details,
    });
  } catch (error: any) {
    console.error("Verification endpoint error:", error);
    const apiErrorMessage = error.response?.data?.message || error.message;
    return NextResponse.json(
      { error: apiErrorMessage || "Failed to retrieve payment verification status" },
      { status: 500 },
    );
  }
}
