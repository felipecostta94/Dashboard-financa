import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { categoryDataMock } from '../../mock/chartMock';
import { useLanguage } from '../../hooks/useLanguage';
import { PieChart as PieIcon } from 'lucide-react';

export default function CategoryChart() {
  const { language } = useLanguage();

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-md shadow-black/30 flex flex-col h-[350px]">
      
      {/* Cabeçalho */}
      <div className="flex items-center gap-2.5 mb-2">
        <PieIcon className="h-4 w-4 text-emerald-400" />
        <h3 className="font-bold text-white text-base tracking-tight">
          {language === 'pt' ? 'Fontes de Receita' : 'Income Sources'}
        </h3>
      </div>

      {/* Gráfico */}
      <div className="flex-1 w-full text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryDataMock}
              cx="50%"
              cy="45%"
              innerRadius={60} // Faz o efeito de "rosca" (furo no meio)
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {categoryDataMock.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            
            <Tooltip
              contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '12px' }}
              itemStyle={{ color: '#f8fafc' }}
              formatter={(value: any) => [`${value}%`, language === 'pt' ? 'Proporção' : 'Share']}
            />
            
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => <span className="text-slate-400 font-medium px-1">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}