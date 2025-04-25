"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="relative w-64 h-64 mx-auto">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: `rgb(var(--color-${
            percentage >= 100 ? "glitch-bar" : "primary-bar"
          }))`,
          trailColor: "rgb(var(--color-surface-bar)/0.3)",
          textColor: `rgb(var(--color-${
            percentage >= 100 ? "glitch-bar" : "primary-bar"
          }))`,
          textSize: "32px",
          pathTransitionDuration: 1.5,
          pathTransition: "easeInOut",
        })}
        value={percentage}
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="font-mono text-sm neon-text text-primary">
          {percentage >= 100 ? "LÍMITE_ALCANZADO" : "EN_USO"}
        </span>
        <span className="font-mono text-4xl neon-text-bold">{percentage}%</span>
      </div>
    </div>
  )
}
