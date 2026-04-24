import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Project, Resume, Skill, Education, Experience, Technology, Certificate } from "@/models/Portfolio";

export async function GET() {
  try {
    await connectDB();

    const [projects, resume, skills, education, experience, technologies, certificates] = await Promise.all([
      Project.find({ status: "published" }).sort({ featured: -1, createdAt: -1 }),
      Resume.findOne().sort({ createdAt: -1 }),
      Skill.find().sort({ createdAt: -1 }),
      Education.find().sort({ startDate: -1 }),
      Experience.find().sort({ startDate: -1 }),
      Technology.find().sort({ createdAt: -1 }),
      Certificate.find().sort({ createdAt: -1 }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        projects,
        resume,
        skills,
        education,
        experience,
        technologies,
        certificates,
      },
    });
  } catch (error: any) {
    console.error("Portfolio API Error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch portfolio data", error: error.message },
      { status: 500 }
    );
  }
}
