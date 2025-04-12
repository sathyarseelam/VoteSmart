import { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Input } from "@/components/ui/input";

const LastNameStep = () => {
  const { data, updateData } = useRegistration();
  const [error, setError] = useState("");

  const validateAndProceed = () => {
    if (!data.lastName.trim()) {
      setError("Please enter your last name");
      return false;
    }
    setError("");
    return true;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your last name?</h2>
      <p className="text-gray-600 mb-6">We'll use this to personalize your experience</p>
      
      <div className="mb-6 text-left">
        <label htmlFor="lastName" className="block mb-2 font-medium">Last Name</label>
        <Input
          id="lastName"
          type="text"
          placeholder="Enter your last name"
          value={data.lastName}
          onChange={(e) => updateData("lastName", e.target.value)}
          className="w-full"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <NavigationButtons onNext={validateAndProceed} />
    </div>
  );
};

export default LastNameStep;