export const exercisesDb = {
  peito: [
    { name: 'Supino Reto com Barra', focus: 'Peitoral Maior', instructions: 'Mantenha os ombros retraídos, desça a barra até o peito e empurre controladamente.' },
    { name: 'Supino Inclinado com Halteres', focus: 'Peitoral Superior', instructions: 'Incline o banco a 30°, empurre os halteres para cima alinhando com a parte superior do peito.' },
    { name: 'Crucifixo Reto / Voador', focus: 'Isolamento Peito', instructions: 'Mantenha uma leve flexão nos cotovelos e sinta alongar a musculatura no movimento de descida.' },
    { name: 'Flexão de Braços', focus: 'Geral Peito (Peso Corporal)', instructions: 'Mantenha o corpo alinhado em prancha, flexione os cotovelos até 90° e retorne.' }
  ],
  costas: [
    { name: 'Puxada Aberta na Polia', focus: 'Dorsal (Largura)', instructions: 'Puxe a barra em direção à parte superior do peito, contraindo as escápulas.' },
    { name: 'Remada Curvada com Barra', focus: 'Dorsal (Espessura)', instructions: 'Incline o tronco para frente, mantenha a coluna reta e puxe a barra na direção do umbigo.' },
    { name: 'Remada Baixa Sentado', focus: 'Costas Geral', instructions: 'Puxe o triângulo em direção ao abdômen inferior, mantendo a postura ereta e os ombros baixos.' },
    { name: 'Barra Fixa (ou Graviton)', focus: 'Dorsal (Peso Corporal)', instructions: 'Suba até o queixo passar da barra, focando em usar a força das costas e não dos braços.' }
  ],
  pernas_quadriceps: [
    { name: 'Agachamento Livre com Barra', focus: 'Quadríceps e Glúteos', instructions: 'Mantenha os pés afastados na largura dos ombros, agache empurrando o quadril para trás e mantenha os joelhos alinhados com a ponta dos pés.' },
    { name: 'Leg Press 45°', focus: 'Quadríceps Geral', instructions: 'Apoie os pés na plataforma, flexione os joelhos até 90° com segurança e empurre sem travar a articulação no topo.' },
    { name: 'Cadeira Extensora', focus: 'Isolamento Quadríceps', instructions: 'Sente-se bem apoiado, estenda os joelhos completamente contraindo o quadríceps e retorne devagar.' },
    { name: 'Passada / Afundo com Halteres', focus: 'Quadríceps e Glúteos', instructions: 'Dê um passo à frente, flexione o joelho de trás em direção ao chão e retorne empurrando com o calcanhar da frente.' }
  ],
  pernas_posteriores: [
    { name: 'Levantamento Terra RDL (Stiff)', focus: 'Posteriores e Glúteos', instructions: 'Mantenha os joelhos semi-flexionados, empurre o quadril para trás descendo a barra rente às pernas, sentindo alongar a parte posterior.' },
    { name: 'Mesa Flexora', focus: 'Isolamento Posterior', instructions: 'Deite-se no aparelho, flexione os joelhos trazendo o rolo próximo ao glúteo e retorne de forma controlada.' },
    { name: 'Cadeira Flexora', focus: 'Isolamento Posterior', instructions: 'Sente-se com as costas apoiadas, empurre o rolo para baixo e para trás flexionando os joelhos.' },
    { name: 'Elevação Pélvica', focus: 'Glúteos Máximo', instructions: 'Apoie as costas em um banco elevado, coloque a carga na pelve e eleve o quadril contraindo os glúteos no topo.' }
  ],
  ombros: [
    { name: 'Desenvolvimento com Halteres', focus: 'Deltoide Anterior', instructions: 'Sentado com postura reta, empurre os halteres para cima acima da cabeça sem bater um no outro.' },
    { name: 'Elevação Lateral', focus: 'Deltoide Lateral', instructions: 'Mantenha o corpo levemente inclinado e eleve os braços lateralmente até a altura dos ombros.' },
    { name: 'Crucifixo Inverso / Posterior de Ombro', focus: 'Deltoide Posterior', instructions: 'Incline o tronco à frente ou use a polia, afaste os braços para trás focando na parte traseira do ombro.' },
    { name: 'Encolhimento com Halteres', focus: 'Trapézio', instructions: 'Segure os halteres nas laterais do corpo e eleve os ombros em direção às orelhas.' }
  ],
  bracos: [
    { name: 'Rosca Direta com Barra W', focus: 'Bíceps Geral', instructions: 'Mantenha os cotovelos fixos ao lado do corpo e flexione os braços trazendo a barra ao peito.' },
    { name: 'Rosca Martelo com Halteres', focus: 'Bíceps e Braquiorradial', instructions: 'Segure os halteres com pegada neutra (palmas voltadas para dentro) e flexione os cotovelos.' },
    { name: 'Tríceps Polia Alta (Corda)', focus: 'Tríceps Lateral e Medial', instructions: 'Mantenha os cotovelos travados ao lado do corpo, estenda totalmente os braços para baixo abrindo a corda no final.' },
    { name: 'Tríceps Testa', focus: 'Tríceps Cabeça Longa', instructions: 'Deitado no banco, flexione os cotovelos descendo a barra em direção à testa e empurre de volta.' }
  ],
  core: [
    { name: 'Abdominal Supra no Solo', focus: 'Reto Abdominal', instructions: 'Deitado de costas, flexione o tronco tirando os ombros do chão e contraindo o abdômen.' },
    { name: 'Abdominal Infra na Barra/Solo', focus: 'Abdominais Inferiores', instructions: 'Eleve as pernas retas ou flexionadas em direção ao quadril, controlando a descida.' },
    { name: 'Prancha Isométrica', focus: 'Core Estabilidade', instructions: 'Apoie os antebraços e pontas dos pés no chão, mantendo todo o corpo alinhado e o abdômen ativado.' },
    { name: 'Abdominal Russo (Russian Twist)', focus: 'Oblíquos', instructions: 'Sentado com os pés fora do solo, rotacione o tronco de um lado para o outro controladamente.' }
  ]
};

export const foodSubstitutions = {
  carboidratos: [
    { name: 'Arroz Integral Cozido', eq: '100g', carb: '25g', substitutes: ['100g de Batata Doce Cozida', '85g de Mandioca Cozida', '130g de Batata Inglesa Cozida', '35g de Aveia em Flocos', '2 fatias de Pão Integral'] },
    { name: 'Batata Doce Cozida', eq: '100g', carb: '20g', substitutes: ['80g de Arroz Integral', '70g de Mandioca Cozida', '100g de Batata Inglesa Cozida', '30g de Aveia em Flocos', '2 fatias de Pão Integral'] },
    { name: 'Aveia em Flocos', eq: '30g', carb: '17g', substitutes: ['70g de Arroz Integral', '80g de Batata Doce Cozida', '1 fatia de Pão Integral', '150g de Mamão Papaia'] },
    { name: 'Pão Integral', eq: '50g (2 fatias)', carb: '22g', substitutes: ['90g de Arroz Integral', '110g de Batata Doce Cozida', '35g de Aveia em Flocos', '2 Tapiocas pequenas (40g de goma)'] }
  ],
  proteinas: [
    { name: 'Peito de Frango Grelhado', eq: '100g', prot: '31g', substitutes: ['120g de Patinho Moído Grelhado', '130g de Filé de Tilápia Grelhado', '5 Ovos Cozidos inteiros', '150g de Tofu Grelhado', '35g de Whey Protein Concentrado'] },
    { name: 'Filé de Tilápia Grelhado', eq: '100g', prot: '26g', substitutes: ['85g de Peito de Frango Grelhado', '100g de Patinho Moído Grelhado', '4 Ovos Cozidos inteiros', '130g de Tofu Grelhado', '30g de Whey Protein Concentrado'] },
    { name: 'Ovo Cozido Inteiro', eq: '1 unidade (50g)', prot: '6g', substitutes: ['20g de Peito de Frango Grelhado', '25g de Carne Vermelha Grelhada', '30g de Queijo Cotage', '1 Clara de Ovo + 15g de Frango'] },
    { name: 'Whey Protein', eq: '30g (1 scoop)', prot: '24g', substitutes: ['80g de Peito de Frango Grelhado', '90g de Carne Vermelha Grelhada', '100g de Filé de Peixe Grelhado', '4 Ovos Cozidos', '150g de Iogurte Grego Desnatado + 3 claras'] }
  ],
  gorduras: [
    { name: 'Azeite de Oliva Extra Virgem', eq: '10ml (1 colher de sopa)', fat: '9g', substitutes: ['15g de Pasta de Amendoim integral', '30g de Abacate', '20g de Castanha de Caju', '15g de Amêndoas'] },
    { name: 'Pasta de Amendoim', eq: '15g (1 colher de sopa)', fat: '7.5g', substitutes: ['8ml de Azeite de Oliva', '25g de Abacate', '15g de Castanha de Caju', '15g de Amêndoas'] },
    { name: 'Castanha de Caju', eq: '20g', fat: '9g', substitutes: ['10ml de Azeite de Oliva', '15g de Pasta de Amendoim', '35g de Abacate', '20g de Sementes de Abóbora'] }
  ]
};

export const chatExpertResponses = [
  {
    keywords: ['fome', 'sentindo fome', 'com fome', 'apetite'],
    response: 'Sentir um pouco de fome é comum em dietas de emagrecimento (déficit calórico). Para amenizar isso, recomendo aumentar o consumo de alimentos ricos em fibras (como vegetais folhosos, chia, aveia e sementes) e beber mais água (pelo menos 35ml por kg de peso corporal). Alimentos volumosos e pouco calóricos ajudam muito na saciedade!'
  },
  {
    keywords: ['substituir', 'trocar', 'substituição', 'comida', 'alimento'],
    response: 'Você pode substituir os alimentos facilmente mantendo a equivalência de macronutrientes! Na aba "Dieta", você pode clicar em qualquer alimento para ver as opções equivalentes. Por exemplo, você pode trocar arroz integral por batata doce ou mandioca cozida nas proporções certas, ou peito de frango por tilápia ou patinho moído.'
  },
  {
    keywords: ['dor', 'machuquei', 'lesão', 'ombro', 'joelho', 'articulação'],
    response: 'Se você sentir dor articular ou desconforto agudo em algum exercício, interrompa o movimento imediatamente. A dor muscular pós-treino é normal, mas dor nas articulações (como joelhos ou ombros) não é. Você pode substituir agachamento livre por cadeira extensora (menos sobrecarga na coluna/lombar) ou supino com barra por halteres (trajetória mais livre para os ombros). Sempre priorize a execução correta!'
  },
  {
    keywords: ['suplemento', 'creatina', 'whey', 'termogenico', 'pre treino', 'bcaa'],
    response: 'Os suplementos são excelentes facilitadores! A creatina (3g a 5g diários) ajuda na força e ganho de massa. O Whey Protein é excelente para atingir sua meta diária de proteínas com praticidade. O pré-treino/cafeína ajuda na disposição. No entanto, lembre-se: a base de tudo é uma alimentação equilibrada e o treino consistente.'
  },
  {
    keywords: ['cardio', 'aerobico', 'corrida', 'esteira', 'caminhada'],
    response: 'O cardio é fundamental para a saúde cardiovascular e ajuda no gasto calórico diário. Se o seu foco é emagrecimento, faça de 30 a 45 minutos em intensidade moderada após o treino de força ou em horários separados. Se for hipertrofia, 15 a 20 minutos de cardio leve/moderado 3x na semana são suficientes para manter a saúde metabólica sem prejudicar a recuperação muscular.'
  },
  {
    keywords: ['falhar', 'frequencia', 'perdi o treino', 'recuperar'],
    response: 'Não se preocupe se perdeu um dia de treino! O fitness é um estilo de vida de longo prazo. Apenas retome de onde parou no dia seguinte. Evite treinar duas vezes no mesmo dia para compensar, pois isso pode levar ao overtraining. Mantenha a constância e foque no próximo passo.'
  },
  {
    keywords: ['doce', 'vontade de doce', 'furar', 'jacar', 'cheat meal'],
    response: 'A vontade de comer doces costuma diminuir à medida que seu corpo se adapta à dieta e consome fontes saudáveis de carboidratos. Uma ótima dica é consumir frutas mais doces (como banana com canela ou morangos) ou usar receitas com Whey Protein. Se quiser fazer uma refeição livre, planeje-a na semana (como um jantar no sábado) e volte à rotina logo em seguida!'
  },
  {
    keywords: ['olá', 'oi', 'tudo bem', 'bom dia', 'boa tarde', 'boa noite'],
    response: 'Olá! Sou o seu Especialista de Treino e Dieta da NutriFit AI. Como posso te ajudar hoje? Posso te dar dicas sobre receitas alternativas, tirar dúvidas sobre a execução de exercícios ou ajudar a ajustar sua mentalidade fitness!'
  }
];

export const defaultChatResponse = 'Excelente pergunta! Como seu especialista digital, recomendo manter a consistência na dieta e no treino atual. Certifique-se de estar anotando as cargas na aba de Treinos e batendo a meta diária de calorias e proteínas na aba de Dieta. Quer que eu te sugira alguma receita saudável com os alimentos da sua dieta?';
