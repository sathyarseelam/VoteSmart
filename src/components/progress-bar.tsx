"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Check, Mail } from "lucide-react"

interface ProgressBarProps {
  steps: number
  currentStep: number
  className?: string
}

export function ProgressBar({ steps, currentStep, className }: ProgressBarProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Calculate progress percentage
    const percentage = ((currentStep - 1) / (steps - 1)) * 100
    setProgress(percentage)
  }, [currentStep, steps])

  return (
    <div className={cn("relative w-full max-w-md mx-auto py-6", className)}>
      {/* Path */}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue to-red transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Moving envelope */}
      <div
        className="absolute top-0 transform -translate-y-1/4 transition-all duration-500 ease-in-out"
        style={{ left: `calc(${progress}% - 20px)` }}
      >
        <div
          className={`w-10 h-10 rounded-full bg-blue text-white flex items-center justify-center ${
            progress < 100 ? "animate-pulse-slow" : ""
          }`}
        >
          {progress === 100 ? <Check className="h-5 w-5" /> : <Mail className="h-5 w-5" />}
        </div>
      </div>
    </div>
  )
}
