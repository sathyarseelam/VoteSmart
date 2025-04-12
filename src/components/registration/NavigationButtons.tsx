import { useRegistration } from "@/contexts/RegistrationContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  showSkip?: boolean;
  showBackButton?: boolean;
  nextLabel?: string;
  onNext?: () => boolean | void;
  isLastStep?: boolean;
}

const NavigationButtons = ({ 
  showSkip = false, 
  showBackButton = true, 
  nextLabel = "Continue", 
  onNext,
  isLastStep = false
}: NavigationButtonsProps) => {
  const { goToNextStep, goToPreviousStep } = useRegistration();

  const handleNext = () => {
    // If onNext is provided and it returns false, don't proceed
    if (onNext && onNext() === false) {
      return;
    }
    goToNextStep();
  };

  return (
    <div className="flex justify-between mt-8">
      {showBackButton ? (
        <Button 
          variant="outline" 
          onClick={goToPreviousStep}
          className="flex items-center gap-2 px-6"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      ) : (
        <div></div>
      )}
      
      <div className="flex gap-4">
        {showSkip && (
          <Button 
            variant="ghost" 
            onClick={goToNextStep}
            className="px-6"
          >
            Skip
          </Button>
        )}
        
        <Button 
          onClick={handleNext}
          className={`${isLastStep ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} flex items-center gap-2 px-6`}
        >
          {nextLabel}
          {isLastStep ? null : <ArrowRight size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default NavigationButtons;