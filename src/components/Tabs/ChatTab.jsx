import React, { useState, useEffect, useRef } from 'react';
import { chatExpertResponses, defaultChatResponse } from '../../utils/mockData';

export default function ChatTab({ profile }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome_msg',
      sender: 'specialist',
      text: `Olá, ${profile.name}! Sou seu especialista digital em nutrição e treino. Analisei seu perfil físico e vi que seu objetivo é ${
        profile.goal === 'hypertrophy' ? 'hipertrofia (ganho de massa)' :
        profile.goal === 'emagrecimento' ? 'emagrecimento e definição' :
        profile.goal === 'recomposicao' ? 'recomposição corporal' : 'condicionamento físico'
      }. Como posso ajudar com sua dieta ou treino hoje?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Rolar para o final quando houver nova mensagem
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMessage = {
      id: `user_${Date.now()}`,
      sender: 'user',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputVal('');
    setIsTyping(true);

    // Simular tempo de resposta da "IA" especialista
    setTimeout(() => {
      let matchedReply = '';
      const textLower = userMessage.text.toLowerCase();

      // Buscar por palavra-chave nas respostas do especialista
      for (const item of chatExpertResponses) {
        const hasKeyword = item.keywords.some(keyword => textLower.includes(keyword));
        if (hasKeyword) {
          matchedReply = item.response;
          break;
        }
      }

      if (!matchedReply) {
        matchedReply = defaultChatResponse;
      }

      const specialistMessage = {
        id: `spec_${Date.now()}`,
        sender: 'specialist',
        text: matchedReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, specialistMessage]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '12px' }} className="animate-fade-in">
      
      {/* Header do Chat */}
      <div className="glass-card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary) 0%, #16a34a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            color: '#000'
          }}>
            DR
          </div>
          <div style={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: '#22c55e',
            border: '2px solid var(--background)'
          }}></div>
        </div>
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Dr. NutriFit AI</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>Especialista Online</span>
        </div>
      </div>

      {/* Janela de Mensagens */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        minHeight: '320px',
        maxHeight: '440px'
      }}>
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div 
              key={msg.id} 
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
                animation: 'scaleIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
            >
              <div style={{
                maxWidth: '85%',
                background: isUser ? 'var(--primary-light)' : 'var(--surface-card)',
                border: isUser ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid var(--border)',
                color: isUser ? 'var(--text-highlight)' : 'var(--text)',
                padding: '12px 14px',
                borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                boxShadow: 'var(--shadow-sm)'
              }}>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.4', whiteSpace: 'pre-line' }}>{msg.text}</p>
                <span style={{ display: 'block', textAlign: 'right', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {msg.time}
                </span>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
            <div style={{
              background: 'var(--surface-card)',
              border: '1px solid var(--border)',
              padding: '12px 16px',
              borderRadius: '18px 18px 18px 4px',
              display: 'flex',
              gap: '4px',
              alignItems: 'center'
            }}>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
              <span className="typing-dot"></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Formulário de Input */}
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
        <input
          type="text"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          placeholder="Pergunte sobre dieta ou treino..."
          className="form-input"
          style={{ padding: '12px 14px', fontSize: '0.9rem', flex: 1 }}
        />
        <button 
          type="submit" 
          className="btn-primary" 
          style={{ padding: '12px 16px', borderRadius: '12px', boxShadow: 'none' }}
          disabled={!inputVal.trim() || isTyping}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>

    </div>
  );
}
