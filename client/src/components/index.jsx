import React, { useState } from 'react';
import UserDetailsComponent from './UserDetails';
import SelectWheels from './SelectWheels';
import VehicleType from './VehicleType';
import VehicleModel from './VehicleModel';
import FormSubmissionComponent from './FormSubmission';

const RentalForm = () => {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    wheels: '',
    vehicleTypeId: '',
    vehicleId: '',
    start_date: '',
    end_date: '',
  });

  const onNext = () => setStep((prev) => prev + 1);
  const onBack = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UserDetailsComponent
            formData={formData}
            setFormData={setFormData}
            onNext={onNext}
          />
        );
      case 2:
        return (
          <SelectWheels
            formData={formData}
            setFormData={setFormData}
            onNext={onNext}
            onBack={onBack}
          />
        );
      case 3:
        return (
          <VehicleType
            formData={formData}
            setFormData={setFormData}
            onNext={onNext}
            onBack={onBack}
          />
        );
      case 4:
        return (
          <VehicleModel
            formData={formData}
            setFormData={setFormData}
            onNext={onNext}
            onBack={onBack}
          />
        );
      case 5:
        return (
          <FormSubmissionComponent
            formData={formData}
            setFormData={setFormData}
            onBack={onBack}
            setStep={setStep}
          />
        );
      default:
        return <p>Invalid Step</p>;
    }
  };

  return (
    <div className="">
      {renderStep()}
    </div>
  );
};

export default RentalForm;
