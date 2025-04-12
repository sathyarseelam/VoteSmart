import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FamilySizeStep = () => {
  const { data, updateData } = useRegistration();

  const handleSelectChange = (value: string) => {
    updateData("familySize", value);
  };

  // Family sizes
  const familySizes = [
    "1 (Just me)",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7+",
    "Prefer not to say"
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your family size?</h2>
      <p className="text-gray-600 mb-6">This helps us show relevant family policies</p>
      
      <div className="mb-6">
        <Select value={data.familySize} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Select family size" />
          </SelectTrigger>
          <SelectContent>
            {familySizes.map((size) => (
              <SelectItem key={size} value={size.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <NavigationButtons showSkip={true} />
    </div>
  );
};

export default FamilySizeStep;