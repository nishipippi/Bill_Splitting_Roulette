
import React, { useState, useCallback } from 'react';
import type { Participant } from '../types';
import { TrashIcon } from './icons/TrashIcon';
import { UserPlusIcon } from './icons/UserPlusIcon';
import { UsersIcon } from './icons/UsersIcon';


interface ParticipantInputProps {
  participants: Participant[];
  onAddParticipant: (name: string) => void;
  onRemoveParticipant: (id: string) => void;
}

export const ParticipantInput: React.FC<ParticipantInputProps> = ({ participants, onAddParticipant, onRemoveParticipant }) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAddParticipant(name.trim());
      setName('');
    }
  }, [name, onAddParticipant]);

  return (
    <section className="mb-8 p-6 bg-white/50 rounded-lg shadow-sm backdrop-blur-sm border border-purple-100">
      <h2 className="text-2xl font-semibold text-purple-700 mb-1 inline-flex items-center">
        <UsersIcon className="w-7 h-7 mr-2 text-purple-500" />
        参加者を追加
      </h2>
      <div className="w-20 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mb-4"></div>
      
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="例: 山田太郎"
          className="flex-grow p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:border-transparent outline-none transition-shadow"
        />
        <button
          type="submit"
          className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-3 px-5 rounded-md shadow-sm hover:shadow-md transition-all duration-150 ease-in-out inline-flex items-center justify-center"
        >
          <UserPlusIcon className="w-5 h-5 mr-2"/>
          追加
        </button>
      </form>
      {participants.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-600 mb-2">現在の参加者 ({participants.length}名):</h3>
          <ul className="flex flex-wrap gap-2">
            {participants.map((p) => (
              <li 
                key={p.id} 
                className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 px-3 py-1.5 rounded-full text-sm font-medium flex items-center shadow-xs hover:shadow-sm transition-shadow"
              >
                {p.name}
                <button 
                  onClick={() => onRemoveParticipant(p.id)} 
                  className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors"
                  aria-label={`Remove ${p.name}`}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};
