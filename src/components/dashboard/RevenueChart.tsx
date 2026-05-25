import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { monthlyRevenueMock } from '../../mock/chartMock';
import { useLanguage } from '../../hooks/useLanguage';
import { TrendingUp } from 'lucide-react';

export default function RevenueChart() {
  const { language } = useLanguage();

  // Formatador simples para o dinheiro sumir com o visual poluído no eixo Y
  const formatYAxis = (tickItem: number) => {
    return `R$ ${tickItem / 1000}k`;
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-md shadow-black/30 flex flex-col h-[350px]">
      
      {/* Cabeçalho do Gráfico */}
      <div className="flex items-center gap-2.5 mb-6">
        <TrendingUp className="h-4 w-4 text-emerald-400" />
        <h3 className="font-bold text-white text-base tracking-tight">
          {language === 'pt' ? 'Evolução de Faturamento' : 'Revenue Growth'}
        </h3>
      </div>

      {/* Container que força o gráfico a ser responsivo */}
      <div className="flex-1 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyRevenueMock} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              {/* Definição do Gradiente do Verde */}
              <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            
            {/* Linhas de guia horizontais bem discretas */}
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            
            <XAxis dataKey="month" stroke="#64748b" tickLine={false} axisLine={false} dy={10} />
            <YAxis stroke="#64748b" tickLine={false} axisLine={false} tickFormatter={formatYAxis} />
            
            {/* Customização do Balão que aparece ao passar o mouse */}
            <Tooltip 
                contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
                labelStyle={{ color: '#94a3b8', fontWeight: 'bold' }}
                itemStyle={{ color: '#10b981' }}
                formatter={(value: any) => [
                    `R$ ${Number(value).toLocaleString('pt-BR')}`, 
                    language === 'pt' ? 'Faturamento' : 'Revenue'
                ]}
/>
            
            {/* A linha/área propriamente dita */}
            <Area 
              type="monotone" 
              dataKey="receita" 
              stroke="#10b981" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorReceita)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}