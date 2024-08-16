import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type PersonalInformationProps = {
  onNext: () => void;
  onFormData: (data: any) => void;
};

const PersonalInformation: React.FC<PersonalInformationProps> = ({ onNext, onFormData }) => {
  const validationPersonalInformation = Yup.object().shape({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    dateOfBirth: Yup.date().required('Date of Birth is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationPersonalInformation),
  });

  const onSubmit = (data: any) => {
    onFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-6 text-center">Personal Information</h2>
      <div className="mb-4">
        <label className="block font-semibold">Full Name</label>
        <input {...register('fullName')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">Email</label>
        <input {...register('email')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div className="mb-6">
        <label className="block font-semibold">Date of Birth</label>
        <input type="date" {...register('dateOfBirth')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.dateOfBirth && <p className="text-red-600 text-sm mt-1">{errors.dateOfBirth.message}</p>}
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200">Next</button>
    </form>
  );
};

export default PersonalInformation;
