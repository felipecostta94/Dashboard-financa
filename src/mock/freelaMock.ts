export interface Project {
  id: string;
  title: string;
  client: string;
  value: number;
  currency: 'BRL' | 'USD' | 'EUR';
  status: 'planning' | 'in_progress' | 'review' | 'paid';
  dueDate: string;
  category: 'Landing Page' | 'E-commerce' | 'Web App' | 'Design System';
}

export interface FinancialSummary {
  balance: number;
  incomingPending: number;
  monthlyGoal: number;
  taxReserve: number; // Simulação de impostos de ME/DAS
}

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce de Moda Streetwear',
    client: 'UrbanVibe Store',
    value: 4500,
    currency: 'BRL',
    status: 'in_progress',
    dueDate: '2026-06-15',
    category: 'E-commerce',
  },
  {
    id: '2',
    title: 'Redesign Landing Page Corporativa',
    client: 'TechSolutions Inc',
    value: 1200,
    currency: 'USD', // Freela internacional
    status: 'review',
    dueDate: '2026-05-30',
    category: 'Landing Page',
  },
  {
    id: '3',
    title: 'Dashboard de Logística',
    client: 'RotaExpress',
    value: 8000,
    currency: 'BRL',
    status: 'paid',
    dueDate: '2026-05-10',
    category: 'Web App',
  },
  {
    id: '4',
    title: 'Componentização UI Kit',
    client: 'DevHouse',
    value: 2500,
    currency: 'BRL',
    status: 'planning',
    dueDate: '2026-07-01',
    category: 'Design System',
  },
];

export const mockFinancials: FinancialSummary = {
  balance: 12450.00,
  incomingPending: 6480.00, // Soma dos projetos em progresso/review (convertendo USD se necessário)
  monthlyGoal: 15000.00,
  taxReserve: 747.00, // Guardado automaticamente para taxas/DAS do mês
};