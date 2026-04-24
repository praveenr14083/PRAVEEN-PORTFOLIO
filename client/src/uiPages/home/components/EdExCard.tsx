type EdExCardProps = {
  data: {
    id: string
    year: string
    title: string
    description: string
    percentage?: string
    isCurrent?: boolean
  }
}

export function EdExCard({ data }: EdExCardProps) {
  return (
    // Wrap Round and Content Section
    <div className="w-full flex gap-1">
      <div className="flex flex-col items-center">
        {/*Round and Vertical line */}
        <div
          className={`p-2 rounded-full ${data.isCurrent ? 'bg-green-500 animate-pulse' : 'bg-primary-color'}`}
        />

        {/* Vertical Line */}
        <div className="border-l-1 border-dashed border-primary-color h-full w-[1px]"></div>
      </div>

      {/* Content */}
      <div className="w-full space-y-4 p-5">
        {/* Year */}
        <p className="text-primary-color">{data.year}</p>

        {/* Course and Institute */}
        <div className="space-y-1">
          <h1 className="text-lg font-semibold">{data.title}</h1>
          <p className="text-muted-foreground">{data.description}</p>
        </div>

        {/* Percentage */}
        {data?.percentage && (
          <p className="border border-primary-color rounded-tl-full rounded-tr-full rounded-br-full  px-4 py-2 inline">
            {data.percentage}
          </p>
        )}
      </div>
    </div>
  )
}
