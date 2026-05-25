import { LayoutDashboard, Briefcase, Settings, Code } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

// 1. Definindo as Props que a Sidebar vai receber do App.tsx
interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const { t } = useLanguage();

  // Mapeamento dos itens do menu
  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard },
    { id: 'projects', label: t.projects, icon: Briefcase },
  ];

  return (
    <div className="h-full flex flex-col justify-between p-6">
      
      {/* Topo: Logo */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20 text-emerald-400">
            <Code className="h-5 w-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-tight block">DevFreelance</span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block -mt-0.5">Front-End ME</span>
          </div>
        </div>

        {/* Links de Navegação */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isCurrentActive = activeTab === item.id; // Verifica se este botão é a página atual

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)} // Altera a página ao clicar
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isCurrentActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/10 font-semibold'
                    : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 border border-transparent'
                }`}
              >
                <Icon className={`h-5 w-5 transition-transform duration-200 group-hover:scale-105 ${
                  isCurrentActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'
                }`} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Rodapé: Configurações */}
      <div className="pt-4 border-t border-slate-900/60">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-slate-900/60 hover:text-slate-200 transition-all duration-200 border border-transparent">
          <Settings className="h-5 w-5" />
          <span>{t.settings}</span>
        </button>
      </div>

    </div>
  );
}