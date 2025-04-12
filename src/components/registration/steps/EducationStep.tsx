import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EducationStep = () => {
  const { data, updateData } = useRegistration();

  const handleSelectChange = (value: string) => {
    updateData("educationLevel", value);
  };

  // Education levels
  const educationLevels = [
    "Less than high school",
    "High school graduate",
    "Some college",
    "Associate's degree",
    "Bachelor's degree",
    "Master's degree",
    "Professional degree",
    "Doctorate degree",
    "Prefer not to say"
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your education level?</h2>
      <p className="text-gray-600 mb-6">This helps us tailor education policy information</p>
      
      <div className="mb-6">
        <Select value={data.educationLevel} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            {educationLevels.map((level) => (
              <SelectItem key={level} value={level.toLowerCase().replace(/\s+/g, '-')}>
                {level}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <NavigationButtons showSkip={true} />
    </div>
  );
};

export default EducationStep;