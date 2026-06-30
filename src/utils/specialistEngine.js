import { exercisesDb } from './mockData';

// Equações de Harris-Benedict para TMB e GETD
export function calculateMacrosAndCalories(profile) {
  const weight = parseFloat(profile.weight);
  const height = parseFloat(profile.height);
  const age = parseInt(profile.age);
  const gender = profile.gender; // 'male' | 'female'
  const activity = profile.activity; // 'sedentary' | 'lightly' | 'moderately' | 'very' | 'extra'
  const goal = profile.goal; // 'hypertrophy' | 'emagrecimento' | 'recomposicao' | 'condicionamento'

  // 1. Calcular TMB (Taxa Metabólica Basal)
  let bmr = 0;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }

  // 2. Multiplicador de Atividade (GETD)
  const activityMultipliers = {
    sedentary: 1.2,
    lightly: 1.375,
    moderately: 1.55,
    very: 1.725,
    extra: 1.9
  };
  const multiplier = activityMultipliers[activity] || 1.2;
  const tdee = bmr * multiplier;

  // 3. Ajuste de Calorias pelo Objetivo
  let targetCalories = tdee;
  let proteinPerKg = 2.0; // g/kg
  let fatPerKg = 1.0; // g/kg

  switch (goal) {
    case 'hypertrophy':
      targetCalories = tdee + 350; // Superávit limpo
      proteinPerKg = 2.0;
      fatPerKg = 1.0;
      break;
    case 'emagrecimento':
      targetCalories = tdee - 500; // Déficit seguro
      proteinPerKg = 2.2; // Alta proteína para manter massa magra
      fatPerKg = 0.8;
      break;
    case 'recomposicao':
      targetCalories = tdee; // Manutenção com ganho muscular leve e perda de gordura
      proteinPerKg = 2.1;
      fatPerKg = 0.9;
      break;
    case 'condicionamento':
      targetCalories = tdee;
      proteinPerKg = 1.8;
      fatPerKg = 1.0;
      break;
  }

  // Garantir limites mínimos seguros de calorias
  const minCalories = gender === 'male' ? 1500 : 1200;
  if (targetCalories < minCalories) {
    targetCalories = minCalories;
  }

  // 4. Calcular Macros em gramas
  const proteinGrams = Math.round(weight * proteinPerKg);
  const fatGrams = Math.round(weight * fatPerKg);
  
  // Carboidratos completam as calorias restantes (1g prot = 4kcal, 1g fat = 9kcal, 1g carb = 4kcal)
  const proteinKcal = proteinGrams * 4;
  const fatKcal = fatGrams * 9;
  const remainingKcal = targetCalories - (proteinKcal + fatKcal);
  const carbGrams = Math.max(20, Math.round(remainingKcal / 4)); // Garantir mínimo de carboidratos

  // Recalcular calorias totais reais baseadas nos macros arredondados
  const totalCal = (proteinGrams * 4) + (fatGrams * 9) + (carbGrams * 4);

  return {
    bmr: Math.round(bmr),
    tdee: Math.round(tdee),
    calories: Math.round(totalCal),
    protein: proteinGrams,
    carbs: carbGrams,
    fat: fatGrams
  };
}

// Geração de dieta personalizada baseada em calorias, macros e restrições
export function generateDietPlan(profile, macros) {
  const { calories, protein, carbs, fat } = macros;
  const dietType = profile.dietType; // 'general' | 'vegan' | 'vegetarian' | 'lactose_free' | 'gluten_free' | 'low_carb'

  // Distribuição calórica aproximada por refeição:
  // Café da Manhã: 20%, Lanche 1: 10%, Almoço: 30%, Lanche 2: 15%, Jantar: 20%, Ceia: 5%
  
  // Alimentos padrão com base nas preferências
  let sources = {
    prot: {
      standard: 'Peito de Frango Grelhado',
      vegan: 'Tofu Grelhado',
      vegetarian: 'Ovo Cozido ou Omelete',
      lactose: 'Peito de Frango Grelhado',
      gluten: 'Peito de Frango Grelhado',
      lowcarb: 'Peito de Frango Grelhado'
    },
    carb: {
      standard: 'Arroz Integral Cozido',
      vegan: 'Batata Doce Cozida',
      vegetarian: 'Arroz Integral Cozido',
      lactose: 'Arroz Integral Cozido',
      gluten: 'Mandioca Cozida',
      lowcarb: 'Vegetais Assados (Abobrinha/Brócolis)'
    },
    fat: {
      standard: 'Azeite de Oliva Extra Virgem',
      vegan: 'Castanhas de Caju',
      vegetarian: 'Pasta de Amendoim',
      lactose: 'Abacate',
      gluten: 'Azeite de Oliva Extra Virgem',
      lowcarb: 'Azeite de Oliva Extra Virgem'
    }
  };

  const getSource = (category, type) => {
    return sources[category][type] || sources[category]['standard'];
  };

  const pFood = getSource('prot', dietType);
  const cFood = getSource('carb', dietType);
  const fFood = getSource('fat', dietType);

  // Escalar gramas de alimentos
  // Valores típicos: 100g Frango = 30g Prot; 100g Arroz = 25g Carb; 10g Azeite = 9g Gord.
  const scaledProteinQty = Math.round((protein * 100) / 30);
  const scaledCarbQty = Math.round((carbs * 100) / 25);
  const scaledFatQty = Math.round((fat * 10) / 9);

  const meals = [
    {
      id: 'meal_1',
      name: 'Café da Manhã',
      time: '07:30',
      calories: Math.round(calories * 0.20),
      items: [
        dietType === 'vegan' 
          ? { name: 'Iogurte de Coco/Soja com Frutas e Aveia', qty: '200g', info: 'Rico em fibras e probióticos vegetais' }
          : dietType === 'lactose_free'
          ? { name: 'Omelete de Claras com Espinafre', qty: '3 Ovos', info: 'Excelente fonte proteica livre de lactose' }
          : { name: 'Ovos Mexidos com Pão Integral', qty: '2 Ovos + 2 Fatias', info: 'Proteína e carboidrato de baixo índice glicêmico' },
        { name: 'Fruta Picada (Mamão/Melão)', qty: '150g', info: 'Vitaminas e enzimas digestivas' },
        { name: 'Café Preto ou Chá sem açúcar', qty: '200ml', info: 'Termogênico natural' }
      ]
    },
    {
      id: 'meal_2',
      name: 'Lanche da Manhã',
      time: '10:00',
      calories: Math.round(calories * 0.10),
      items: [
        dietType === 'vegan'
          ? { name: 'Castanha de Caju ou Amêndoas', qty: `${Math.round(scaledFatQty * 0.3)}g`, info: 'Gorduras saudáveis e minerais' }
          : dietType === 'vegetarian'
          ? { name: 'Iogurte Grego com Granola', qty: '150g', info: 'Proteína e cálcio' }
          : dietType === 'lactose_free'
          ? { name: 'Mix de Castanhas + Whey Isolado (Lactose Free)', qty: '15g Castanhas + 20g Whey', info: 'Nutrientes de rápida absorção' }
          : { name: 'Pasta de Amendoim Integral', qty: `${Math.round(scaledFatQty * 0.4)}g`, info: 'Fonte de energia saudável e saciedade' },
        { name: 'Maçã ou Pêra', qty: '1 unidade', info: 'Fibras solúveis (pectina)' }
      ]
    },
    {
      id: 'meal_3',
      name: 'Almoço',
      time: '12:30',
      calories: Math.round(calories * 0.30),
      items: [
        { name: pFood, qty: `${Math.round(scaledProteinQty * 0.4)}g`, info: 'Fonte proteica principal para reconstrução muscular' },
        { name: cFood, qty: `${Math.round(scaledCarbQty * 0.4)}g`, info: 'Energia complexa de liberação gradual' },
        { name: 'Salada de Folhas Verdes (Alface, Rúcula, Agrião)', qty: 'À vontade', info: 'Rica em micronutrientes e volume com poucas calorias' },
        { name: 'Brócolis ou Vagem cozida no vapor', qty: '80g', info: 'Fibras e compostos bioativos' },
        { name: fFood, qty: `${Math.round(scaledFatQty * 0.3)}ml/g`, info: 'Gorduras monoinsaturadas essenciais' }
      ]
    },
    {
      id: 'meal_4',
      name: 'Lanche da Tarde (Pré-Treino)',
      time: '16:00',
      calories: Math.round(calories * 0.15),
      items: [
        dietType === 'vegan'
          ? { name: 'Banana amassada com Aveia e Sementes de Chia', qty: '1 Banana + 30g Aveia', info: 'Carboidratos de liberação sustentada para o treino' }
          : { name: 'Sanduíche de Frango Desfiado ou Atum', qty: '2 fatias Pão Integral + 60g Recheio', info: 'Combo ideal de carboidrato + proteína' },
        { name: 'Café Expresso ou Pré-Treino', qty: '1 xícara', info: 'Aumento de foco e rendimento físico' }
      ]
    },
    {
      id: 'meal_5',
      name: 'Jantar',
      time: '19:30',
      calories: Math.round(calories * 0.20),
      items: [
        { name: pFood, qty: `${Math.round(scaledProteinQty * 0.4)}g`, info: 'Recuperação muscular pós-esforço físico' },
        { name: dietType === 'low_carb' ? 'Purê de Abóbora ou Couve-Flor' : cFood, qty: `${Math.round(scaledCarbQty * 0.3)}g`, info: 'Reposição de glicogênio sem excessos' },
        { name: 'Salada Colorida (Tomate, Cenoura Ralada, Pepino)', qty: '1 prato', info: 'Variedade de antioxidantes' },
        { name: fFood, qty: `${Math.round(scaledFatQty * 0.3)}ml/g`, info: 'Apoio na produção hormonal' }
      ]
    },
    {
      id: 'meal_6',
      name: 'Ceia',
      time: '22:00',
      calories: Math.round(calories * 0.05),
      items: [
        dietType === 'vegan'
          ? { name: 'Leite de Amêndoas morno com Canela', qty: '200ml', info: 'Relaxamento muscular e indução ao sono' }
          : dietType === 'lactose_free'
          ? { name: 'Whey Protein Isolado com Água + Castanhas', qty: '20g Whey + 10g Castanhas', info: 'Proteína de absorção controlada' }
          : { name: 'Abacate com Gotas de Limão', qty: '100g', info: 'Gorduras excelentes e baixo carbo, ideal para a noite' },
        dietType !== 'vegan' && dietType !== 'lactose_free'
          ? { name: 'Queijo Cottage ou Ricota Creme', qty: '60g', info: 'Caseína natural para liberação lenta durante a noite' }
          : { name: 'Sementes de Abóbora descascadas', qty: '15g', info: 'Rica em magnésio e zinco para sono reparador' }
      ]
    }
  ];

  return meals;
}

// Geração de rotina de treino personalizada com base nas preferências e frequência do usuário
export function generateWorkoutPlan(profile) {
  const freq = parseInt(profile.workoutFrequency) || 4;
  const location = profile.workoutLocation; // 'gym' | 'home' | 'hybrid'
  const focus = profile.focusArea || 'geral'; // 'geral' | 'upper' | 'lower' | 'core' | 'cardio'
  
  let workouts = [];

  // Banco local simplificado para treinos em casa (calistenia/funcional)
  const homeExercises = {
    peito: [
      { name: 'Flexão de Braços Clássica', focus: 'Peitoral Geral', instructions: 'Mantenha o abdômen contraído e alinhe a coluna.' },
      { name: 'Flexão Declinada (pés na cadeira)', focus: 'Peitoral Superior', instructions: 'Coloque os pés num sofá ou cadeira e flexione os braços.' },
      { name: 'Flexão Aberta', focus: 'Foco em Alongamento Peito', instructions: 'Afaste as mãos além da largura dos ombros.' }
    ],
    costas: [
      { name: 'Remada Invertida na Mesa', focus: 'Dorsais', instructions: 'Deite-se debaixo de uma mesa resistente, segure a borda e puxe o peito.' },
      { name: 'Super-Homem (Superman)', focus: 'Lombar e Costas Superior', instructions: 'Deite de bruços, eleve os braços e pernas simultaneamente e segure por 2s.' },
      { name: 'Puxada com Toalha no Solo', focus: 'Costas Superior', instructions: 'Deitado de bruços, segure uma toalha esticada e puxe-a contra o peito.' }
    ],
    pernas: [
      { name: 'Agachamento Livre (Peso Corporal)', focus: 'Quadríceps e Glúteos', instructions: 'Desça até passar de 90° mantendo os calcanhares no chão.' },
      { name: 'Afundo Unilateral', focus: 'Quadríceps e Glúteos', instructions: 'Faça o movimento de passada parado, completando todas as repetições de um lado antes do outro.' },
      { name: 'Elevação Pélvica deitado', focus: 'Glúteos e Posterior', instructions: 'Deitado de costas, eleve o quadril ao máximo contraindo os glúteos.' },
      { name: 'Agachamento Sumô', focus: 'Interno de Coxa e Glúteos', instructions: 'Abra bem as pernas, aponte os pés para fora e agache descendo bem.' }
    ],
    ombros: [
      { name: 'Flexão Pique (Pike Pushups)', focus: 'Ombros Deltoides', instructions: 'Eleve o quadril formando um "V" invertido e flexione os braços levando a cabeça ao solo.' },
      { name: 'Elevação Lateral com Garrafas de Água', focus: 'Deltoide Lateral', instructions: 'Use duas garrafas cheias para simular halteres e eleve lateralmente.' },
      { name: 'Desenvolvimento com Garrafas de Água', focus: 'Deltoide Anterior', instructions: 'Empurre as garrafas para cima simulando desenvolvimento de ombro.' }
    ],
    bracos: [
      { name: 'Tríceps no Banco (Mergulho)', focus: 'Tríceps', instructions: 'Apoie as mãos em um banco ou cadeira, pernas esticadas e desça flexionando os cotovelos.' },
      { name: 'Rosca Direta com Mochila de Carga', focus: 'Bíceps', instructions: 'Encha uma mochila com livros ou garrafas e faça o movimento de rosca flexionando o cotovelo.' },
      { name: 'Flexão com Pegada Fechada (Diamante)', focus: 'Tríceps e Peito Interno', instructions: 'Junte as mãos formando um losango com os dedos antes de flexionar os braços.' }
    ],
    core: [
      { name: 'Abdominal Supra no Solo', focus: 'Reto Abdominal', instructions: 'Flexione o tronco subindo os ombros com contração do abdômen.' },
      { name: 'Prancha Frontal Isométrica', focus: 'Estabilidade Core', instructions: 'Mantenha o corpo reto sobre os antebraços e pontas dos pés.' },
      { name: 'Abdominal Bicicleta', focus: 'Oblíquos e Core', instructions: 'Rotacione o tronco alternando cotovelo direito no joelho esquerdo e vice-versa.' }
    ]
  };

  const getExercises = (group) => {
    if (location === 'home') {
      return homeExercises[group] || homeExercises['core'];
    }
    return exercisesDb[group] || exercisesDb['core'];
  };

  // Montar rotinas com base na frequência
  if (freq === 3) {
    // 3 Dias: Treino A (Push/Peito/Ombro/Tríceps), Treino B (Pull/Costas/Bíceps), Treino C (Pernas/Core)
    workouts = [
      {
        day: 'Treino A',
        focus: 'Empurrar (Peito, Ombros e Tríceps)',
        exercises: [
          { ...getExercises('peito')[0], sets: 4, reps: '8-12', rest: 60 },
          { ...getExercises('peito')[1], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('ombros')[0], sets: 3, reps: '10-12', rest: 60 },
          { ...getExercises('ombros')[1], sets: 4, reps: '12-15', rest: 45 },
          { ...getExercises('bracos')[2], sets: 4, reps: '10-12', rest: 45 }
        ]
      },
      {
        day: 'Treino B',
        focus: 'Puxar (Costas, Bíceps e Trapézio)',
        exercises: [
          { ...getExercises('costas')[0], sets: 4, reps: '8-12', rest: 60 },
          { ...getExercises('costas')[1], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('ombros')[3], sets: 3, reps: '12-15', rest: 45 },
          { ...getExercises('bracos')[0], sets: 4, reps: '10-12', rest: 45 },
          { ...getExercises('bracos')[1], sets: 3, reps: '12-15', rest: 45 }
        ]
      },
      {
        day: 'Treino C',
        focus: 'Membros Inferiores e Core',
        exercises: [
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[0], sets: 4, reps: '10-12', rest: 90 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[1], sets: 3, reps: '12-15', rest: 60 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_posteriores')[1], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('core')[0], sets: 4, reps: '15-20', rest: 45 },
          { ...getExercises('core')[2], sets: 3, reps: 'Plank 45s', rest: 45 }
        ]
      }
    ];
  } else if (freq === 4) {
    // 4 Dias: Superior A, Inferior A, Superior B, Inferior B
    workouts = [
      {
        day: 'Treino A',
        focus: 'Membros Superiores - Foco Peito e Ombros',
        exercises: [
          { ...getExercises('peito')[0], sets: 4, reps: '8-10', rest: 60 },
          { ...getExercises('peito')[1], sets: 3, reps: '10-12', rest: 60 },
          { ...getExercises('costas')[0], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('ombros')[0], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('bracos')[2], sets: 3, reps: '12-15', rest: 45 },
          { ...getExercises('core')[0], sets: 4, reps: '15-20', rest: 45 }
        ]
      },
      {
        day: 'Treino B',
        focus: 'Membros Inferiores - Foco Quadríceps',
        exercises: [
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[0], sets: 4, reps: '8-12', rest: 90 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[1], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_posteriores')[3], sets: 4, reps: '12-15', rest: 60 },
          { ...getExercises('core')[2], sets: 4, reps: 'Plank 50s', rest: 45 }
        ]
      },
      {
        day: 'Treino C',
        focus: 'Membros Superiores - Foco Costas e Bíceps',
        exercises: [
          { ...getExercises('costas')[1], sets: 4, reps: '8-12', rest: 60 },
          { ...getExercises('costas')[2], sets: 3, reps: '10-12', rest: 60 },
          { ...getExercises('peito')[2], sets: 3, reps: '12-15', rest: 60 },
          { ...getExercises('ombros')[1], sets: 4, reps: '12-15', rest: 45 },
          { ...getExercises('bracos')[0], sets: 4, reps: '10-12', rest: 45 },
          { ...getExercises('core')[1], sets: 4, reps: '12-15', rest: 45 }
        ]
      },
      {
        day: 'Treino D',
        focus: 'Membros Inferiores - Foco Posterior e Glúteos',
        exercises: [
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_posteriores')[0], sets: 4, reps: '8-12', rest: 90 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_posteriores')[2], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[2], sets: 3, reps: '12-15', rest: 45 },
          { ...getExercises('core')[3], sets: 3, reps: '15/lado', rest: 45 }
        ]
      }
    ];
  } else {
    // 5 ou 6 Dias: ABC completo (Push/Pull/Legs)
    workouts = [
      {
        day: 'Treino A',
        focus: 'Peito, Ombros e Tríceps',
        exercises: [
          { ...getExercises('peito')[0], sets: 4, reps: '8-12', rest: 60 },
          { ...getExercises('peito')[1], sets: 3, reps: '10-12', rest: 60 },
          { ...getExercises('peito')[2], sets: 3, reps: '12-15', rest: 45 },
          { ...getExercises('ombros')[0], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('ombros')[1], sets: 4, reps: '12-15', rest: 45 },
          { ...getExercises('bracos')[2], sets: 4, reps: '10-12', rest: 45 }
        ]
      },
      {
        day: 'Treino B',
        focus: 'Costas, Bíceps e Posterior de Ombro',
        exercises: [
          { ...getExercises('costas')[0], sets: 4, reps: '8-12', rest: 60 },
          { ...getExercises('costas')[1], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises('costas')[2], sets: 3, reps: '12-15', rest: 45 },
          { ...getExercises('ombros')[2], sets: 3, reps: '12-15', rest: 45 },
          { ...getExercises('bracos')[0], sets: 4, reps: '10-12', rest: 45 },
          { ...getExercises('bracos')[1], sets: 3, reps: '12-15', rest: 45 }
        ]
      },
      {
        day: 'Treino C',
        focus: 'Pernas Completas e Core',
        exercises: [
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[0], sets: 4, reps: '8-12', rest: 90 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_quadriceps')[1], sets: 3, reps: '10-12', rest: 60 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_posteriores')[1], sets: 4, reps: '10-12', rest: 60 },
          { ...getExercises(location === 'home' ? 'pernas' : 'pernas_posteriores')[3], sets: 3, reps: '12-15', rest: 60 },
          { ...getExercises('core')[0], sets: 4, reps: '15-20', rest: 45 },
          { ...getExercises('core')[2], sets: 3, reps: 'Plank 60s', rest: 45 }
        ]
      }
    ];
  }

  // Ajustes de foco específicos no treino
  if (focus === 'lower') {
    // Adiciona uma série extra aos treinos de pernas e ajusta ordem
    workouts = workouts.map(w => {
      if (w.day.includes('C') || w.focus.includes('Inferiores') || w.focus.includes('Pernas')) {
        return {
          ...w,
          focus: w.focus + ' (Foco Acentuado em Pernas/Glúteos)',
          exercises: w.exercises.map(ex => {
            if (ex.name.includes('Agachamento') || ex.name.includes('Pélvica') || ex.name.includes('Passada')) {
              return { ...ex, sets: ex.sets + 1 };
            }
            return ex;
          })
        };
      }
      return w;
    });
  } else if (focus === 'upper') {
    // Adiciona uma série extra aos exercícios de peito/costas nos treinos de superiores
    workouts = workouts.map(w => {
      if (w.day.includes('A') || w.day.includes('B') || w.focus.includes('Superiores') || w.focus.includes('Empurrar') || w.focus.includes('Puxar')) {
        return {
          ...w,
          focus: w.focus + ' (Foco Acentuado em Tronco/Braços)',
          exercises: w.exercises.map(ex => {
            if (ex.sets < 4) {
              return { ...ex, sets: ex.sets + 1 };
            }
            return ex;
          })
        };
      }
      return w;
    });
  }

  return workouts;
}
