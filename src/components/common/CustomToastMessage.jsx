import { useState } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useToast = () => {
  const [position] = useState('top-right');
  const [autoClose] = useState(1000);

  const showToast = (message, type = 'success') => {
    console.log('::message', message, type);
    if (type === 'success') {
      toast.success(message, {
        position,
        autoClose,
      });
    } else if (type === 'error') {
      toast.error(message, {
        position,
        autoClose,
      });
    }
  };
  return { showToast };
};
export default useToast;
