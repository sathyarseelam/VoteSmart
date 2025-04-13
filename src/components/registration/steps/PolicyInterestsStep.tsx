import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Stethoscope,
  School,
  Briefcase,
  Home,
  Scale,
  Building2,
  Users,
  Brain,
} from "lucide-react";
import { useState } from "react";

const PolicyInterestsStep = () => {
  const { data, updateData } = useRegistration();
  const [selectedStances, setSelectedStances] = useState<Record<string, string>>(data.policyStances || {});

  const togglePolicyInterest = (interest: string) => {
    const currentInterests = [...data.policyInterests];
    const index = currentInterests.indexOf(interest);

    if (index === -1) {
      updateData("policyInterests", [...currentInterests, interest]);
    } else {
      currentInterests.splice(index, 1);
      updateData("policyInterests", currentInterests);
      const updatedStances = { ...selectedStances };
      delete updatedStances[interest];
      setSelectedStances(updatedStances);
      updateData("policyStances", updatedStances);
    }
  };

  const updateStance = (interest: string, stance: string) => {
    const updated = { ...selectedStances, [interest]: stance };
    setSelectedStances(updated);
    updateData("policyStances", updated);
  };

  const isSelected = (interest: string) => {
    return data.policyInterests.includes(interest);
  };

  const policyOptions = [
    { id: "civil-rights", label: "✊ Civil Rights" },
    { id: "climate", label: "🌎 Climate" },
    { id: "criminal-justice", label: "🏛️ Criminal Justice" },
    { id: "education", label: "📚 Education" },
    { id: "economy", label: "💼 Economy" },
    { id: "healthcare", label: "🏥 Healthcare" },
    { id: "housing", label: "🏠 Housing" },
    { id: "immigration-global", label: "🤝 Immigration & Global Affairs" },
    { id: "infrastructure", label: "🏙️ Infrastructure" },
    { id: "tech-innovation", label: "🧠 Tech & Innovation" },
  ];

  const stanceColors: Record<string, string> = {
    Left: "bg-blue-500 text-white border-blue-500",
    Neutral: "bg-gray-400 text-white border-gray-400",
    Right: "bg-red-500 text-white border-red-500",
  };

  return (
    <div className="text-left">
      <h2 className="text-2xl font-bold mb-2">What policy areas interest you?</h2>
      <p className="text-gray-600 mb-6">Select the policy areas that interest you. For each one, you can optionally choose if you lean Left, Neutral, or Right — this helps us personalize your feed even better.</p>

      <div className="grid grid-cols-1 gap-3 mb-6">
        {policyOptions.map((option) => (
          <div key={option.id}>
            <Button
              type="button"
              variant={isSelected(option.id) ? "default" : "outline"}
              className={`flex items-center justify-start p-4 w-full mb-2 ${
                isSelected(option.id)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
              onClick={() => togglePolicyInterest(option.id)}
            >
              {option.label}
            </Button>

            {isSelected(option.id) && (
              <div className="flex justify-center space-x-2 mb-4">
                {["Left", "Neutral", "Right"].map((stance) => {
                  const isSelectedStance = selectedStances[option.id] === stance;
                  return (
                    <Button
                      key={stance}
                      onClick={() => updateStance(option.id, stance)}
                      className={`text-xs ${
                        isSelectedStance
                          ? stanceColors[stance]
                          : "bg-white text-gray-800 border-gray-200"
                      }`}
                      variant="outline"
                    >
                      {stance}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <NavigationButtons />
    </div>
  );
};

export default PolicyInterestsStep;