"use client"

import { CircularProgressbar, buildStyles } from "react-circular-progressbar"

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="flex justify-center p-10">
      <CircularProgressbar
        styles={buildStyles({
          pathColor: percentage >= 100 ? "#EF4444" : "#3B82F6",
          trailColor: "#D1D5DB",
          textColor: percentage >= 100 ? "#EF4444" : "#3B82F6",
          textSize: 8,
        })}
        text={`${percentage}% Gastado`}
        value={percentage}
      />
    </div>
  )
}
