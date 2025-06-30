import axios from 'axios';
//src/api/propertyRequest.ts
export const submitPropertyRequest = async (formData: any, selectedPackage: string) => {
  const response = await axios.post('/api/property/saveProperty', {
    ...formData,
    selectedPackage,
  });

  return response.data;
};