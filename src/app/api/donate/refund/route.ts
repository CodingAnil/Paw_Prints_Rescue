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
    const { order_id, refund_amount, refund_id, refund_note } = body;

    // Validate inputs
    if (!order_id || !refund_amount || !refund_id) {
      return NextResponse.json(
        { error: "order_id, refund_amount, and refund_id are required fields." },
        { status: 400 },
      );
    }

    const numericAmount = parseFloat(refund_amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return NextResponse.json(
        { error: "Please provide a valid numeric refund amount." },
        { status: 400 },
      );
    }

    console.log(`Initiating Cashfree refund request for order: ${order_id}, amount: ${numericAmount}`);

    const response = await cashfree.PGOrderCreateRefund(order_id, {
      refund_amount: numericAmount,
      refund_id,
      refund_note: refund_note || "Donation refund request",
    });

    return NextResponse.json({
      refund_id: response.data.refund_id,
      order_id: response.data.order_id,
      refund_amount: response.data.refund_amount,
      refund_status: response.data.refund_status,
      cf_refund_id: response.data.cf_refund_id,
    });
  } catch (error: any) {
    console.error("Refund request processing error:", error);
    const apiErrorMessage = error.response?.data?.message || error.message;
    return NextResponse.json(
      { error: apiErrorMessage || "Failed to initiate refund transaction via Cashfree" },
      { status: 500 },
    );
  }
}
