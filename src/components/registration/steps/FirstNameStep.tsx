import { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Input } from "@/components/ui/input";

const FirstNameStep = () => {
  const { data, updateData } = useRegistration();
  const [error, setError] = useState("");

  const validateAndProceed = () => {
    if (!data.firstName.trim()) {
      setError("Please enter your first name");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your first name?</h2>
      <p className="text-gray-600 mb-6">We'll use this to personalize your experience</p>
      
      <div className="mb-6 text-left">
        <label htmlFor="firstName" className="block mb-2 font-medium">First Name</label>
        <Input
          id="firstName"
          type="text"
          placeholder="Enter your first name"
          value={data.firstName}
          onChange={(e) => updateData("firstName", e.target.value)}
          className="w-full"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <NavigationButtons 
        showBackButton={false} 
        onNext={validateAndProceed} 
      />
    </div>
  );
};

export default FirstNameStep;