import { toast } from 'react-hot-toast';

export const useToast = () => {
  const showToast = (message, type = 'success') => {
    if (type === 'success') {
      toast.success(message, {
        position: 'top-right',
        duration: 3000,
      });
    } else if (type === 'error') {
      toast.error(message, {
        position: 'top-right',
        duration: 3000,
      });
    }
  };

  return { showToast };
};

export default useToast;
