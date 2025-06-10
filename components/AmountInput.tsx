
import React from 'react';
import { CurrencyYenIcon } from './icons/CurrencyYenIcon';

interface AmountInputProps {
  totalAmount: number;
  onAmountChange: (amount: number) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ totalAmount, onAmountChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty string for clearing input, parse to number otherwise
    onAmountChange(value === '' ? 0 : parseInt(value, 10) || 0);
  };
  
  return (
    <section className="mb-6 p-6 bg-white/50 rounded-lg shadow-sm backdrop-blur-sm border border-pink-100">
      <h2 className="text-2xl font-semibold text-pink-700 mb-1 inline-flex items-center">
        <CurrencyYenIcon className="w-7 h-7 mr-2 text-pink-500" />
        合計金額
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mb-4"></div>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">¥</span>
        <input
          type="number"
          value={totalAmount === 0 && !document.activeElement?.isSameNode(event?.target as Node) ? '' : totalAmount.toString()} // Show empty if 0 and not focused
          onChange={handleChange}
          placeholder="例: 5000"
          className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-shadow text-lg"
          min="0"
        />
      </div>
    </section>
  );
};
