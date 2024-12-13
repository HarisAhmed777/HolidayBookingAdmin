import React, { createContext, useState } from 'react';

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isLight, setIsLight] = useState(false); // Default to dark mode

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const toggleTheme = () => {
    setIsLight(!isLight);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarVisible, toggleSidebar, isLight, toggleTheme }}>
      {children}
    </SidebarContext.Provider>
  );
};
