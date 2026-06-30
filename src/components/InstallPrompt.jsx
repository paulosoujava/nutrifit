import React, { useState, useEffect } from 'react';

export default function InstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    // 1. Verificar se já está em modo standalone (PWA instalado)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
    
    // 2. Verificar se o usuário já dispensou o banner anteriormente
    const dismissed = localStorage.getItem('nutrifit_install_dismissed') === 'true';

    if (isStandalone || dismissed) {
      return;
    }

    // 3. Detectar se é iOS (iPhone / iPad / iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // 4. Capturar o evento de instalação padrão para Chrome/Android
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Se for iOS, mostramos o prompt após um pequeno delay para melhor engajamento
    if (ios) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = () => {
    if (isIOS) {
      setShowInstructions(true);
    } else if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          localStorage.setItem('nutrifit_install_dismissed', 'true');
          setShowPrompt(false);
        }
        setDeferredPrompt(null);
      });
    }
  };

  const handleDismiss = () => {
    localStorage.setItem('nutrifit_install_dismissed', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Banner Principal de Instalação */}
      <div className="glass-card animate-slide-up" style={{
        position: 'absolute',
        bottom: '88px', // Acima da barra de abas do dashboard
        left: '16px',
        right: '16px',
        padding: '16px',
        zIndex: 99,
        border: '1px solid rgba(34, 197, 94, 0.25)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #16a34a 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(34, 197, 94, 0.35)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
            </div>
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-highlight)' }}>Instalar NutriFit AI</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Fixe na Tela de Início para ter um app real!</p>
            </div>
          </div>
          <button 
            onClick={handleDismiss} 
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn-primary" 
            onClick={handleInstallClick} 
            style={{ 
              flex: 1, 
              padding: '10px 16px', 
              fontSize: '0.85rem',
              borderRadius: '10px',
              boxShadow: 'none'
            }}
          >
            Instalar
          </button>
          <button 
            className="btn-secondary" 
            onClick={handleDismiss}
            style={{ 
              padding: '10px 16px', 
              fontSize: '0.85rem',
              borderRadius: '10px',
              border: '1px solid var(--border)'
            }}
          >
            Agora Não
          </button>
        </div>
      </div>

      {/* Modal de Instruções para iOS (Safari) */}
      {showInstructions && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px'
        }}>
          <div className="glass-card animate-scale-in" style={{
            width: '100%',
            maxWidth: '320px',
            padding: '24px',
            border: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            position: 'relative'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: 'rgba(34, 197, 94, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px auto',
                color: 'var(--primary)'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '8px' }}>Instalar no iPhone</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Siga estes passos simples no Safari para fixar o NutriFit AI na sua tela de início:
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.8rem', color: 'var(--text)' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary)', 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>1</span>
                <span>Toque no botão de **Compartilhar** <svg style={{ display: 'inline-block', verticalAlign: 'middle', margin: '-2px 2px 0 2px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13"/></svg> na barra inferior do Safari.</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary)', 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>2</span>
                <span>Role a lista de opções e clique em **Adicionar à Tela de Início** <svg style={{ display: 'inline-block', verticalAlign: 'middle', margin: '-2px 2px 0 2px' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>.</span>
              </div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ 
                  background: 'var(--primary-light)', 
                  color: 'var(--primary)', 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>3</span>
                <span>Toque em **Adicionar** no canto superior direito do seu iPhone.</span>
              </div>
            </div>

            <button 
              className="btn-primary" 
              onClick={() => {
                setShowInstructions(false);
                setShowPrompt(false);
                localStorage.setItem('nutrifit_install_dismissed', 'true');
              }}
              style={{ padding: '12px', fontSize: '0.85rem', borderRadius: '12px', marginTop: '8px' }}
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </>
  );
}
