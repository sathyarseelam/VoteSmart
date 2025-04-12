import { useState } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

const PasswordStep = () => {
  const { data, updateData } = useRegistration();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const validateAndProceed = () => {
    if (!data.password) {
      setError("Please create a password");
      return false;
    }
    
    if (data.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    
    setError("");
    return true;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">Create a password</h2>
      <p className="text-gray-600 mb-6">Make sure it's secure and easy to remember</p>
      
      <div className="mb-6 text-left">
        <label htmlFor="password" className="block mb-2 font-medium">Password</label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            value={data.password}
            onChange={(e) => updateData("password", e.target.value)}
            className="w-full pr-10"
          />
          <button 
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
      
      <div className="mb-6 text-left">
        <label htmlFor="confirmPassword" className="block mb-2 font-medium">Confirm Password</label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={data.confirmPassword}
            onChange={(e) => updateData("confirmPassword", e.target.value)}
            className="w-full pr-10"
          />
          <button 
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
      
      <NavigationButtons onNext={validateAndProceed} />
    </div>
  );
};

export default PasswordStep;