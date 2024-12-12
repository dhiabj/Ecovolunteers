import React, { createContext, useState } from 'react';

const ToggleContext = createContext({});

export const ToggleProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleContext;
