import React, { useState } from 'react';
import DashboardTab from './Tabs/DashboardTab';
import DietTab from './Tabs/DietTab';
import WorkoutTab from './Tabs/WorkoutTab';
import ChatTab from './Tabs/ChatTab';
import ProgressTab from './Tabs/ProgressTab';

export default function Dashboard({
  profile,
  macros,
  meals,
  workouts,
  waterIntake,
  setWaterIntake,
  dietCompliance,
  setDietCompliance,
  workoutCompliance,
  setWorkoutCompliance,
  loggedMeals,
  setLoggedMeals,
  activeWorkoutDay,
  setActiveWorkoutDay,
  workoutLogs,
  setWorkoutLogs,
  weightHistory,
  setWeightHistory,
  onSubstituteFood,
  onReset
}) {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'diet' | 'workout' | 'chat' | 'progress'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
      
      {/* Cabeçalho Fixo do Dashboard */}
      <header className="glass-card" style={{
        padding: 'calc(16px + env(safe-area-inset-top, 0px)) 20px 16px 20px',
        borderBottom: '1px solid var(--border)',
        borderRadius: '0 0 20px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, var(--primary) 0%, #16a34a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.5px' }}>
            NutriFit <span style={{ color: 'var(--primary)' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }}></span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>Especialista Ativo</span>
        </div>
      </header>

      {/* Área Principal de Rolagem */}
      <div className="dashboard-scrollable">
        {activeTab === 'home' && (
          <DashboardTab
            profile={profile}
            macros={macros}
            waterIntake={waterIntake}
            setWaterIntake={setWaterIntake}
            dietCompliance={dietCompliance}
            setDietCompliance={setDietCompliance}
            workoutCompliance={workoutCompliance}
            setWorkoutCompliance={setWorkoutCompliance}
            meals={meals}
            loggedMeals={loggedMeals}
          />
        )}

        {activeTab === 'diet' && (
          <DietTab
            meals={meals}
            loggedMeals={loggedMeals}
            setLoggedMeals={setLoggedMeals}
            onSubstituteFood={onSubstituteFood}
          />
        )}

        {activeTab === 'workout' && (
          <WorkoutTab
            workouts={workouts}
            activeWorkoutDay={activeWorkoutDay}
            setActiveWorkoutDay={setActiveWorkoutDay}
            workoutLogs={workoutLogs}
            setWorkoutLogs={setWorkoutLogs}
          />
        )}

        {activeTab === 'chat' && (
          <ChatTab
            profile={profile}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressTab
            profile={profile}
            macros={macros}
            meals={meals}
            workouts={workouts}
            weightHistory={weightHistory}
            setWeightHistory={setWeightHistory}
            onReset={onReset}
          />
        )}
      </div>

      {/* Navegação Inferior Fixa */}
      <nav className="glass-card" style={{
        height: 'calc(76px + env(safe-area-inset-bottom, 0px))',
        borderTop: '1px solid var(--border)',
        borderRadius: '24px 24px 0 0',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 10px env(safe-area-inset-bottom, 0px) 10px',
        zIndex: 10,
        width: '100%',
        flexShrink: 0
      }}>
        {[
          { id: 'home', label: 'Geral', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="9"></rect>
              <rect x="14" y="3" width="7" height="5"></rect>
              <rect x="14" y="12" width="7" height="9"></rect>
              <rect x="3" y="16" width="7" height="5"></rect>
            </svg>
          )},
          { id: 'diet', label: 'Dieta', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
            </svg>
          )},
          { id: 'workout', label: 'Treino', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="6" y1="12" x2="18" y2="12"></line>
              <line x1="6" y1="8" x2="6" y2="16"></line>
              <line x1="18" y1="8" x2="18" y2="16"></line>
              <line x1="2" y1="12" x2="6" y2="12"></line>
              <line x1="18" y1="12" x2="22" y2="12"></line>
            </svg>
          )},
          { id: 'chat', label: 'Chat', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          )},
          { id: 'progress', label: 'Progresso', icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20V10M18 20V4M6 20v-4"></path>
            </svg>
          )}
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isActive ? 'scale(1.08)' : 'scale(1)'
              }}
            >
              <div style={{
                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                transition: 'color 0.2s ease'
              }}>
                {tab.icon}
              </div>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: isActive ? 700 : 500
              }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

    </div>
  );
}
