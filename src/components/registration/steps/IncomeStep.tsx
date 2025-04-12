import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const IncomeStep = () => {
  const { data, updateData } = useRegistration();

  const handleSelectChange = (value: string) => {
    updateData("incomeBracket", value);
  };

  // Income brackets
  const incomeBrackets = [
    "Less than $25,000",
    "$25,000 - $49,999",
    "$50,000 - $74,999",
    "$75,000 - $99,999",
    "$100,000 - $149,999",
    "$150,000 - $199,999",
    "$200,000 or more",
    "Prefer not to say"
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your income bracket?</h2>
      <p className="text-gray-600 mb-6">This helps us show you relevant financial policies</p>
      
      <div className="mb-6">
        <Select value={data.incomeBracket} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Select income bracket" />
          </SelectTrigger>
          <SelectContent>
            {incomeBrackets.map((bracket) => (
              <SelectItem key={bracket} value={bracket.toLowerCase().replace(/\s+/g, '-')}>
                {bracket}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <NavigationButtons showSkip={true} />
    </div>
  );
};

export default IncomeStep;