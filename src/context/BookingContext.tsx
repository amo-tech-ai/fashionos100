
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BookingState, calculateTotal } from '../lib/pricing';

interface BookingContextType {
  state: BookingState;
  totals: ReturnType<typeof calculateTotal>;
  updateState: (updates: Partial<BookingState>) => void;
  resetBooking: () => void;
}

const INITIAL_STATE: BookingState = {
  service: 'photography',
  category: 'fashion',
  style: 'catalog',
  productSize: 'standard',
  scenes: [],
  shotType: 'packshot',
  subCategory: '',
  shotCount: 10,
  references: [],
  shotList: [],
  retouching: 'basic',
  models: []
};

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<BookingState>(() => {
    const saved = localStorage.getItem('fashionos_booking_v3');
    return saved ? JSON.parse(saved) : INITIAL_STATE;
  });

  useEffect(() => {
    localStorage.setItem('fashionos_booking_v3', JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<BookingState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const resetBooking = () => {
    setState(INITIAL_STATE);
    localStorage.removeItem('fashionos_booking_v3');
  };

  const totals = calculateTotal(state);

  return (
    <BookingContext.Provider value={{ state, totals, updateState, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used within BookingProvider');
  return context;
};
