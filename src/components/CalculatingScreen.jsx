import React, { useState, useEffect } from 'react';

export default function CalculatingScreen({ onComplete }) {
  const [stage, setStage] = useState(0);
  const stages = [
    'Analisando respostas e dados físicos...',
    'Calculando Taxa Metabólica Basal (TMB) e GETD...',
    'Ajustando macronutrientes para sua meta...',
    'Selecionando plano alimentar com restrições...',
    'Estruturando divisões de treino e exercícios...',
    'Preparando suporte do Dr. NutriFit no chat...',
    'Finalizando seu diagnóstico especializado!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStage(prev => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 500);
          return prev;
        }
      });
    }, 600);

    return () => clearInterval(interval);
  }, [onComplete, stages.length]);

  return (
    <div className="screen-scrollable animate-fade-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center', height: '100%' }}>
      
      {/* Círculo com animação de pulso/glow */}
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        border: '3px solid var(--primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: '32px',
        animation: 'pulseGlow 2s infinite ease-in-out'
      }}>
        {/* Ícone de Engrenagem ou Análise */}
        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 4s linear infinite' }}>
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.1a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>

      <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-highlight)' }}>
          Preparando Seu Plano...
        </h3>

        <div className="glass-card" style={{ padding: '20px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--primary)', fontSize: '0.95rem', fontWeight: 500, transition: 'all 0.3s ease' }}>
            {stages[stage]}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '8px' }}>
          {stages.map((_, idx) => (
            <div
              key={idx}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: idx <= stage ? 'var(--primary)' : 'rgba(255,255,255,0.06)',
                transition: 'background 0.3s ease'
              }}
            ></div>
          ))}
        </div>
      </div>
      
    </div>
  );
}
