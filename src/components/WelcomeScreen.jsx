import React from 'react';

export default function WelcomeScreen({ onStartNew, onResume, hasSavedPlan }) {
  return (
    <div className="screen-scrollable animate-fade-in" style={{ justifyContent: 'center', textAlign: 'center', height: '100%' }}>
      <div style={{ marginBottom: '40px' }}>
        {/* Ícone de Raio/Fogo com glow */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, var(--primary) 0%, #16a34a 100%)',
          margin: '0 auto 24px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 30px rgba(34, 197, 94, 0.4)',
          animation: 'float 4s ease-in-out infinite'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '12px' }}>
          NutriFit <span className="text-primary-gradient">AI</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', padding: '0 20px', lineHeight: 1.5 }}>
          Seu especialista digital em nutrição e treino. Planejamento inteligente e acompanhamento diário em um só lugar.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-highlight)' }}>
          Como funciona?
        </h3>
        <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>1</span>
            <p>Responda ao questionário sobre suas metas, corpo e preferências alimentares.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>2</span>
            <p>Nosso algoritmo especialista calcula seu metabolismo e gera sua dieta e treino ideal.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <span style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '2px 8px', borderRadius: '6px', fontWeight: 'bold' }}>3</span>
            <p>Acompanhe suas calorias, treinos, ingestão de água e tire dúvidas no chat em tempo real.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
        <button className="btn-primary" onClick={onStartNew}>
          Começar Diagnóstico
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {hasSavedPlan && (
          <button className="btn-secondary" onClick={onResume}>
            Acessar Meu Plano Atual
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
          </button>
        )}
      </div>

      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '24px' }}>
        NutriFit AI v1.0 • Desenvolvido para Alta Performance
      </div>
    </div>
  );
}
