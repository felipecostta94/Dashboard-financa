export interface Project {
  id: string;
  name: string;
  client: string;
  value: number;
  status: 'paid' | 'pending';
  category: 'Web Apps (React)' | 'Landing Pages' | 'UI/UX (Figma)' | 'Manutenção/Consultoria';
  dueDate: string;
}

export const projectsMock: Project[] = [
  {
    id: '1',
    name: 'E-commerce Plataforma de Moda',
    client: 'Nexus Boutique',
    value: 8500,
    status: 'paid',
    category: 'Web Apps (React)',
    dueDate: '2026-05-10',
  },
  {
    id: '2',
    name: 'Landing Page de Alta Conversão',
    client: 'TechStart SaaS',
    value: 3200,
    status: 'paid',
    category: 'Landing Pages',
    dueDate: '2026-05-15',
  },
  {
    id: '3',
    name: 'Redesign do App Mobile',
    client: 'FitLife Studio',
    value: 2800,
    status: 'paid',
    category: 'UI/UX (Figma)',
    dueDate: '2026-05-20',
  },
  {
    id: '4',
    name: 'Dashboard Administrativo Interno',
    client: 'LogiX Logistics',
    value: 4500,
    status: 'pending',
    category: 'Web Apps (React)',
    dueDate: '2026-06-05',
  },
  {
    id: '5',
    name: 'Consultoria e Otimização SEO/Performance',
    client: 'Belo Horizonte Imóveis',
    value: 1700,
    status: 'pending',
    category: 'Manutenção/Consultoria',
    dueDate: '2026-06-12',
  },
];