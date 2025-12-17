import React, { useEffect } from 'react';

interface AdBannerProps {
  className?: string;
  dataAdSlot?: string; 
  format?: 'auto' | 'fluid' | 'rectangle';
}

const AdBanner: React.FC<AdBannerProps> = ({ 
  className = "", 
  dataAdSlot = "1234567890", // Substitua pelo seu Slot ID do AdSense real quando criar blocos de anúncio
  format = "auto" 
}) => {

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        // Tenta empurrar o anúncio para a fila do AdSense
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ignora erros de "adsbygoogle push", comum em re-renders do React
      console.log('AdSense status:', err);
    }
  }, []);

  // Verifica se estamos em produção para mostrar o anúncio real
  const isProduction = typeof window !== 'undefined' && 
    (window.location.hostname.includes('wordcrushgame.com') || window.location.hostname.includes('vercel.app'));
  
  if (!isProduction) {
    // Placeholder para desenvolvimento (localhost)
    return (
        <div className={`w-full max-w-[728px] mx-auto my-4 overflow-hidden rounded-lg bg-slate-800/30 border border-slate-700/50 flex flex-col items-center justify-center text-slate-500 text-xs p-4 min-h-[90px] ${className}`}>
        <span className="font-bold uppercase tracking-widest mb-1">Espaço Publicitário (AdSense)</span>
        <span>Visível em wordcrushgame.com</span>
      </div>
    );
  }

  return (
    <div className={`w-full flex justify-center my-4 overflow-hidden ${className}`}>
      {/* Bloco de Anúncio AdSense */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minWidth: '300px', width: '100%' }}
        data-ad-client="ca-pub-SEU_ID_DE_CLIENTE_AQUI" // IMPORTANTE: Coloque seu ID aqui (ex: ca-pub-123456...)
        data-ad-slot={dataAdSlot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdBanner;