import { LucideIcon } from 'lucide-react'

type SkillCardProps = {
  title: string
  description: string
  Icon: LucideIcon
  skills: string[]
}

export function SkillCard({ title, description, Icon, skills }: SkillCardProps) {
  return (
    <div className="w-full bg-foreground/4 backdrop-blur-2xl border flex flex-col gap-6 p-6 rounded">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-2 bg-primary-color text-white rounded">
          <Icon size={20} />
        </div>
        <h2 className="font-semibold">{title}</h2>
      </div>

      {/* Description */}
      <p className="text-muted-foreground">{description}</p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <div key={index} className="bg-foreground/4 inline-flex items-center gap-2 p-2 rounded">
            <p className="text-sm">{skill}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
