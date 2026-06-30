import React, { useState, useEffect } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import Questionnaire from './components/Questionnaire';
import CalculatingScreen from './components/CalculatingScreen';
import Dashboard from './components/Dashboard';
import InstallPrompt from './components/InstallPrompt';
import { calculateMacrosAndCalories, generateDietPlan, generateWorkoutPlan } from './utils/specialistEngine';

export default function App() {
  // Estado de Tela: 'welcome' | 'questionnaire' | 'calculating' | 'dashboard'
  const [screen, setScreen] = useState('welcome');
  
  // Dados do perfil e do plano do usuário
  const [profile, setProfile] = useState(null);
  const [macros, setMacros] = useState(null);
  const [meals, setMeals] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  // Rastreamento Diário
  const [waterIntake, setWaterIntake] = useState(0);
  const [dietCompliance, setDietCompliance] = useState(false);
  const [workoutCompliance, setWorkoutCompliance] = useState(false);
  const [loggedMeals, setLoggedMeals] = useState({});
  const [activeWorkoutDay, setActiveWorkoutDay] = useState(0);
  const [workoutLogs, setWorkoutLogs] = useState({});
  const [weightHistory, setWeightHistory] = useState([]);

  // Carregar dados salvos ao iniciar
  useEffect(() => {
    const savedProfile = localStorage.getItem('nutrifit_profile');
    const savedMacros = localStorage.getItem('nutrifit_macros');
    const savedMeals = localStorage.getItem('nutrifit_meals');
    const savedWorkouts = localStorage.getItem('nutrifit_workouts');

    if (savedProfile && savedMacros && savedMeals && savedWorkouts) {
      setProfile(JSON.parse(savedProfile));
      setMacros(JSON.parse(savedMacros));
      setMeals(JSON.parse(savedMeals));
      setWorkouts(JSON.parse(savedWorkouts));

      // Carregar logs diários
      const savedWater = localStorage.getItem('nutrifit_water');
      const savedDietComp = localStorage.getItem('nutrifit_diet_comp');
      const savedWorkoutComp = localStorage.getItem('nutrifit_workout_comp');
      const savedLoggedMeals = localStorage.getItem('nutrifit_logged_meals');
      const savedActiveWorkoutDay = localStorage.getItem('nutrifit_active_workout_day');
      const savedWorkoutLogs = localStorage.getItem('nutrifit_workout_logs');
      const savedWeightHistory = localStorage.getItem('nutrifit_weight_history');

      if (savedWater) setWaterIntake(parseInt(savedWater));
      if (savedDietComp) setDietCompliance(savedDietComp === 'true');
      if (savedWorkoutComp) setWorkoutCompliance(savedWorkoutComp === 'true');
      if (savedLoggedMeals) setLoggedMeals(JSON.parse(savedLoggedMeals));
      if (savedActiveWorkoutDay) setActiveWorkoutDay(parseInt(savedActiveWorkoutDay));
      if (savedWorkoutLogs) setWorkoutLogs(JSON.parse(savedWorkoutLogs));
      if (savedWeightHistory) setWeightHistory(JSON.parse(savedWeightHistory));
    }
  }, []);

  // Salvar logs diários automaticamente sempre que mudarem
  useEffect(() => {
    if (profile) {
      localStorage.setItem('nutrifit_water', waterIntake.toString());
      localStorage.setItem('nutrifit_diet_comp', dietCompliance.toString());
      localStorage.setItem('nutrifit_workout_comp', workoutCompliance.toString());
      localStorage.setItem('nutrifit_logged_meals', JSON.stringify(loggedMeals));
      localStorage.setItem('nutrifit_active_workout_day', activeWorkoutDay.toString());
      localStorage.setItem('nutrifit_workout_logs', JSON.stringify(workoutLogs));
      localStorage.setItem('nutrifit_weight_history', JSON.stringify(weightHistory));
    }
  }, [waterIntake, dietCompliance, workoutCompliance, loggedMeals, activeWorkoutDay, workoutLogs, weightHistory, profile]);

  const handleStartNew = () => {
    setScreen('questionnaire');
  };

  const handleResume = () => {
    setScreen('dashboard');
  };

  const handleBackToWelcome = () => {
    setScreen('welcome');
  };

  const handleQuestionnaireSubmit = (profileData) => {
    // 1. Calcular Calorias e Macros
    const calculatedMacros = calculateMacrosAndCalories(profileData);
    
    // 2. Gerar Dieta e Exercícios
    const generatedDiet = generateDietPlan(profileData, calculatedMacros);
    const generatedWorkouts = generateWorkoutPlan(profileData);

    // 3. Salvar no Estado
    setProfile(profileData);
    setMacros(calculatedMacros);
    setMeals(generatedDiet);
    setWorkouts(generatedWorkouts);

    // Inicializar histórico de peso com o peso atual
    const initialWeightEntry = {
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      weight: parseFloat(profileData.weight)
    };
    setWeightHistory([initialWeightEntry]);

    // Limpar logs antigos de dietas/treinos passados
    setWaterIntake(0);
    setDietCompliance(false);
    setWorkoutCompliance(false);
    setLoggedMeals({});
    setActiveWorkoutDay(0);
    setWorkoutLogs({});

    // 4. Salvar permanentemente no LocalStorage
    localStorage.setItem('nutrifit_profile', JSON.stringify(profileData));
    localStorage.setItem('nutrifit_macros', JSON.stringify(calculatedMacros));
    localStorage.setItem('nutrifit_meals', JSON.stringify(generatedDiet));
    localStorage.setItem('nutrifit_workouts', JSON.stringify(generatedWorkouts));
    localStorage.setItem('nutrifit_weight_history', JSON.stringify([initialWeightEntry]));
    
    // Passar para a tela de cálculo (diagnóstico simulado)
    setScreen('calculating');
  };

  const handleCalculationComplete = () => {
    setScreen('dashboard');
  };

  const handleSubstituteFood = (mealId, itemIndex, newFoodText) => {
    // Modificar o alimento na refeição correspondente
    const updatedMeals = meals.map(meal => {
      if (meal.id === mealId) {
        const updatedItems = meal.items.map((item, idx) => {
          if (idx === itemIndex) {
            // Extrair o peso do substituto, se houver (ex: "100g de Batata Doce Cozida")
            // Vamos formatar de forma legível
            const qtyMatch = newFoodText.match(/^(\d+g|\d+ml|\d+\s\w+)\s/i);
            const qty = qtyMatch ? qtyMatch[1] : item.qty;
            const name = qtyMatch ? newFoodText.replace(qtyMatch[0], '') : newFoodText;
            
            return {
              name: name,
              qty: qty,
              info: 'Substituição aprovada pelo especialista'
            };
          }
          return item;
        });
        return { ...meal, items: updatedItems };
      }
      return meal;
    });

    setMeals(updatedMeals);
    localStorage.setItem('nutrifit_meals', JSON.stringify(updatedMeals));
  };

  const handleReset = () => {
    // Limpar tudo
    localStorage.clear();
    setProfile(null);
    setMacros(null);
    setMeals([]);
    setWorkouts([]);
    setWaterIntake(0);
    setDietCompliance(false);
    setWorkoutCompliance(false);
    setLoggedMeals({});
    setActiveWorkoutDay(0);
    setWorkoutLogs({});
    setWeightHistory([]);
    setScreen('welcome');
  };

  const hasSavedPlan = !!profile;

  return (
    <>
      {screen === 'welcome' && (
        <>
          <WelcomeScreen 
            onStartNew={handleStartNew} 
            onResume={handleResume} 
            hasSavedPlan={hasSavedPlan}
          />
          <InstallPrompt />
        </>
      )}

      {screen === 'questionnaire' && (
        <Questionnaire 
          onSubmit={handleQuestionnaireSubmit}
          onBackToWelcome={handleBackToWelcome}
        />
      )}

      {screen === 'calculating' && (
        <CalculatingScreen 
          onComplete={handleCalculationComplete}
        />
      )}

      {screen === 'dashboard' && profile && macros && (
        <>
          <Dashboard
            profile={profile}
            macros={macros}
            meals={meals}
            workouts={workouts}
            waterIntake={waterIntake}
            setWaterIntake={setWaterIntake}
            dietCompliance={dietCompliance}
            setDietCompliance={setDietCompliance}
            workoutCompliance={workoutCompliance}
            setWorkoutCompliance={setWorkoutCompliance}
            loggedMeals={loggedMeals}
            setLoggedMeals={setLoggedMeals}
            activeWorkoutDay={activeWorkoutDay}
            setActiveWorkoutDay={setActiveWorkoutDay}
            workoutLogs={workoutLogs}
            setWorkoutLogs={setWorkoutLogs}
            weightHistory={weightHistory}
            setWeightHistory={setWeightHistory}
            onSubstituteFood={handleSubstituteFood}
            onReset={handleReset}
          />
          <InstallPrompt />
        </>
      )}
    </>
  );
}
