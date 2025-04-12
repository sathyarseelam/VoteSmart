
import { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Input } from "@/components/ui/input";
import { Calendar } from "lucide-react";

const BirthDateStep = () => {
  const { data, updateData } = useRegistration();
  const [error, setError] = useState("");

  const validateAndProceed = () => {
    if (!data.dateOfBirth) {
      setError("Please enter your date of birth");
      return false;
    }
    
    // Basic date validation
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(data.dateOfBirth)) {
      setError("Please enter a valid date in YYYY-MM-DD format");
      return false;
    }
    
    setError("");
    return true;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">When were you born?</h2>
      <p className="text-gray-600 mb-6">We'll use this to show you relevant election information</p>
      
      <div className="mb-6 text-left">
        <label htmlFor="dateOfBirth" className="block mb-2 font-medium">Date of Birth</label>
        <div className="relative">
          <Input
            id="dateOfBirth"
            type="date"
            placeholder="mm/dd/yyyy"
            value={data.dateOfBirth}
            onChange={(e) => updateData("dateOfBirth", e.target.value)}
            className="w-full pr-10"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <NavigationButtons onNext={validateAndProceed} />
    </div>
  );
};

export default BirthDateStep;