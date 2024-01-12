import { ErrorProps } from '@/types/api';
import toast from 'react-hot-toast';

export const handleReactQueryError = (error: ErrorProps) => {
  if ('message' in error.data) toast.error(error.data.message);
  else toast.error(error.data);
};
