import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of our registration data
interface RegistrationData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  county: string;
  incomeBracket: string;
  educationLevel: string;
  familySize: string;
  raceEthnicity: string;
  policyInterests: string[];
  benefits: string[];
  votingPreference: string;
}

// Default initial registration data
const initialRegistrationData: RegistrationData = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  email: "",
  password: "",
  confirmPassword: "",
  gender: "",
  county: "",
  incomeBracket: "",
  educationLevel: "",
  familySize: "",
  raceEthnicity: "",
  policyInterests: [],
  benefits: [],
  votingPreference: "",
};

interface RegistrationContextProps {
  data: RegistrationData;
  updateData: (field: keyof RegistrationData, value: any) => void;
  step: number;
  setStep: (step: number) => void;
  totalSteps: number;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}

const RegistrationContext = createContext<RegistrationContextProps | undefined>(undefined);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RegistrationData>(initialRegistrationData);
  const [step, setStep] = useState(1);
  const totalSteps = 15; // Updated to match all steps including completion

  const updateData = (field: keyof RegistrationData, value: any) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const goToNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const goToPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <RegistrationContext.Provider
      value={{
        data,
        updateData,
        step,
        setStep,
        totalSteps,
        goToNextStep,
        goToPreviousStep,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error("useRegistration must be used within a RegistrationProvider");
  }
  return context;
}