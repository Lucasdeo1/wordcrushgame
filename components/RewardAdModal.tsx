import React, { useState, useEffect } from 'react';
import { X, PlayCircle, Loader2 } from 'lucide-react';

interface RewardAdModalProps {
  onComplete: () => void;
  onClose: () => void;
  t: any;
}

const RewardAdModal: React.FC<RewardAdModalProps> = ({ onComplete, onClose, t }) => {
  const [timeLeft, setTimeLeft] = useState(5); // 5 seconds ad simulation
  const [canClose, setCanClose] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanClose(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClaim = () => {
    if (canClose) {
      onComplete();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-sm bg-white rounded-2xl overflow-hidden shadow-2xl relative">
        
        {/* Ad Content Simulation */}
        <div className="bg-slate-900 h-64 flex flex-col items-center justify-center text-white p-6 text-center relative">
            
            {/* Countdown / Close Button */}
            <div className="absolute top-4 right-4">
                {!canClose ? (
                    <div className="w-8 h-8 rounded-full border-2 border-white/30 flex items-center justify-center text-xs font-bold animate-pulse">
                        {timeLeft}
                    </div>
                ) : (
                    <button onClick={onClose} className="p-1 bg-white/20 rounded-full hover:bg-white/40 transition-colors">
                        <X size={20} />
                    </button>
                )}
            </div>

            <div className="mb-4 p-4 bg-indigo-500 rounded-full">
                <PlayCircle size={48} />
            </div>
            <h3 className="text-xl font-bold mb-2">{t.ad.title}</h3>
            <p className="text-slate-400 text-sm">{t.ad.subtitle}</p>
        </div>

        {/* Action Area */}
        <div className="p-6">
            <button 
                onClick={handleClaim}
                disabled={!canClose}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    canClose 
                    ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/30' 
                    : 'bg-gray-100 text-gray-400 cursor-wait'
                }`}
            >
                {!canClose ? (
                    <>
                        <Loader2 className="animate-spin" size={20} />
                        {t.ad.wait} ({timeLeft}s)
                    </>
                ) : (
                    <>
                        {t.ad.reward}
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default RewardAdModal;