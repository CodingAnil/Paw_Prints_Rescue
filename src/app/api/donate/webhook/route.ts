import { NextResponse } from "next/server";
import crypto from "crypto";
import { logDonationToSpreadsheet } from "../verify/route";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-webhook-signature");
    const timestamp = req.headers.get("x-webhook-timestamp");

    if (!signature || !timestamp) {
      console.warn("Webhook request missing signature or timestamp headers");
      return NextResponse.json({ error: "Missing authentication headers" }, { status: 400 });
    }

    const clientSecret = process.env.CASHFREE_CLIENT_SECRET;
    if (!clientSecret) {
      console.error("CASHFREE_CLIENT_SECRET environment variable is not defined");
      return NextResponse.json({ error: "Internal server configuration error" }, { status: 500 });
    }

    // Cashfree Webhook Signature Generation: concatenating timestamp and raw body
    const signedPayload = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac("sha256", clientSecret)
      .update(signedPayload)
      .digest("base64");

    if (signature !== expectedSignature) {
      console.warn("Webhook signature mismatch detected");
      return NextResponse.json({ error: "Invalid signature verification" }, { status: 401 });
    }

    console.log("Cashfree webhook signature verified successfully.");
    const payload = JSON.parse(rawBody);

    // Process payment success notification
    if (payload.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderData = payload.data?.order;
      const paymentData = payload.data?.payment;
      const customerData = payload.data?.customer_details;

      if (paymentData?.payment_status === "SUCCESS" && orderData?.order_id) {
        const orderId = orderData.order_id;
        const amount = orderData.order_amount || 0;
        const name = customerData?.customer_name || "Anonymous Donor";
        const email = customerData?.customer_email || "";
        const phone = customerData?.customer_phone || "";

        // Extract and decode source parameter from orderId if embedded
        let source: string | undefined = undefined;
        const orderIdParts = orderId.split("_");
        const lastPart = orderIdParts[orderIdParts.length - 1];
        if (lastPart && lastPart !== "default") {
          source = lastPart.replace("__and__", "&");
        }

        console.log(`Webhook: Processing successful order ${orderId} for ${amount} INR`);

        // Log the donation to the spreadsheet (handles duplicate protection internally)
        await logDonationToSpreadsheet(name, email, phone, amount, orderId, source);
      }
    }

    // Always return 200 OK to acknowledge receipt of the webhook to prevent retries
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook endpoint processing error:", error);
    return NextResponse.json({ error: "Internal processing error" }, { status: 500 });
  }
}
