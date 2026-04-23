import { api } from "@/lib/api"

export interface Skill {
  _id: string
  name: string
  description?: string
  icon?: string
  technologies: string[]
}

export const getSkills = async (): Promise<Skill[]> => {
  const { data } = await api.get("/skills")
  return data.data
}

export const createSkill = async (
  skillData: Partial<Skill>
): Promise<Skill> => {
  const payload = {
    ...skillData,
    technologies: Array.isArray(skillData.technologies)
      ? skillData.technologies.join(",")
      : skillData.technologies,
  }
  const { data } = await api.post("/skills", payload)
  return data.data
}

export const updateSkill = async ({
  id,
  skillData,
}: {
  id: string
  skillData: Partial<Skill>
}): Promise<Skill> => {
  const payload = {
    ...skillData,
    technologies: Array.isArray(skillData.technologies)
      ? skillData.technologies.join(",")
      : skillData.technologies,
  }
  const { data } = await api.put(`/skills/${id}`, payload)
  return data.data
}

export const deleteSkill = async (id: string): Promise<void> => {
  await api.delete(`/skills/${id}`)
}
