import { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Input } from "@/components/ui/input";

const EmailStep = () => {
  const { data, updateData } = useRegistration();
  const [error, setError] = useState("");

  const validateAndProceed = () => {
    if (!data.email.trim()) {
      setError("Please enter your email address");
      return false;
    }

    // Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(data.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    
    setError("");
    return true;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What's your email?</h2>
      <p className="text-gray-600 mb-6">We'll use this to log you in and send important updates</p>
      
      <div className="mb-6 text-left">
        <label htmlFor="email" className="block mb-2 font-medium">Email Address</label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={(e) => updateData("email", e.target.value)}
          className="w-full"
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <NavigationButtons onNext={validateAndProceed} />
    </div>
  );
};

export default EmailStep;