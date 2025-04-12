import { useRegistration } from "@/contexts/RegistrationContext";
import NavigationButtons from "../NavigationButtons";
import { Checkbox } from "@/components/ui/checkbox";

const BenefitsStep = () => {
  const { data, updateData } = useRegistration();

  const toggleBenefit = (benefitId: string) => {
    const currentBenefits = [...data.benefits];
    const index = currentBenefits.indexOf(benefitId);
    
    if (index === -1) {
      // Add benefit if not already selected
      updateData("benefits", [...currentBenefits, benefitId]);
    } else {
      // Remove benefit if already selected
      currentBenefits.splice(index, 1);
      updateData("benefits", currentBenefits);
    }
  };

  const isChecked = (benefitId: string) => {
    return data.benefits.includes(benefitId);
  };

  // California benefits
  const benefitOptions = [
    { id: "calfresh", label: "CalFresh (Food Stamps)" },
    { id: "medi-cal", label: "Medi-Cal" },
    { id: "calworks", label: "CalWORKs" },
    { id: "wic", label: "WIC" },
    { id: "housing-assistance", label: "Housing Assistance" },
    { id: "eitc", label: "Earned Income Tax Credit" }
  ];

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-2">California Benefits</h2>
      <p className="text-gray-600 mb-6">Select any benefits you currently receive or are interested in</p>
      
      <div className="space-y-4 text-left mb-6">
        {benefitOptions.map((benefit) => (
          <div key={benefit.id} className="flex items-center space-x-2 p-4 border rounded-md">
            <Checkbox 
              id={benefit.id} 
              checked={isChecked(benefit.id)}
              onCheckedChange={() => toggleBenefit(benefit.id)}
            />
            <label htmlFor={benefit.id} className="text-base ml-2 cursor-pointer">
              {benefit.label}
            </label>
          </div>
        ))}
      </div>
      
      <NavigationButtons showSkip={true} nextLabel="Complete Registration" />
    </div>
  );
};

export default BenefitsStep;