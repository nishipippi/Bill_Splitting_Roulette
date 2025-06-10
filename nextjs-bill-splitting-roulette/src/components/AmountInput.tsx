
"use client"; // この行を追加

import React, { useState, useRef, useEffect } from 'react'; // useState, useRef をインポート
import { CurrencyYenIcon } from './icons/CurrencyYenIcon';

interface AmountInputProps {
  totalAmount: number;
  onAmountChange: (amount: number) => void;
}

export const AmountInput: React.FC<AmountInputProps> = ({ totalAmount, onAmountChange }) => {
  const [isFocused, setIsFocused] = useState(false); // フォーカス状態を管理
  const inputRef = useRef<HTMLInputElement>(null); // input要素への参照

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onAmountChange(value === '' ? 0 : parseInt(value, 10) || 0);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  // valueプロパティのロジックを修正
  const displayValue = totalAmount === 0 && !isFocused ? '' : totalAmount.toString();
  
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
          ref={inputRef} // refを設定
          type="number"
          value={displayValue} // 修正されたvalueロジックを使用
          onChange={handleChange}
          onFocus={handleFocus} // onFocusハンドラを追加
          onBlur={handleBlur}   // onBlurハンドラを追加
          placeholder="例: 5000"
          className="w-full p-3 pl-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-pink-400 focus:border-transparent outline-none transition-shadow text-lg"
          min="0"
        />
      </div>
    </section>
  );
};
