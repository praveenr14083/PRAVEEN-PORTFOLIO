import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const doc = await db.collection("resume").doc("main").get();

    if (!doc.exists) {
      return NextResponse.json(
        { success: false, message: "Resume not found" },
        { status: 404 },
      );
    }

    const data = doc.data();

    return NextResponse.json({
      success: true,
      data: {
        id: doc.id,
        ...data,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch resume" },
      { status: 500 },
    );
  }
}
