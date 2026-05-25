import { useState } from 'react';
import { projectsMock } from '../../mock/projectsMock';
import { useLanguage } from '../../hooks/useLanguage';
import { Search, CheckCircle2, Clock } from 'lucide-react';

export default function ProjectsTable() {
  const { language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');

  // Formatador de Moeda
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  // 🔍 Filtros Combinados (Busca por texto + Status do Botão)
  const filteredProjects = projectsMock.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Topo da Tela */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">
          {language === 'pt' ? 'Gerenciador de Projetos' : 'Project Manager'}
        </h1>
        <p className="text-slate-400 text-sm md:text-base">
          {language === 'pt' 
            ? 'Monitore seus contratos, prazos de vencimento e status de notas fiscais.' 
            : 'Monitor your contracts, due dates, and invoice statuses.'}
        </p>
      </div>

      {/* Barra de Ações: Pesquisa e Filtros Rápidos */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-slate-950 border border-slate-800 p-4 rounded-xl">
        
        {/* Input de Busca */}
        <div className="relative flex-1 max-w-md flex items-center">
          <Search className="absolute left-3.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={language === 'pt' ? "Buscar por projeto ou cliente..." : "Search by project or client..."}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>

        {/* Botões de Filtro */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 ${
              statusFilter === 'all'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {language === 'pt' ? 'Todos' : 'All'}
          </button>
          <button
            onClick={() => setStatusFilter('paid')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
              statusFilter === 'paid'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
            {language === 'pt' ? 'Pagos' : 'Paid'}
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-4 py-2 text-xs font-semibold rounded-xl border transition-all shrink-0 flex items-center gap-1.5 ${
              statusFilter === 'pending'
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="h-3.5 w-3.5 text-amber-400" />
            {language === 'pt' ? 'Pendentes' : 'Pending'}
          </button>
        </div>
      </div>

      {/* TABELA DE PROJETOS PREMIUM */}
      <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md shadow-black/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/40 text-slate-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">{language === 'pt' ? 'Projeto / Cliente' : 'Project / Client'}</th>
                <th className="px-6 py-4">{language === 'pt' ? 'Categoria' : 'Category'}</th>
                <th className="px-6 py-4">{language === 'pt' ? 'Valor' : 'Value'}</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">{language === 'pt' ? 'Vencimento' : 'Due Date'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-sm text-slate-300">
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-900/30 transition-colors group">
                    {/* Nome e Cliente */}
                    <td className="px-6 py-4 whitespace-nowrap min-w-[200px] text-sm font-medium text-white">
                      {project.name}
                    </td>
                    
                    {/* Categoria Badge */}
                    <td className="px-6 py-4 whitespace-nowrap min-w-[150px] text-sm text-slate-400">
                      {project.category}
                    </td>
                    
                    {/* Valor do Contrato */}
                    <td className="px-6 py-4.5 font-semibold text-white">
                      {formatBRL(project.value)}
                    </td>
                    
                    {/* Status Badge */}
                    <td className="px-6 py-4.5">
                      {project.status === 'paid' ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="h-3 w-3" />
                          {language === 'pt' ? 'Recebido' : 'Paid'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                          <Clock className="h-3 w-3" />
                          {language === 'pt' ? 'Aguardando' : 'Pending'}
                        </span>
                      )}
                    </td>
                    
                    {/* Data de Vencimento */}
                    <td className="px-6 py-4.5 text-xs text-slate-500 font-medium">
                      {new Date(project.dueDate).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 font-medium">
                    {language === 'pt' ? 'Nenhum projeto encontrado.' : 'No projects found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}