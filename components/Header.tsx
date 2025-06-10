
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="mb-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 pb-2">
        割り勘ルーレット
      </h1>
      <p className="text-gray-600 mt-2 text-sm md:text-base">
        公平に楽しく、今日の役割を決めよう！
      </p>
    </header>
  );
};
