import React, { useState } from 'react';

export default function ProgressTab({ 
  profile, 
  macros, 
  meals, 
  workouts, 
  weightHistory, 
  setWeightHistory, 
  onReset 
}) {
  const [newWeight, setNewWeight] = useState('');
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleAddWeight = (e) => {
    e.preventDefault();
    if (!newWeight || isNaN(newWeight)) return;

    const date = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    const entry = {
      date,
      weight: parseFloat(newWeight)
    };

    setWeightHistory(prev => [...prev, entry]);
    setNewWeight('');
  };

  // Desenhar o gráfico de linha em SVG
  const renderWeightChart = () => {
    if (weightHistory.length === 0) return null;

    const weights = weightHistory.map(w => w.weight);
    const minW = Math.min(...weights) - 2;
    const maxW = Math.max(...weights) + 2;
    const range = maxW - minW || 1;

    const width = 360;
    const height = 150;
    const padding = 20;

    const points = weightHistory.map((item, idx) => {
      const x = padding + (idx * (width - 2 * padding)) / (weightHistory.length - 1 || 1);
      const y = height - padding - ((item.weight - minW) * (height - 2 * padding)) / range;
      return { x, y, weight: item.weight, date: item.date };
    });

    const pathD = points.reduce((acc, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, '');

    return (
      <div style={{ position: 'relative', marginTop: '10px' }}>
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          {/* Linha do Gráfico */}
          {points.length > 1 && (
            <path 
              d={pathD} 
              fill="none" 
              stroke="var(--primary)" 
              strokeWidth="3" 
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Pontos de dados */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="5" fill="var(--background)" stroke="var(--primary)" strokeWidth="2.5" />
              {/* Valor do peso no topo do ponto */}
              <text x={p.x} y={p.y - 8} fill="var(--text)" fontSize="10" textAnchor="middle" fontWeight="bold">
                {p.weight}kg
              </text>
              {/* Data embaixo */}
              <text x={p.x} y={height - 5} fill="var(--text-muted)" fontSize="9" textAnchor="middle">
                {p.date}
              </text>
            </g>
          ))}
        </svg>
      </div>
    );
  };

  const handleSharePlan = () => {
    // Gerar string limpa do plano
    let text = `📋 PLANO NUTRIFIT AI - ESPECIALISTA DIGITAL\n`;
    text += `Nome: ${profile.name} | Meta: ${profile.goal}\n`;
    text += `Calorias Alvo: ${macros.calories} kcal (P: ${macros.protein}g | C: ${macros.carbs}g | G: ${macros.fat}g)\n\n`;
    
    text += `🍎 DIETA SUGERIDA:\n`;
    meals.forEach(m => {
      text += `• ${m.name} (${m.time}) - ${m.calories} kcal\n`;
      m.items.forEach(i => {
        text += `  - ${i.name} (${i.qty}) | ${i.info}\n`;
      });
    });
    
    text += `\n🏋️‍♀️ TREINO SUGERIDO:\n`;
    workouts.forEach(w => {
      text += `• ${w.day}: ${w.focus}\n`;
      w.exercises.forEach(e => {
        text += `  - ${e.name} | ${e.sets}x${e.reps} (Descanso: ${e.rest}s)\n`;
      });
    });

    if (navigator.share) {
      navigator.share({
        title: 'Meu Plano de Treino e Dieta - NutriFit AI',
        text: text
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>Evolução & Progresso</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Acompanhe o seu peso e exporte ou resete o seu plano.</p>
      </div>

      {/* Rastreamento de Peso */}
      <div className="glass-card" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>Gráfico de Peso</h3>
        
        {weightHistory.length === 0 ? (
          <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Nenhum peso registrado ainda. Registre abaixo para gerar o gráfico!
          </div>
        ) : (
          renderWeightChart()
        )}

        {/* Formulário de Registro de Peso */}
        <form onSubmit={handleAddWeight} style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <input
            type="number"
            step="0.1"
            placeholder="Registrar peso (ex: 79.5)"
            value={newWeight}
            onChange={e => setNewWeight(e.target.value)}
            className="form-input"
            style={{ padding: '10px 12px', fontSize: '0.9rem', flex: 1 }}
            required
          />
          <button type="submit" className="btn-primary" style={{ padding: '10px 16px', borderRadius: '12px', fontSize: '0.85rem', boxShadow: 'none' }}>
            Registrar
          </button>
        </form>
      </div>

      {/* Resumo do Diagnóstico */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Perfil do Diagnóstico</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Peso Inicial</span>
            <p style={{ fontWeight: 600 }}>{profile.weight} kg</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Meta de Peso</span>
            <p style={{ fontWeight: 600 }}>{profile.targetWeight} kg</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Altura</span>
            <p style={{ fontWeight: 600 }}>{profile.height} cm</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>Tipo de Dieta</span>
            <p style={{ fontWeight: 600, textTransform: 'capitalize' }}>
              {profile.dietType === 'general' ? 'Geral' :
               profile.dietType === 'vegetarian' ? 'Vegetariana' :
               profile.dietType === 'vegan' ? 'Vegana' :
               profile.dietType === 'lactose_free' ? 'Sem Lactose' :
               profile.dietType === 'gluten_free' ? 'Sem Glúten' : 'Low Carb'}
            </p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>TMB (Metabolismo)</span>
            <p style={{ fontWeight: 600 }}>{macros.bmr} kcal</p>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>GETD (Gasto Total)</span>
            <p style={{ fontWeight: 600 }}>{macros.tdee} kcal</p>
          </div>
        </div>
      </div>

      {/* Ações de Compartilhamento e Reset */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button 
          onClick={handleSharePlan} 
          className="btn-primary" 
          style={{ width: '100%', fontSize: '0.95rem' }}
        >
          {copied ? '✓ Copiado para a Área de Transferência!' : 'Exportar / Compartilhar Plano'}
          {!copied && (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3"></circle>
              <circle cx="6" cy="12" r="3"></circle>
              <circle cx="18" cy="19" r="3"></circle>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
            </svg>
          )}
        </button>

        {showResetConfirm ? (
          <div className="glass-card" style={{ padding: '16px', border: '1px solid var(--accent-red)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text)', textAlign: 'center' }}>
              Tem certeza? Isso apagará todos os seus treinos, metas de peso e histórico localmente.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => setShowResetConfirm(false)}
                className="btn-secondary"
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem' }}
              >
                Cancelar
              </button>
              <button 
                onClick={onReset}
                className="btn-primary"
                style={{ flex: 1, padding: '8px', fontSize: '0.85rem', background: 'var(--accent-red)', color: '#fff', boxShadow: 'none' }}
              >
                Sim, Apagar
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setShowResetConfirm(true)}
            className="btn-secondary" 
            style={{ width: '100%', border: '1px solid var(--accent-red-light)', color: 'var(--accent-red)', fontSize: '0.9rem' }}
          >
            Refazer Questionário / Resetar
          </button>
        )}
      </div>

    </div>
  );
}
