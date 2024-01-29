import { useState } from 'react';

interface Step {
  label: string;
  icon?: string;
};

type StepperProps = {
  steps: Step[];
};

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div key={index}>
          <button onClick={() => setActiveStep(index)}>{index + 1}</button>
          <div>{step.label}</div>
        </div>
      ))}
      <div className="feedback">{/* Temporary feedback messages */}</div>
    </div>
  );
};

export default Stepper;
