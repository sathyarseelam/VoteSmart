import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RegistrationProvider, useRegistration } from "@/contexts/RegistrationContext";
import Header from "@/components/Header";
import StepIndicator from "@/components/registration/StepIndicator";
import FirstNameStep from "@/components/registration/steps/FirstNameStep";
import LastNameStep from "@/components/registration/steps/LastNameStep";
import BirthDateStep from "@/components/registration/steps/BirthDateStep";
import EmailStep from "@/components/registration/steps/EmailStep";
import PasswordStep from "@/components/registration/steps/PasswordStep";
import GenderStep from "@/components/registration/steps/GenderStep";
import CountyStep from "@/components/registration/steps/CountyStep";
import IncomeStep from "@/components/registration/steps/IncomeStep";
import EducationStep from "@/components/registration/steps/EducationStep";
import FamilySizeStep from "@/components/registration/steps/FamilySizeStep";
import RaceEthnicityStep from "@/components/registration/steps/RaceEthnicityStep";
import PolicyInterestsStep from "@/components/registration/steps/PolicyInterestsStep";
import BenefitsStep from "@/components/registration/steps/BenefitsStep";
import VotingPreferenceStep from "@/components/registration/steps/VotingPreferenceStep";
import CompletionStep from "@/components/registration/steps/CompletionStep";

const RegistrationSteps = () => {
  const { step } = useRegistration();

  // Render the current step component based on the step value
  const renderStep = () => {
    switch (step) {
      case 1:
        return <FirstNameStep />;
      case 2:
        return <LastNameStep />;
      case 3:
        return <BirthDateStep />;
      case 4:
        return <EmailStep />;
      case 5:
        return <PasswordStep />;
      case 6:
        return <GenderStep />;
      case 7:
        return <CountyStep />;
      case 8:
        return <IncomeStep />;
      case 9:
        return <EducationStep />;
      case 10:
        return <FamilySizeStep />;
      case 11:
        return <RaceEthnicityStep />;
      case 12:
        return <PolicyInterestsStep />;
      case 13:
        return <BenefitsStep />;
      case 14:
        return <VotingPreferenceStep />;
      case 15:
        return <CompletionStep />;
      default:
        return <FirstNameStep />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-screen-lg mx-auto mt-4 px-4">
        <StepIndicator />
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

const Registration = () => {
  return (
    <RegistrationProvider>
      <RegistrationSteps />
    </RegistrationProvider>
  );
};

export default Registration;