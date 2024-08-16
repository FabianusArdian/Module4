import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type AccountInformationProps = {
  onPrev: () => void;
  onSubmit: () => void;
  onFormData: (data: any) => void;
};

const AccountInformation: React.FC<AccountInformationProps> = ({ onPrev, onSubmit, onFormData }) => {
  const validationAccountInformation = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters long')
      .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .matches(/[0-9]/, 'Password must contain at least one number')
      .required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationAccountInformation),
  });

  const onSubmitForm = (data: any) => {
    onFormData(data);
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <h2 className="text-2xl font-bold mb-6 text-center">Account Information</h2>
      <div className="mb-4">
        <label className="block font-semibold">Username</label>
        <input {...register('username')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.username && <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>}
      </div>
      <div className="mb-6">
        <label className="block font-semibold">Password</label>
        <input type="password" {...register('password')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200">Previous</button>
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200">Submit</button>
      </div>
    </form>
  );
};

export default AccountInformation;
