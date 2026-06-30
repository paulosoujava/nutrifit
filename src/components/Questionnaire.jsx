import React, { useState } from 'react';

export default function Questionnaire({ onSubmit, onBackToWelcome }) {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    targetWeight: '',
    goal: 'hypertrophy',
    activity: 'moderately',
    dietType: 'general',
    workoutLocation: 'gym',
    workoutFrequency: '4',
    focusArea: 'geral'
  });

  const updateField = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step < 7) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBackToWelcome();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(profile);
  };

  // Validações básicas por etapa
  const isStepValid = () => {
    if (step === 1) return profile.name.trim() !== '' && profile.age !== '';
    if (step === 2) return profile.weight !== '' && profile.height !== '' && profile.targetWeight !== '';
    return true;
  };

  const renderProgressBar = () => {
    const percentage = ((step - 1) / 6) * 100;
    return (
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
          <span>Etapa {step} de 7</span>
          <span>{Math.round(percentage)}% Concluído</span>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{ width: `${percentage}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.3s ease' }}></div>
        </div>
      </div>
    );
  };

  return (
    <div className="screen-scrollable animate-fade-in">
      {renderProgressBar()}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          
          {/* Passo 1: Informações Básicas */}
          {step === 1 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Quem é você?</h2>
                <p style={{ color: 'var(--text-muted)' }}>Comece nos dizendo seu nome, idade e sexo biológico.</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qual seu nome?</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ex: João Silva"
                  value={profile.name}
                  onChange={e => updateField('name', e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Qual sua idade?</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ex: 28"
                  value={profile.age}
                  onChange={e => updateField('age', e.target.value)}
                  min="12"
                  max="100"
                  required
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Sexo Biológico</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className={`form-input ${profile.gender === 'male' ? 'active-card' : ''}`}
                    style={{
                      flex: 1,
                      border: profile.gender === 'male' ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: profile.gender === 'male' ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                      fontWeight: profile.gender === 'male' ? '700' : '400',
                      cursor: 'pointer'
                    }}
                    onClick={() => updateField('gender', 'male')}
                  >
                    Masculino
                  </button>
                  <button
                    type="button"
                    className={`form-input ${profile.gender === 'female' ? 'active-card' : ''}`}
                    style={{
                      flex: 1,
                      border: profile.gender === 'female' ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: profile.gender === 'female' ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                      fontWeight: profile.gender === 'female' ? '700' : '400',
                      cursor: 'pointer'
                    }}
                    onClick={() => updateField('gender', 'female')}
                  >
                    Feminino
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Passo 2: Métricas Corporais */}
          {step === 2 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Suas Medidas</h2>
                <p style={{ color: 'var(--text-muted)' }}>Precisamos das suas métricas físicas para calcular sua taxa metabólica.</p>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Peso Atual (kg)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Ex: 80"
                    value={profile.weight}
                    onChange={e => updateField('weight', e.target.value)}
                    min="30"
                    max="250"
                    required
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Altura (cm)</label>
                  <input
                    type="number"
                    className="form-input"
                    placeholder="Ex: 175"
                    value={profile.height}
                    onChange={e => updateField('height', e.target.value)}
                    min="100"
                    max="250"
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Peso Desejado / Meta (kg)</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Ex: 75"
                  value={profile.targetWeight}
                  onChange={e => updateField('targetWeight', e.target.value)}
                  min="30"
                  max="250"
                  required
                />
              </div>
            </div>
          )}

          {/* Passo 3: Objetivo */}
          {step === 3 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Qual seu objetivo?</h2>
                <p style={{ color: 'var(--text-muted)' }}>O especialista usará isso para ajustar o balanço energético da dieta.</p>
              </div>

              {[
                { id: 'hypertrophy', title: 'Hipertrofia', desc: 'Foco no ganho de massa muscular (superávit calórico controlado).' },
                { id: 'emagrecimento', title: 'Emagrecimento / Definição', desc: 'Foco na perda de gordura corporal mantendo massa magra (déficit calórico).' },
                { id: 'recomposicao', title: 'Recomposição Corporal', desc: 'Ganhar massa muscular e perder gordura simultaneamente (manutenção calórica).' },
                { id: 'condicionamento', title: 'Condicionamento Físico', desc: 'Melhorar a resistência e saúde geral sem grandes alterações de peso.' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('goal', opt.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '14px',
                    border: profile.goal === opt.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: profile.goal === opt.id ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: profile.goal === opt.id ? '0 4px 20px rgba(34, 197, 94, 0.1)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '1.05rem', color: profile.goal === opt.id ? 'var(--primary)' : 'var(--text)' }}>
                      {opt.title}
                    </span>
                    <input
                      type="radio"
                      checked={profile.goal === opt.id}
                      onChange={() => {}}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{opt.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Passo 4: Nível de Atividade */}
          {step === 4 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Nível de Atividade</h2>
                <p style={{ color: 'var(--text-muted)' }}>Precisamos saber o quão ativo é o seu dia a dia fora dos treinos.</p>
              </div>

              {[
                { id: 'sedentary', title: 'Sedentário', desc: 'Trabalho de escritório, pouca ou nenhuma atividade física diária.' },
                { id: 'lightly', title: 'Levemente Ativo', desc: 'Atividades leves no dia a dia, caminhadas ocasionais.' },
                { id: 'moderately', title: 'Moderadamente Ativo', desc: 'Movimenta-se bastante durante o dia, trabalho ativo ou esportes moderados.' },
                { id: 'very', title: 'Muito Ativo', desc: 'Trabalho físico pesado ou atividade física intensa diariamente.' },
                { id: 'extra', title: 'Extremamente Ativo', desc: 'Atleta profissional ou trabalho físico extremo com treinos duplos.' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('activity', opt.id)}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '12px',
                    border: profile.activity === opt.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: profile.activity === opt.id ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <span style={{ fontWeight: 600, fontSize: '1rem', color: profile.activity === opt.id ? 'var(--primary)' : 'var(--text)' }}>
                      {opt.title}
                    </span>
                    <input
                      type="radio"
                      checked={profile.activity === opt.id}
                      onChange={() => {}}
                      style={{ accentColor: 'var(--primary)' }}
                    />
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Passo 5: Preferência Alimentar */}
          {step === 5 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Dieta & Preferências</h2>
                <p style={{ color: 'var(--text-muted)' }}>Escolha um modelo alimentar. Adaptaremos as fontes de macros para você.</p>
              </div>

              {[
                { id: 'general', title: 'Sem Restrições (Geral)', desc: 'Consome carnes, ovos, laticínios, cereais sem restrição.' },
                { id: 'vegetarian', title: 'Vegetariana', desc: 'Sem carnes (peixe, frango ou vermelha). Inclui ovos e laticínios.' },
                { id: 'vegan', title: 'Vegana', desc: 'Exclusivamente à base de plantas. Sem nenhum derivado animal.' },
                { id: 'lactose_free', title: 'Sem Lactose', desc: 'Dieta padrão excluindo laticínios com lactose.' },
                { id: 'gluten_free', title: 'Sem Glúten', desc: 'Refeições feitas com carboidratos naturalmente sem glúten (arroz, batata).' },
                { id: 'low_carb', title: 'Low Carb', desc: 'Redução consciente no consumo de carboidratos, priorizando proteínas e gorduras boas.' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('dietType', opt.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: profile.dietType === opt.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: profile.dietType === opt.id ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '12px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: profile.dietType === opt.id ? 'var(--primary)' : 'var(--text)' }}>
                      {opt.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{opt.desc}</span>
                  </div>
                  <input
                    type="radio"
                    checked={profile.dietType === opt.id}
                    onChange={() => {}}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Passo 6: Local e Frequência de Treino */}
          {step === 6 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Estilo de Treino</h2>
                <p style={{ color: 'var(--text-muted)' }}>Onde você treinará e quantas vezes por semana?</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Onde pretende treinar?</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { id: 'gym', label: 'Academia' },
                    { id: 'home', label: 'Em Casa' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      className="form-input"
                      style={{
                        flex: 1,
                        border: profile.workoutLocation === opt.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: profile.workoutLocation === opt.id ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                        fontWeight: profile.workoutLocation === opt.id ? '700' : '400',
                        cursor: 'pointer'
                      }}
                      onClick={() => updateField('workoutLocation', opt.id)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Frequência semanal (Dias por semana)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                  {['3', '4', '5', '6'].map(freq => (
                    <button
                      key={freq}
                      type="button"
                      className="form-input"
                      style={{
                        border: profile.workoutFrequency === freq ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: profile.workoutFrequency === freq ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                        fontWeight: profile.workoutFrequency === freq ? '700' : '400',
                        cursor: 'pointer',
                        padding: '12px 0'
                      }}
                      onClick={() => updateField('workoutFrequency', freq)}
                    >
                      {freq}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Passo 7: Área de Foco */}
          {step === 7 && (
            <div className="animate-slide-up" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '8px' }}>Foco de Treino</h2>
                <p style={{ color: 'var(--text-muted)' }}>Selecione um grupo muscular ou foco principal para otimizarmos a ficha.</p>
              </div>

              {[
                { id: 'geral', title: 'Equilibrado (Geral)', desc: 'Treino completo distribuído harmoniosamente para o corpo todo.' },
                { id: 'upper', title: 'Foco em Superiores', desc: 'Enfatiza peito, costas, ombros e braços.' },
                { id: 'lower', title: 'Foco em Inferiores', desc: 'Enfatiza coxas, glúteos, posteriores e panturrilhas.' },
                { id: 'core', title: 'Fortalecimento de Core', desc: 'Volume aumentado para abdômen, lombar e estabilizadores.' }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => updateField('focusArea', opt.id)}
                  style={{
                    padding: '14px',
                    borderRadius: '12px',
                    border: profile.focusArea === opt.id ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: profile.focusArea === opt.id ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingRight: '12px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.95rem', color: profile.focusArea === opt.id ? 'var(--primary)' : 'var(--text)' }}>
                      {opt.title}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{opt.desc}</span>
                  </div>
                  <input
                    type="radio"
                    checked={profile.focusArea === opt.id}
                    onChange={() => {}}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={prevStep}>
            Voltar
          </button>
          
          {step < 7 ? (
            <button
              type="button"
              className="btn-primary"
              style={{ flex: 1.5 }}
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Próximo
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          ) : (
            <button type="submit" className="btn-primary" style={{ flex: 1.5 }}>
              Gerar Meu Plano
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
