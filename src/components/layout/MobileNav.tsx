import { useState } from 'react';
import { LayoutDashboard, Briefcase, Menu, X, Code } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function MobileNav({ activeTab, setActiveTab }: MobileNavProps) {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard, desc: language === 'pt' ? 'Resumo financeiro e gráficos' : 'Financial summary & charts' },
    { id: 'projects', label: t.projects, icon: Briefcase, desc: language === 'pt' ? 'Gerenciar contratos e prazos' : 'Manage contracts & deadlines' },
  ];

  const handleNavigation = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      
      {/* 🔘 BOTÃO FLUTUANTE PREMIUM COM FIXAÇÃO RÍGIDA */}
      {/* Trocamos classes relativas por propriedades físicas de estilo (Style) injetadas direto no hardware (GPU) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed h-14 w-14 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 border border-emerald-400 active:scale-90 transition-transform duration-100"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 9999,
          transform: 'translateZ(0)',
          WebkitTransform: 'translateZ(0)',
          willChange: 'transform'
        }}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* 📱 MODAL EM TELA CHEIA (100svh) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/95 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn"
          style={{
            position: 'fixed',
            height: '100svh', // Força a altura a travar no espaço real visível, impedindo quebras de scroll
            width: '100vw',
            zIndex: 9990
          }}
        >
          
          {/* Topo do Modal */}
          <div className="pt-4 flex items-center gap-3 border-b border-slate-900 pb-6">
            <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
              <Code className="h-5 w-5" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight block">DevFreelance</span>
              <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">Menu de Navegação</span>
            </div>
          </div>

          {/* Centro: Opções */}
          <div className="flex-1 flex flex-col justify-center gap-4 my-8">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-2">
              {language === 'pt' ? 'Ir para a página' : 'Navigate to'}
            </span>
            
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isCurrentActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all active:scale-[0.98] ${
                    isCurrentActive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-300'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${isCurrentActive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-950 text-slate-500'}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-base font-bold block text-white">{item.label}</span>
                    <span className="text-xs text-slate-400 mt-0.5 block">{item.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Rodapé do Modal */}
          <div className="text-center text-xs text-slate-600 font-medium pb-4">
            DevFreelance Dashboard v1.0.0
          </div>

        </div>
      )}

    </div>
  );
}