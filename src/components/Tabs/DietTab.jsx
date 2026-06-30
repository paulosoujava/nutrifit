import React, { useState } from 'react';
import { foodSubstitutions } from '../../utils/mockData';

export default function DietTab({ meals, loggedMeals, setLoggedMeals, onSubstituteFood }) {
  const [activeSubstitution, setActiveSubstitution] = useState(null); // { mealId, itemIndex, itemName }

  const handleToggleMeal = (mealId) => {
    setLoggedMeals(prev => ({
      ...prev,
      [mealId]: !prev[mealId]
    }));
  };

  const openSubstitutionModal = (mealId, itemIndex, itemName) => {
    // Achar equivalências no banco de dados de substituições
    let foundSubstitutes = [];
    let matchedCategory = '';

    // Procurar por correspondência de nome parcial nas categorias (carboidratos, proteinas, gorduras)
    for (const [category, list] of Object.entries(foodSubstitutions)) {
      const match = list.find(f => 
        itemName.toLowerCase().includes(f.name.toLowerCase()) || 
        f.name.toLowerCase().includes(itemName.toLowerCase())
      );
      if (match) {
        foundSubstitutes = match.substitutes;
        matchedCategory = category;
        break;
      }
    }

    // Se não achou correspondência exata, sugerir um padrão com base no nome do alimento
    if (foundSubstitutes.length === 0) {
      if (itemName.toLowerCase().includes('frango') || itemName.toLowerCase().includes('ovo') || itemName.toLowerCase().includes('peixe') || itemName.toLowerCase().includes('carne') || itemName.toLowerCase().includes('tofu') || itemName.toLowerCase().includes('whey')) {
        foundSubstitutes = foodSubstitutions.proteinas[0].substitutes;
        matchedCategory = 'proteínas';
      } else if (itemName.toLowerCase().includes('arroz') || itemName.toLowerCase().includes('batata') || itemName.toLowerCase().includes('aveia') || itemName.toLowerCase().includes('pão') || itemName.toLowerCase().includes('tapioca') || itemName.toLowerCase().includes('fruta')) {
        foundSubstitutes = foodSubstitutions.carboidratos[0].substitutes;
        matchedCategory = 'carboidratos';
      } else {
        foundSubstitutes = foodSubstitutions.gorduras[0].substitutes;
        matchedCategory = 'gorduras saudáveis';
      }
    }

    setActiveSubstitution({
      mealId,
      itemIndex,
      itemName,
      category: matchedCategory,
      options: foundSubstitutes
    });
  };

  const selectSubstitution = (optionText) => {
    if (activeSubstitution) {
      onSubstituteFood(
        activeSubstitution.mealId,
        activeSubstitution.itemIndex,
        optionText
      );
      setActiveSubstitution(null);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>Seu Plano Alimentar</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Bata suas metas de macros marcando as refeições consumidas.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {meals.map((meal) => {
          const isDone = loggedMeals[meal.id];
          return (
            <div 
              key={meal.id} 
              className="glass-card" 
              style={{ 
                padding: '16px', 
                border: isDone ? '1px solid var(--primary-light)' : '1px solid var(--border)',
                background: isDone ? 'rgba(34, 197, 94, 0.03)' : 'rgba(28, 28, 30, 0.7)',
                transition: 'all 0.3s ease'
              }}
            >
              
              {/* Cabeçalho da Refeição */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input
                    type="checkbox"
                    checked={!!isDone}
                    onChange={() => handleToggleMeal(meal.id)}
                    style={{ width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                  />
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700, textDecoration: isDone ? 'line-through' : 'none', color: isDone ? 'var(--text-muted)' : 'var(--text)' }}>
                      {meal.name}
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{meal.time} • {meal.calories} kcal</span>
                  </div>
                </div>
                
                <span style={{
                  fontSize: '0.75rem',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: isDone ? 'var(--primary-light)' : 'rgba(255,255,255,0.04)',
                  color: isDone ? 'var(--primary)' : 'var(--text-muted)',
                  fontWeight: 600
                }}>
                  {isDone ? 'Concluída' : 'Pendente'}
                </span>
              </div>

              {/* Itens de Alimento */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingLeft: '30px' }}>
                {meal.items.map((item, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      fontSize: '0.9rem', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start',
                      borderBottom: index < meal.items.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none',
                      paddingBottom: '8px'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 500, color: isDone ? 'var(--text-muted)' : 'var(--text)' }}>
                        {item.name} <span style={{ color: 'var(--primary)', fontSize: '0.85rem' }}>({item.qty})</span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.info}
                      </div>
                    </div>

                    {!isDone && (
                      <button 
                        onClick={() => openSubstitutionModal(meal.id, index, item.name)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-muted)',
                          fontSize: '0.7rem',
                          cursor: 'pointer',
                          textDecoration: 'underline',
                          padding: '2px 4px'
                        }}
                      >
                        Substituir
                      </button>
                    )}
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Modal de Substituição */}
      {activeSubstitution && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.85)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          animation: 'fadeIn 0.25s ease-out'
        }} onClick={() => setActiveSubstitution(null)}>
          <div 
            style={{
              width: '100%',
              maxWidth: '480px',
              background: 'var(--surface-card)',
              borderTopLeftRadius: '24px',
              borderTopRightRadius: '24px',
              padding: '24px',
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              maxHeight: '80vh',
              overflowY: 'auto'
            }} 
            onClick={e => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
                  Equivalentes em {activeSubstitution.category}
                </span>
                <button 
                  onClick={() => setActiveSubstitution(null)}
                  style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1.2rem', cursor: 'pointer' }}
                >
                  &times;
                </button>
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Substituir: "{activeSubstitution.itemName}"</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {activeSubstitution.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => selectSubstitution(opt)}
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '14px 16px',
                    color: 'var(--text)',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => e.target.style.borderColor = 'var(--primary)'}
                  onMouseLeave={e => e.target.style.borderColor = 'var(--border)'}
                >
                  {opt}
                </button>
              ))}
            </div>

            <button 
              className="btn-secondary" 
              style={{ marginTop: '8px', padding: '12px' }}
              onClick={() => setActiveSubstitution(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
