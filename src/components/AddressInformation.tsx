import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

type AddressInformationProps = {
  onPrev: () => void;
  onNext: () => void;
  onFormData: (data: any) => void;
};

const AddressInformation: React.FC<AddressInformationProps> = ({ onPrev, onNext, onFormData }) => {
  const validationAddressInformation = Yup.object().shape({
    streetAddress: Yup.string().required('Street Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().matches(/^\d{5}$/, 'Invalid Zip Code format').required('Zip Code is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationAddressInformation),
  });

  const onSubmit = (data: any) => {
    onFormData(data);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-2xl font-bold mb-6 text-center">Address Information</h2>
      <div className="mb-4">
        <label className="block font-semibold">Street Address</label>
        <input {...register('streetAddress')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.streetAddress && <p className="text-red-600 text-sm mt-1">{errors.streetAddress.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">City</label>
        <input {...register('city')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block font-semibold">State</label>
        <input {...register('state')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state.message}</p>}
      </div>
      <div className="mb-6">
        <label className="block font-semibold">Zip Code</label>
        <input {...register('zipCode')} className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode.message}</p>}
      </div>
      <div className="flex justify-between">
        <button type="button" onClick={onPrev} className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200">Previous</button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">Next</button>
      </div>
    </form>
  );
};

export default AddressInformation;
