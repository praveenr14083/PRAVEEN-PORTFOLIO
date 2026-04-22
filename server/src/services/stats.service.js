import Project from "../models/project.model.js";
import { Skill } from "../models/skill.model.js";
import { Technology } from "../models/technology.model.js";
import { Certificate } from "../models/certificate.model.js";
import { Education } from "../models/education.model.js";
import { Experience } from "../models/experience.model.js";

export const getStats = async () => {
  const [projects, tech, skills, certificates, education, experience] = await Promise.all([
    Project.countDocuments(),
    Technology.countDocuments(),
    Skill.countDocuments(),
    Certificate.countDocuments(),
    Education.countDocuments(),
    Experience.countDocuments(),
  ]);

  return {
    projects,
    tech,
    skills,
    certificates,
    education,
    experience,
  };
};
