
import React from 'react';

interface IconProps {
  className?: string;
}

export const WalletIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6.028A2.25 2.25 0 0 1 18.75 21H5.25A2.25 2.25 0 0 1 3 18.028V12m18 0V9M3 12V9m18 3H3m12-3V5.25A2.25 2.25 0 0 0 12.75 3H11.25A2.25 2.25 0 0 0 9 5.25V9" />
  </svg>
);
