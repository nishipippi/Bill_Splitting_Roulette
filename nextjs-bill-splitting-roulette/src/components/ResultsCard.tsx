
import React from 'react';
import type { Participant } from '../types';
import { ArrowPathIcon } from './icons/ArrowPathIcon';
import { BroomIcon } from './icons/BroomIcon';
import { DishIcon } from './icons/DishIcon';
import { WalletIcon } from './icons/WalletIcon'; // Assuming you'll create this icon

interface ResultsCardProps {
  cleanupPerson: Participant;
  dishesPerson: Participant | null;
  payers: Participant[];
  amountPerPayer: number;
  onReset: () => void;
}

export const ResultsCard: React.FC<ResultsCardProps> = ({ cleanupPerson, dishesPerson, payers, amountPerPayer, onReset }) => {
  return (
    <div className="my-6 p-6 md:p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-xl shadow-xl border border-purple-200">
      <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-8">
        ルーレット結果発表！
      </h2>

      <div className="space-y-6">
        <div className="p-4 bg-white/70 rounded-lg shadow-md border border-yellow-300">
          <h3 className="text-xl font-semibold text-yellow-700 flex items-center">
            <BroomIcon className="w-6 h-6 mr-3 text-yellow-600" />
            後片付け担当
          </h3>
          <p className="text-2xl text-yellow-800 font-bold mt-1">{cleanupPerson.name} さん</p>
        </div>

        {dishesPerson && (
          <div className="p-4 bg-white/70 rounded-lg shadow-md border border-sky-300">
            <h3 className="text-xl font-semibold text-sky-700 flex items-center">
              <DishIcon className="w-6 h-6 mr-3 text-sky-600" />
              洗い物担当
            </h3>
            <p className="text-2xl text-sky-800 font-bold mt-1">{dishesPerson.name} さん</p>
          </div>
        )}

        {payers.length > 0 && amountPerPayer > 0 && (
          <div className="p-4 bg-white/70 rounded-lg shadow-md border border-green-300">
            <h3 className="text-xl font-semibold text-green-700 flex items-center">
             <WalletIcon className="w-6 h-6 mr-3 text-green-600" />
              割り勘する方々
            </h3>
            <p className="text-gray-600 text-sm mb-2">お一人様: <span className="font-bold text-lg text-green-800">¥{amountPerPayer.toLocaleString()}</span></p>
            <ul className="space-y-1">
              {payers.map(payer => (
                <li key={payer.id} className="text-green-800 font-medium">{payer.name} さん</li>
              ))}
            </ul>
          </div>
        )}
        
        {payers.length === 0 && (dishesPerson || cleanupPerson) && (
             <div className="p-4 bg-white/70 rounded-lg shadow-md border border-gray-300 text-center">
                <p className="text-gray-700">今回はお支払い担当者はいません。</p>
             </div>
        )}

      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 inline-flex items-center"
        >
          <ArrowPathIcon className="w-5 h-5 mr-2" />
          もう一度！
        </button>
      </div>
    </div>
  );
};
