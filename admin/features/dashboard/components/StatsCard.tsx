import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

type StatsCardProps = {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
}

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
}: StatsCardProps) {
  return (
    <Card className="p-4">
      <CardContent className="flex items-start justify-between p-0">
        {/* Left */}
        <div>
          <p className="text-sm">{title}</p>
          <h2 className="mt-3 text-4xl font-bold">{value}</h2>
        </div>

        {/* Right Icon */}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
          <Icon className="size-5" />
        </div>
      </CardContent>
      <CardFooter className="m-0 p-0">
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardFooter>
    </Card>
  )
}
