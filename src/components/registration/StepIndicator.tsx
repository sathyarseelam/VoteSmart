import { Mail, CheckCircle } from "lucide-react";
import { useRegistration } from "@/contexts/RegistrationContext";

const StepIndicator = () => {
  const { step, totalSteps } = useRegistration();
  
  const getStepColor = (currentStep: number) => {
    // Create a gradient from blue to purple to red
    const colors = [
      "bg-blue-600", // Start color
      "bg-blue-500",
      "bg-purple-600",
      "bg-purple-500",
      "bg-red-600" // End color
    ];
    
    const index = Math.floor((currentStep / totalSteps) * (colors.length - 1));
    return colors[index];
  };

  return (
    <div className="w-full max-w-md mx-auto flex justify-center items-center my-8">
      <div className="relative w-full h-2 bg-gray-200 rounded-full">
        <div 
          className={`absolute left-0 top-0 h-2 rounded-full ${getStepColor(step)}`} 
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>
      
      <div 
        className={`${getStepColor(step)} rounded-full p-3 ml-2 flex items-center justify-center`}
      >
        {step === totalSteps ? (
          <CheckCircle className="text-white" size={20} />
        ) : (
          <Mail className="text-white" size={20} />
        )}
      </div>
    </div>
  );
};

export default StepIndicator;