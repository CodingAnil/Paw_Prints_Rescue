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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, name, email, phone, source } = body;

    // Validate request inputs
    if (!amount || !name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email, phone, and amount are required." },
        { status: 400 },
      );
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "Please enter a valid donation amount." },
        { status: 400 },
      );
    }

    // Cashfree customer phone validation: standard 10 digit check
    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10) {
      return NextResponse.json(
        { error: "Please provide a valid 10-digit mobile number." },
        { status: 400 },
      );
    }

    // Safely encode special characters for Cashfree order ID validation requirements
    const encodedSource = (source || "default").replace("&", "__and__").replace(/[^a-zA-Z0-9-_.]/g, "");
    const orderId = `ord_${Date.now()}_${Math.floor(Math.random() * 1000)}_${encodedSource}`;
    const customerId = `cust_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const origin = req.headers.get("origin") || "";

    const requestBody = {
      order_amount: numericAmount,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: customerId,
        customer_name: name,
        customer_email: email,
        customer_phone: cleanPhone,
      },
      order_meta: {
        return_url: `${origin}/donate?order_id=${orderId}&source=${encodeURIComponent(source || "")}`,
      },
    };

    console.log("Initiating Cashfree order:", orderId);
    const response = await cashfree.PGCreateOrder(requestBody);

    return NextResponse.json({
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
      order_status: response.data.order_status,
    });
  } catch (error: any) {
    console.error("Cashfree Order Creation Error:", error);
    const apiErrorMessage = error.response?.data?.message || error.message;
    return NextResponse.json(
      { error: apiErrorMessage || "Failed to create donation session with Cashfree" },
      { status: 500 },
    );
  }
}
