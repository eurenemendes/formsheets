
import React from 'react';

const SuccessMessage: React.FC = () => {
  return (
    <div className="p-10 flex flex-col items-center text-center animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
        <svg 
          className="w-8 h-8 text-emerald-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3" 
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Obrigado!</h2>
      <p className="text-gray-600 mb-8 leading-relaxed">
        Seu reporte foi enviado com sucesso. Nossa equipe analisará a informação em breve.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
      >
        Enviar outro reporte
      </button>
    </div>
  );
};

export default SuccessMessage;
