import { Progress } from "@/components/ui/progress";
import { useRegistration } from "@/contexts/RegistrationContext";

const ProgressBar = () => {
  const { step, totalSteps } = useRegistration();
  const progressPercentage = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <Progress value={progressPercentage} className="h-2 bg-gray-200">
        <div className="h-full bg-red-500" style={{ width: `${progressPercentage}%` }} />
      </Progress>
    </div>
  );
};

export default ProgressBar;