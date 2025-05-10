// components/Steps.tsx
import React from "react";
import clsx from "clsx";

interface StepsProps {
  currentStep: number;
  steps: string[];
}

const Steps: React.FC<StepsProps> = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-center items-center gap-8 mb-10">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        return (
          <div key={label} className="flex items-center gap-2">
            <div
              className={clsx(
                "rounded-full w-10 h-10 flex items-center justify-center font-bold",
                isActive ? "bg-[#2A2A6D] text-white" : "bg-gray-200 text-gray-800"
              )}
            >
              {stepNumber}
            </div>
            <span className={isActive ? "font-semibold" : "text-gray-500"}>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Steps;
