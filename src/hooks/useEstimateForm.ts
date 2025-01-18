import { create } from 'zustand';

interface EstimateFormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  serviceType: string;
  projectDetails: string;
  referralSource: string;
  otherSource: string;
  setField: (field: keyof Omit<EstimateFormState, 'setField'>, value: string) => void;
}

export const useEstimateForm = create<EstimateFormState>((set) => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  serviceType: '',
  projectDetails: '',
  referralSource: '',
  otherSource: '',
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
}));