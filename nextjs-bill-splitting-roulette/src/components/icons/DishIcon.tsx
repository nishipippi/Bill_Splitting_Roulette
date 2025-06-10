
import React from 'react';

interface IconProps {
  className?: string;
}

export const DishIcon: React.FC<IconProps> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 7.5H4.5m6 0H15M9.75 7.5C9.75 8.328 9.078 9 8.25 9H4.5C3.672 9 3 8.328 3 7.5S3.672 6 4.5 6h3.75c.828 0 1.5.672 1.5 1.5ZM9.75 7.5V15M9.75 15H4.5m6 0H15m-5.25 0c0 .828-.672 1.5-1.5 1.5H4.5c-.828 0-1.5-.672-1.5-1.5S3.672 13.5 4.5 13.5h3.75c.828 0 1.5.672 1.5 1.5Zm0 0V21m5.25-6H15m0 0c.828 0 1.5.672 1.5 1.5S15.828 18 15 18h-3.75c-.828 0-1.5-.672-1.5-1.5S10.422 15 11.25 15H15Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18" />
 </svg>
);
