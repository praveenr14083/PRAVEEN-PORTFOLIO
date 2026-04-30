'use client'

export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-y-hidden ">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-primary-color text-4xl animate-spin flex items-center justify-center border-t-primary-color rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-white text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"></div>
        </div>
      </div>

      {/* Soft Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-primary-color/10 rounded-full blur-[120px]"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
      </div>
    </div>
  )
}
