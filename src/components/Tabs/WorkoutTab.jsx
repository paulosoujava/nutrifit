import React, { useState, useEffect } from 'react';

export default function WorkoutTab({ workouts, activeWorkoutDay, setActiveWorkoutDay, workoutLogs, setWorkoutLogs }) {
  const activeWorkout = workouts[activeWorkoutDay] || workouts[0] || { day: 'Sem Treino', focus: '', exercises: [] };
  
  // Timer de Descanso
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [initialTime, setInitialTime] = useState(60);

  useEffect(() => {
    let interval = null;
    if (timerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerActive(false);
      // Aqui poderíamos tocar um som sutil, mas manteremos visual
      alert('Tempo de descanso concluído! Prepare-se para a próxima série.');
      setTimeLeft(initialTime);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, initialTime]);

  const startTimer = (seconds) => {
    setInitialTime(seconds);
    setTimeLeft(seconds);
    setTimerActive(true);
  };

  const stopTimer = () => {
    setTimerActive(false);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setTimerActive(true);
  };

  const handleWeightChange = (exerciseName, val) => {
    setWorkoutLogs(prev => ({
      ...prev,
      [`weight_${exerciseName}`]: val
    }));
  };

  const handleSetToggle = (exerciseName, setIndex) => {
    const key = `set_${exerciseName}_${setIndex}`;
    setWorkoutLogs(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    // Auto-disparar timer de descanso de 60s ao concluir uma série
    if (!workoutLogs[key]) {
      startTimer(60);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      
      {/* Seletor de Treino */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px' }}>Ficha de Treinos</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Acompanhe suas cargas, conclua as séries e descanse.</p>
      </div>

      {/* Tabs dos Dias de Treino */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {workouts.map((w, idx) => (
          <button
            key={idx}
            onClick={() => setActiveWorkoutDay(idx)}
            style={{
              padding: '10px 16px',
              borderRadius: '10px',
              border: activeWorkoutDay === idx ? '2px solid var(--primary)' : '1px solid var(--border)',
              background: activeWorkoutDay === idx ? 'var(--primary-light)' : 'rgba(255,255,255,0.02)',
              color: activeWorkoutDay === idx ? 'var(--primary)' : 'var(--text)',
              fontWeight: activeWorkoutDay === idx ? 700 : 500,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              fontSize: '0.85rem'
            }}
          >
            {w.day}
          </button>
        ))}
      </div>

      {/* Detalhes do Treino Ativo */}
      <div className="glass-card" style={{ padding: '16px', borderLeft: '4px solid var(--primary)' }}>
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700 }}>
          Grupo Foco
        </span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '2px' }}>{activeWorkout.focus}</h3>
      </div>

      {/* Timer de Descanso Flutuante/Fixado */}
      {timerActive && (
        <div className="glass-card animate-scale-in" style={{
          position: 'sticky',
          top: '0',
          zIndex: 50,
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          border: '1px solid var(--primary)',
          boxShadow: '0 4px 20px rgba(34, 197, 94, 0.2)',
          background: 'rgba(18, 18, 20, 0.95)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: 'var(--primary)',
              animation: 'bounce 1s infinite'
            }}></div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Descanso: <span style={{ color: 'var(--primary)', fontFamily: 'monospace', fontSize: '1rem' }}>{timeLeft}s</span></span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={resetTimer} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}>Reiniciar</button>
            <button onClick={stopTimer} style={{ background: 'var(--accent-red-light)', border: 'none', color: 'var(--accent-red)', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 'bold' }}>Pular</button>
          </div>
        </div>
      )}

      {/* Lista de Exercícios */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {activeWorkout.exercises.map((ex, exIdx) => (
          <div key={exIdx} className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            
            {/* Cabeçalho do Exercício */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-highlight)' }}>{ex.name}</h4>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Foco: {ex.focus}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
                  {ex.sets}x{ex.reps}
                </span>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Descanso: {ex.rest}s</p>
              </div>
            </div>

            {/* Dica de Execução */}
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', padding: '8px 12px', borderRadius: '8px', borderLeft: '2px solid rgba(255,255,255,0.1)' }}>
              💡 {ex.instructions}
            </p>

            {/* Cargas e Séries */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
              
              {/* Input de Carga */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Carga (kg):</span>
                <input
                  type="text"
                  placeholder="--"
                  value={workoutLogs[`weight_${ex.name}`] || ''}
                  onChange={e => handleWeightChange(ex.name, e.target.value)}
                  style={{
                    width: '60px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '6px 8px',
                    color: 'var(--text)',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Checkboxes de Séries */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Séries:</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  {Array.from({ length: ex.sets }).map((_, setIdx) => {
                    const key = `set_${ex.name}_${setIdx}`;
                    const isSetDone = !!workoutLogs[key];
                    return (
                      <button
                        key={setIdx}
                        onClick={() => handleSetToggle(ex.name, setIdx)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: isSetDone ? '1px solid var(--primary)' : '1px solid var(--border)',
                          background: isSetDone ? 'var(--primary)' : 'transparent',
                          color: isSetDone ? '#000' : 'var(--text-muted)',
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {setIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Botão de descanso rápido */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => startTimer(ex.rest)} 
                style={{
                  background: 'var(--primary-light)',
                  border: 'none',
                  color: 'var(--primary)',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '0.7rem',
                  fontWeight: 600
                }}
              >
                ⏱️ Iniciar Descanso
              </button>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
