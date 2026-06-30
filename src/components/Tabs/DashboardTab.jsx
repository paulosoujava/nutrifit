import React from 'react';

export default function DashboardTab({
  profile,
  macros,
  waterIntake,
  setWaterIntake,
  dietCompliance,
  setDietCompliance,
  workoutCompliance,
  setWorkoutCompliance,
  meals,
  loggedMeals
}) {
  const targetCalories = macros.calories || 2000;
  
  // Calcular calorias consumidas com base nas refeições marcadas
  const consumedCalories = meals.reduce((acc, meal) => {
    if (loggedMeals[meal.id]) {
      return acc + (meal.calories || 0);
    }
    return acc;
  }, 0);

  const remainingCalories = Math.max(0, targetCalories - consumedCalories);

  // Água
  const waterTarget = Math.round(parseFloat(profile.weight) * 35) || 2500; // 35ml por kg
  const waterPercentage = Math.min(100, Math.round((waterIntake / waterTarget) * 100));

  const addWater = () => {
    setWaterIntake(prev => Math.min(waterTarget + 1000, prev + 250));
  };
  
  const removeWater = () => {
    setWaterIntake(prev => Math.max(0, prev - 250));
  };

  // Porcentagem para o anel de calorias SVG
  const caloriePercentage = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));
  const strokeDashoffset = 280 - (280 * caloriePercentage) / 100;

  // Macros consumidos estimado
  const consumedProtein = Math.round((macros.protein * caloriePercentage) / 100);
  const consumedCarbs = Math.round((macros.carbs * caloriePercentage) / 100);
  const consumedFat = Math.round((macros.fat * caloriePercentage) / 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      
      {/* Cabeçalho de Resumo */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Olá, especialista</span>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-highlight)' }}>{profile.name}!</h2>
        </div>
        <div style={{
          background: 'var(--primary-light)',
          color: 'var(--primary)',
          padding: '6px 12px',
          borderRadius: '10px',
          fontSize: '0.8rem',
          fontWeight: 700
        }}>
          {profile.goal === 'hypertrophy' && 'Hipertrofia 🔥'}
          {profile.goal === 'emagrecimento' && 'Emagrecimento ⚡'}
          {profile.goal === 'recomposicao' && 'Recomposição ⚖️'}
          {profile.goal === 'condicionamento' && 'Fitness 🏃‍♂️'}
        </div>
      </div>

      {/* Círculo de Calorias */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-around', gap: '16px' }}>
        
        {/* SVG Ring */}
        <div style={{ position: 'relative', width: '120px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="60" cy="60" r="45" stroke="rgba(255,255,255,0.04)" strokeWidth="8" fill="transparent" />
            <circle 
              cx="60" 
              cy="60" 
              r="45" 
              stroke="var(--primary)" 
              strokeWidth="8" 
              fill="transparent" 
              strokeDasharray="282.7"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', textAlign: 'center' }}>
            <span style={{ fontSize: '1.6rem', fontWeight: 800 }}>{remainingCalories}</span>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Restantes</p>
          </div>
        </div>

        {/* Info lateral */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Meta Diária</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{targetCalories} kcal</div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Consumido</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{consumedCalories} kcal</div>
          </div>
        </div>

      </div>

      {/* Macronutrientes */}
      <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>Distribuição de Macros</h3>
        
        {/* Proteína */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 500 }}>Proteínas (Construção)</span>
            <span style={{ color: 'var(--text-muted)' }}>{consumedProtein}g / {macros.protein}g</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, (consumedProtein / macros.protein) * 100)}%`, height: '100%', background: 'var(--primary)' }}></div>
          </div>
        </div>

        {/* Carbo */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 500 }}>Carboidratos (Energia)</span>
            <span style={{ color: 'var(--text-muted)' }}>{consumedCarbs}g / {macros.carbs}g</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, (consumedCarbs / macros.carbs) * 100)}%`, height: '100%', background: 'var(--accent-orange)' }}></div>
          </div>
        </div>

        {/* Gordura */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
            <span style={{ fontWeight: 500 }}>Gorduras (Hormonal)</span>
            <span style={{ color: 'var(--text-muted)' }}>{consumedFat}g / {macros.fat}g</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(100, (consumedFat / macros.fat) * 100)}%`, height: '100%', background: 'var(--accent-blue)' }}></div>
          </div>
        </div>
      </div>

      {/* Água e Compliance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
        
        {/* Copo D'água */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Hidratação</span>
          
          <div className="water-cup-container">
            <div className="water-fill" style={{ height: `${waterPercentage}%` }}></div>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: waterPercentage > 40 ? '#000' : 'var(--text)',
              textShadow: waterPercentage > 40 ? 'none' : '0 1px 3px rgba(0,0,0,0.8)'
            }}>
              {waterIntake} ml
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button className="btn-secondary" style={{ padding: '6px', flex: 1, minHeight: '34px', fontSize: '0.9rem' }} onClick={removeWater}>-</button>
            <button className="btn-primary" style={{ padding: '6px', flex: 2, minHeight: '34px', fontSize: '0.9rem', boxShadow: 'none' }} onClick={addWater}>+250ml</button>
          </div>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Meta: {waterTarget} ml</span>
        </div>

        {/* Checklist de Metas */}
        <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>Checklist do Dia</span>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, justifyContent: 'center' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={workoutCompliance}
                onChange={e => setWorkoutCompliance(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span>Treino Feito</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.85rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={dietCompliance}
                onChange={e => setDietCompliance(e.target.checked)}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
              />
              <span>Dieta Batida</span>
            </label>
          </div>

          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textAlign: 'center', borderTop: '1px solid var(--border)', paddingTop: '6px' }}>
            {workoutCompliance && dietCompliance ? '🔥 Dia perfeito!' : 'Foco na constância'}
          </div>
        </div>

      </div>

    </div>
  );
}
