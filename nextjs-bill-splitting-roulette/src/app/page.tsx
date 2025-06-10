"use client";

import React, { useState, useCallback, useEffect } from 'react'; // useEffect を追加
import { Header } from '@/components/Header';
import { ParticipantInput } from '@/components/ParticipantInput';
import { AmountInput } from '@/components/AmountInput';
import { ResultsCard } from '@/components/ResultsCard';
import { Footer } from '@/components/Footer';
import { SparklesIcon } from '@/components/icons/SparklesIcon';
import { ArrowPathIcon } from '@/components/icons/ArrowPathIcon';
import type { Participant } from '@/types';

const Home: React.FC = () => { // AppをHomeにリネーム
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [cleanupPerson, setCleanupPerson] = useState<Participant | null>(null);
  const [dishesPerson, setDishesPerson] = useState<Participant | null>(null);
  const [payers, setPayers] = useState<Participant[]>([]);
  const [amountPerPayer, setAmountPerPayer] = useState<number>(0);
  
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // キラキラエフェクトのスタイルを保持するstateを追加
  const [sparkleStyles, setSparkleStyles] = useState<React.CSSProperties[]>([]);

  // useEffectを使ってクライアントサイドでのみスタイルを生成
  useEffect(() => {
    const styles: React.CSSProperties[] = [];
    for (let i = 0; i < 10; i++) {
      styles.push({
        position: 'absolute', // ここに追加
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        fontSize: `${8 + Math.random() * 8}px`,
      });
    }
    setSparkleStyles(styles);
  }, []); // 空の依存配列でマウント時に一度だけ実行

  const handleAddParticipant = useCallback((name: string) => {
    if (name && !participants.find(p => p.name === name)) {
      setParticipants(prev => [...prev, { id: Date.now().toString(), name }]);
      setError(null);
    } else if (participants.find(p => p.name === name)) {
      setError("同じ名前の参加者が既に存在します。");
    }
  }, [participants]);

  const handleRemoveParticipant = useCallback((id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  }, []);

  const handleAmountChange = useCallback((amount: number) => {
    setTotalAmount(amount);
    if (amount > 0) setError(null);
  }, []);

  const handleSpinRoulette = useCallback(() => {
    setError(null);
    if (participants.length < 2) {
      setError("少なくとも2人の参加者が必要です。");
      return;
    }
    if (totalAmount <= 0 && participants.length > 2) { // Allow 0 amount if only 2 participants (no payers)
      setError("合計金額は0より大きい値を入力してください。");
      return;
    }

    setIsSpinning(true);
    setShowResults(false);

    setTimeout(() => {
      let remainingParticipants = [...participants];
      
      const cleanupIdx = Math.floor(Math.random() * remainingParticipants.length);
      const cleanup = remainingParticipants.splice(cleanupIdx, 1)[0];
      setCleanupPerson(cleanup);

      let dishes: Participant | null = null;
      if (remainingParticipants.length > 0) {
        const dishesIdx = Math.floor(Math.random() * remainingParticipants.length);
        dishes = remainingParticipants.splice(dishesIdx, 1)[0];
        setDishesPerson(dishes);
      } else {
        // This case implies only 1 participant initially, which is blocked by the check above.
        // If logic changes to allow 1 participant, handle this. For now, it's defensive.
        setDishesPerson(null); 
      }
      
      setPayers(remainingParticipants);

      if (remainingParticipants.length > 0 && totalAmount > 0) {
        setAmountPerPayer(Math.ceil(totalAmount / remainingParticipants.length));
      } else {
        setAmountPerPayer(0);
      }
      
      setIsSpinning(false);
      setShowResults(true);
    }, 2000); // Simulate spinning duration
  }, [participants, totalAmount]);

  const handleReset = useCallback(() => {
    setParticipants([]);
    setTotalAmount(0);
    setCleanupPerson(null);
    setDishesPerson(null);
    setPayers([]);
    setAmountPerPayer(0);
    setIsSpinning(false);
    setShowResults(false);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-gray-800 relative overflow-hidden">
      {/* Sparkles for background effect */}
      {/* sparkleStylesがセットされてからレンダリング */}
      {sparkleStyles.length > 0 && sparkleStyles.map((style, i) => (
        <div
          key={i}
          className="sparkle"
          style={style}
        />
      ))}
      
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-2xl z-10">
        <Header />

        {error && (
          <div className="my-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 rounded">
            <p>{error}</p>
          </div>
        )}

        {isSpinning && (
          <div className="my-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
            <p className="text-xl font-semibold text-purple-600">選考中...</p>
          </div>
        )}

        {!isSpinning && showResults && cleanupPerson && (
          <ResultsCard
            cleanupPerson={cleanupPerson}
            dishesPerson={dishesPerson}
            payers={payers}
            amountPerPayer={amountPerPayer}
            onReset={handleReset}
          />
        )}

        {!isSpinning && !showResults && (
          <>
            <ParticipantInput 
              participants={participants}
              onAddParticipant={handleAddParticipant}
              onRemoveParticipant={handleRemoveParticipant}
            />
            <AmountInput 
              totalAmount={totalAmount}
              onAmountChange={handleAmountChange} 
            />
            <div className="mt-8 text-center">
              <button
                onClick={handleSpinRoulette}
                disabled={participants.length < 2 || (totalAmount <= 0 && participants.length > 2)}
                className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out transform hover:scale-105 text-lg inline-flex items-center"
              >
                <SparklesIcon className="w-6 h-6 mr-2" />
                ルーレットを回す！
              </button>
            </div>
          </>
        )}
         {!isSpinning && !showResults && participants.length > 0 && (
            <div className="mt-6 text-center">
                <button
                    onClick={handleReset}
                    className="text-sm text-gray-500 hover:text-gray-700 hover:underline inline-flex items-center"
                >
                    <ArrowPathIcon className="w-4 h-4 mr-1" />
                    リセット
                </button>
            </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
