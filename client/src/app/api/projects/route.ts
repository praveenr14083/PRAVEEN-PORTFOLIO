import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    // 🔥 Fetch all projects sorted by createdAt (no composite index needed)
    const query = db.collection("projects").orderBy("createdAt", "desc");
    const snapshot = await query.get();

    let data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // 🔥 Filter by category in application code if provided
    if (category && category !== "all") {
      data = data.filter((project: any) => project.category === category);
    }

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
