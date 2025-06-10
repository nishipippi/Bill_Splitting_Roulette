
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 text-center text-sm text-white/80 pb-4 z-10">
      <p>&copy; {new Date().getFullYear()} nishipippi All Rights Reserved.</p>
      <p>Inspired by nishipippi's portfolio design.</p>
    </footer>
  );
};
