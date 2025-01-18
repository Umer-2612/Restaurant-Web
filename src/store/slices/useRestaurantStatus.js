import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { modifyCartDetails } from './cart';

const RESTAURANT_HOURS = {
  0: { open: '12:00', close: '21:00' }, // Sunday (12–9 pm)
  1: { open: '15:30', close: '21:00' }, // Monday (3:30–9 pm)
  2: { open: '15:00', close: '21:00' }, // Tuesday (3–9 pm)
  3: { open: '15:00', close: '23:00' }, // Wednesday (3–11 pm)
  4: { open: '15:00', close: '21:30' }, // Thursday (3:30–9:30 pm)
  5: { open: '15:00', close: '22:00' }, // Friday (3–10 pm)
  6: { open: '11:00', close: '22:00' }, // Saturday (11 am–10 pm)
};

const checkIfOpen = () => {
  const sydneyTime = new Date().toLocaleString('en-US', {
    timeZone: 'Australia/Brisbane',
  });
  const sydneyDate = new Date(sydneyTime);

  const day = sydneyDate.getDay();
  const hours = sydneyDate.getHours();
  const minutes = sydneyDate.getMinutes();

  const todayHours = RESTAURANT_HOURS[day];
  if (!todayHours) return false;

  const currentMinutes = hours * 60 + minutes;
  const [openHours, openMinutes] = todayHours.open.split(':').map(Number);
  const [closeHours, closeMinutes] = todayHours.close.split(':').map(Number);

  const openTimeInMinutes = openHours * 60 + openMinutes;
  const closeTimeInMinutes = closeHours * 60 + closeMinutes;

  return (
    currentMinutes >= openTimeInMinutes && currentMinutes < closeTimeInMinutes
  );
};

const useRestaurantStatus = () => {
  const [isOpen, setIsOpen] = useState(checkIfOpen());
  const dispatch = useDispatch();

  useEffect(() => {
    const status = checkIfOpen();
    setIsOpen(status);

    if (!status) {
      dispatch(modifyCartDetails([]));
      localStorage.removeItem('menuDetails');
    }
  }, [dispatch]);

  return { isOpen, checkIfOpen };
};

export default useRestaurantStatus;
