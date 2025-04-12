import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Label } from "@/components/ui/label";

const VotingPreferenceStep = () => {
  const { data, updateData } = useRegistration();

  // For this step, we need to create a custom radio component
  // that matches the design in the screenshots
  const CustomRadio = ({ id, value, label, description }: { id: string, value: string, label: string, description: string }) => (
    <div 
      className={`p-4 border rounded-md mb-3 cursor-pointer ${
        data.votingPreference === value ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => updateData("votingPreference", value)}
    >
      <div className="flex items-center">
        <div 
          className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
            data.votingPreference === value ? 'border-blue-600' : 'border-gray-400'
          }`}
        >
          {data.votingPreference === value && (
            <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          )}
        </div>
        <div>
          <Label htmlFor={id} className="font-medium cursor-pointer">{label}</Label>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">How do you prefer to vote?</h2>
      <p className="text-gray-600 mb-6">This helps us provide relevant voting information</p>
      
      <div className="space-y-3 mb-6 text-left">
        <CustomRadio 
          id="vote-by-mail" 
          value="vote-by-mail"
          label="Vote by Mail" 
          description="Receive and return ballot by mail"
        />
        
        <CustomRadio 
          id="early-voting" 
          value="early-voting"
          label="Early Voting" 
          description="Vote in person before election day"
        />
        
        <CustomRadio 
          id="election-day" 
          value="election-day"
          label="Election Day" 
          description="Vote in person on election day"
        />
        
        <CustomRadio 
          id="undecided" 
          value="undecided"
          label="Undecided" 
          description="Not sure yet how I'll vote"
        />
      </div>
      
      <NavigationButtons nextLabel="Complete Registration" isLastStep={true} />
    </div>
  );
};

export default VotingPreferenceStep;