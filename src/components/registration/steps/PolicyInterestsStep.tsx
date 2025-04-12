import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Button } from "@/components/ui/button";
import { Globe, Stethoscope, School, Briefcase, Home, Scale, Building2, Users, Brain } from "lucide-react";

const PolicyInterestsStep = () => {
  const { data, updateData } = useRegistration();

  const togglePolicyInterest = (interest: string) => {
    const currentInterests = [...data.policyInterests];
    const index = currentInterests.indexOf(interest);
    
    if (index === -1) {
      // Add interest if not already selected
      updateData("policyInterests", [...currentInterests, interest]);
    } else {
      // Remove interest if already selected
      currentInterests.splice(index, 1);
      updateData("policyInterests", currentInterests);
    }
  };

  const isSelected = (interest: string) => {
    return data.policyInterests.includes(interest);
  };

  // Policy interest options with icons
  const policyOptions = [
    { id: "climate", label: "Climate", icon: <Globe className="mr-2" size={18} /> },
    { id: "healthcare", label: "Healthcare", icon: <Stethoscope className="mr-2" size={18} /> },
    { id: "education", label: "Education", icon: <School className="mr-2" size={18} /> },
    { id: "economy", label: "Economy", icon: <Briefcase className="mr-2" size={18} /> },
    { id: "housing", label: "Housing", icon: <Home className="mr-2" size={18} /> },
    { id: "criminal-justice", label: "Criminal Justice", icon: <Scale className="mr-2" size={18} /> },
    { id: "infrastructure", label: "Infrastructure", icon: <Building2 className="mr-2" size={18} /> },
    { id: "civil-rights", label: "Civil Rights", icon: <Users className="mr-2" size={18} /> },
    { id: "tech-innovation", label: "Tech & Innovation", icon: <Brain className="mr-2" size={18} /> },
    { id: "immigration-global", label: "Immigration & Global Affairs", icon: <Globe className="mr-2" size={18} /> },
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">What policy areas interest you?</h2>
      <p className="text-gray-600 mb-6">Select all that apply to personalize your feed</p>
      
      <div className="grid grid-cols-2 gap-3 mb-6">
        {policyOptions.map((option) => (
          <Button
            key={option.id}
            type="button"
            variant={isSelected(option.id) ? "default" : "outline"}
            className={`flex items-center justify-start p-4 ${
              isSelected(option.id) 
                ? "bg-blue-600 text-white border-blue-600" 
                : "bg-white text-gray-800 border-gray-200"
            }`}
            onClick={() => togglePolicyInterest(option.id)}
          >
            {option.icon}
            {option.label}
          </Button>
        ))}
      </div>
      
      <NavigationButtons />
    </div>
  );
};

export default PolicyInterestsStep;