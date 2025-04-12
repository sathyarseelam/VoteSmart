import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CountyStep = () => {
  const { data, updateData } = useRegistration();

  const handleSelectChange = (value: string) => {
    updateData("county", value);
  };

  // Sample list of California counties
  const counties = [
    "Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa", 
    "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo", 
    "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa", 
    "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange", 
    "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino", 
    "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo", 
    "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou", 
    "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare", 
    "Tuolumne", "Ventura", "Yolo", "Yuba"
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What county do you live in?</h2>
      <p className="text-gray-600 mb-6">This helps us show you relevant local elections</p>
      
      <div className="mb-6">
        <Select value={data.county} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-full text-left">
            <SelectValue placeholder="Select your county" />
          </SelectTrigger>
          <SelectContent>
            {counties.map((county) => (
              <SelectItem key={county} value={county.toLowerCase()}>
                {county}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <NavigationButtons showSkip={true} />
    </div>
  );
};

export default CountyStep;