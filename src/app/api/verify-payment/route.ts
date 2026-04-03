import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // In a real application, you would parse the body and verify the PayU webhook signature here.
  // const data = await request.json();

  return NextResponse.json({ success: true });
}
