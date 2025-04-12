import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RaceEthnicityStep = () => {
  const { data, updateData } = useRegistration();

  const handleSelectChange = (value: string) => {
    updateData("raceEthnicity", value);
  };

  // Race/ethnicity options
  const raceEthnicityOptions = [
    "American Indian or Alaska Native",
    "Asian",
    "Black or African American",
    "Hispanic or Latino",
    "Native Hawaiian or Other Pacific Islander",
    "White",
    "Two or more races",
    "Other",
    "Prefer not to say"
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your race/ethnicity?</h2>
      <p className="text-gray-600 mb-6">This is optional and helps us understand representation</p>
      
      <div className="mb-6">
        <Select value={data.raceEthnicity} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Select race/ethnicity" />
          </SelectTrigger>
          <SelectContent>
            {raceEthnicityOptions.map((option) => (
              <SelectItem key={option} value={option.toLowerCase().replace(/\s+/g, '-')}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <NavigationButtons showSkip={true} />
    </div>
  );
};

export default RaceEthnicityStep;