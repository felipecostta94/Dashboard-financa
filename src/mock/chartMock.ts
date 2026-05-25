// Dados de faturamento mês a mês (Gráfico de Área)
export const monthlyRevenueMock = [
  { month: 'Jan', receita: 8200, impostos: 492 },
  { month: 'Fev', receita: 9500, impostos: 570 },
  { month: 'Mar', receita: 12000, impostos: 720 },
  { month: 'Abr', receita: 11000, impostos: 660 },
  { month: 'Mai', receita: 14500, impostos: 870 }, // Casando com o valor do card atual
  { month: 'Jun', receita: 16000, impostos: 960 },
];

// Dados de divisão de receita por categoria de projeto (Gráfico de Pizza/Rosca)
export const categoryDataMock = [
  { name: 'Web Apps (React)', value: 45, color: '#10b981' },    // Emerald 500
  { name: 'Landing Pages', value: 30, color: '#3b82f6' },       // Blue 500
  { name: 'UI/UX (Figma)', value: 15, color: '#8b5cf6' },       // Purple 500
  { name: 'Manutenção/Consultoria', value: 10, color: '#64748b' } // Slate 500
];