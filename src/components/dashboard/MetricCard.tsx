
interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  variant?: 'default' | 'emerald';
}

export default function MetricCard({ 
  title, 
  value, 
  icon: Icon, 
  description, 
  variant = 'default' 
}: MetricCardProps) {
  return (
    // ... todo o resto do seu código do card continua exatamente igual!
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-md shadow-black/30 flex flex-col justify-between min-h-[160px] h-full transition-all duration-200 hover:border-slate-700">
      
      {/* Efeito visual sutil de brilho de fundo no hover */}
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
        variant === 'emerald' ? 'bg-emerald-500' : 'bg-slate-400'
      }`} />

      {/* Topo do Card: Título e Ícone */}
      <div className="flex items-center justify-between z-10">
        <span className="text-xs text-slate-400 font-semibold tracking-wide uppercase">
          {title}
        </span>
        <div className={`p-2 rounded-xl border transition-colors duration-300 ${
          variant === 'emerald' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-slate-900 border-slate-800 text-slate-400 group-hover:text-slate-200 group-hover:border-slate-700'
        }`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>

      {/* Base do Card: Valor Principal e Descrição */}
      <div className="mt-4 z-10">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {value}
        </h3>
        {description && (
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {description}
          </p>
        )}
      </div>

    </div>
  );
}