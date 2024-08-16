import React, { useState } from 'react';
import PersonalInformation from './components/PersonalInformation';
import AddressInformation from './components/AddressInformation';
import AccountInformation from './components/AccountInformation';

type FormData = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
};

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    dateOfBirth: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    username: '',
    password: '',
  });

  const handleNextStep = () => setStep((prev) => prev + 1);
  const handlePrevStep = () => setStep((prev) => prev - 1);

  const handleFormData = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmit = () => {
    console.log('Registration Data Submitted:', formData);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded-lg">
        {step === 1 && <PersonalInformation onNext={handleNextStep} onFormData={handleFormData} />}
        {step === 2 && <AddressInformation onPrev={handlePrevStep} onNext={handleNextStep} onFormData={handleFormData} />}
        {step === 3 && <AccountInformation onPrev={handlePrevStep} onSubmit={handleSubmit} onFormData={handleFormData} />}
      </div>
    </div>
  );
};

export default App;
