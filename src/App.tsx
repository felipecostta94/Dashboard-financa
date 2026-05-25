import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import MobileNav from './components/layout/MobileNav';
import MetricCard from './components/dashboard/MetricCard';
import TaxSimulator from './components/dashboard/TaxSimulator';
import RevenueChart from './components/dashboard/RevenueChart';
import CategoryChart from './components/dashboard/CategoryChart';
import ProjectsTable from './components/projects/ProjectsTable';
import { useLanguage } from './hooks/useLanguage';
import { Wallet, DollarSign, Target, Percent } from 'lucide-react';
import { projectsMock } from './mock/projectsMock';

export default function App() {
  const { t, language } = useLanguage();
  
  // 🧭 ESTADO GLOBAL DE NAVEGAÇÃO INTERNA (Alterna entre as telas)
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // 🧮 CÁLCULOS DINÂMICOS (Processamento de Regras de Negócio via Mocks)
  const totalPaid = projectsMock
    .filter(project => project.status === 'paid')
    .reduce((sum, project) => sum + project.value, 0);

  const totalPending = projectsMock
    .filter(project => project.status === 'pending')
    .reduce((sum, project) => sum + project.value, 0);

  const monthlyGoalValue = 15000;
  const goalPercentage = Math.min(Math.round((totalPaid / monthlyGoalValue) * 100), 100);
  const taxReserveValue = totalPaid * 0.06;

  // Função utilitária para formatação monetária padrão BRL
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  return (
    // Container Raiz: Garante que a aplicação ocupe toda a viewport e previne estendimentos no eixo X
    <div className="flex min-h-screen w-full bg-slate-900 text-slate-100 antialiased overflow-x-hidden">
      
      {/* 🖥️ SIDEBAR DESKTOP: Fixada rigidamente à esquerda da tela (h-screen) */}
      <div className="hidden md:block w-64 shrink-0 border-r border-slate-800 bg-slate-950 fixed top-0 left-0 h-screen z-50">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* 🚀 PAINEL DA DIREITA: Responsável pelo fluxo do conteúdo principal */}
      {/* O padding esquerdo "md:pl-64" compensa a largura exata da Sidebar fixa */}
      <div className="flex-1 flex flex-col min-w-0 max-w-full overflow-x-hidden bg-slate-900 md:pl-64">
        
        {/* Barra de Topo Geral (Exibe cotação da API e chaves de idiomas) */}
        <Navbar />

        {/* Embrulho de Conteúdo Principal */}
        <main className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 min-w-0">
          
          {/* 🔄 RENDERIZAÇÃO CONDICIONAL DA TELA ATIVA */}
          {activeTab === 'dashboard' ? (
            
            /* ==================== CASO 1: TELA DO PAINEL GERAL ==================== */
            <div className="space-y-8 animate-fadeIn">
              
              {/* Títulos de Contexto */}
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
                  {t.dashboard}
                </h1>
                <p className="text-slate-400 text-sm md:text-base">
                  {language === 'pt' 
                    ? 'Acompanhe seu faturamento, metas de caixas e impostos de sua ME.' 
                    : 'Track your revenue, savings goals, and local corporate taxes.'}
                </p>
              </div>

              {/* GRID DE METRICAS: Quebra em 2x2 abaixo de 1280px (xl) para manter o fôlego do design */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                <MetricCard 
                  title={t.balance} value={formatBRL(totalPaid)} icon={Wallet}
                  description={language === 'pt' ? "Total recebido na conta PJ" : "Total received in corporate account"} variant="emerald"
                />
                <MetricCard 
                  title={t.pending} value={formatBRL(totalPending)} icon={DollarSign}
                  description={language === 'pt' ? "Notas emitidas aguardando pagamento" : "Invoiced awaiting payment"}
                />
                <MetricCard 
                  title={t.monthlyGoal} value={formatBRL(monthlyGoalValue)} icon={Target}
                  description={language === 'pt' ? `${goalPercentage}% da meta atingida` : `${goalPercentage}% of goal achieved`}
                />
                <MetricCard 
                  title={t.taxReserve} value={formatBRL(taxReserveValue)} icon={Percent}
                  description={language === 'pt' ? "Acumulado DAS-ME deste mês (6%)" : "Accumulated local ME tax (6%)"}
                />
              </div>

              {/* Simulador Interativo de Imposto de Renda vs Nota ME */}
              <TaxSimulator />

              {/* GRID DE GRÁFICOS: Distribuição flexível e responsiva */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Gráfico de Evolução Salarial (Linhas) - Ocupa 2 frações de espaço no desktop */}
                <div className="lg:col-span-2">
                  <RevenueChart />
                </div>
                {/* Gráfico de Divisão por Categorias (Pizza) - Ocupa 1 fração de espaço */}
                <div className="lg:col-span-1">
                  <CategoryChart />
                </div>
              </div>
            </div>
          ) : (
            
            /* ==================== CASO 2: TELA DE LISTAGEM DE PROJETOS ==================== */
            <div className="animate-fadeIn">
              <ProjectsTable />
            </div>
          )}

        </main>
      </div>

      {/* 📱 SISTEMA MOBILE CUSTOMIZADO: Botão Flutuante + Modal Fullscreen (100vh) */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

    </div>
  );
}