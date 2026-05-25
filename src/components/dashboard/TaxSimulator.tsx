import { useState } from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Calculator, ArrowRight, ShieldCheck, Landmark } from 'lucide-react';

export default function TaxSimulator() {
  const { language } = useLanguage();
  const [bruto, setBruto] = useState<string>('5000');

  // Lógica de cálculo (Alíquota base de 6% para Desenvolvimento de Software no Simples Nacional)
  const valorBruto = parseFloat(bruto) || 0;
  const aliquota = 0.06;
  const impostoDas = valorBruto * aliquota;
  const lucroLiquido = valorBruto - impostoDas;

  // Formatador de moeda brasileiro
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-8 mt-8 shadow-md shadow-black/30">
      
      {/* Cabeçalho do Bloco */}
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-400">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {language === 'pt' ? 'Simulador de Impostos ME' : 'Corporate Tax Simulator'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {language === 'pt' 
              ? 'Projete seus ganhos líquidos aplicando a alíquota do Anexo III.' 
              : 'Project your net earnings applying the standard 6% tax rate.'}
          </p>
        </div>
      </div>

      {/* Grid Responsivo: Inputs na esquerda, Resultado na direita */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* COLUNA DE ENTRADA (7 colunas em telas grandes) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {language === 'pt' ? 'Valor Bruto do Projeto (R$)' : 'Gross Project Value (BRL)'}
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-slate-500 font-bold text-sm">R$</span>
              <input
                type="number"
                value={bruto}
                onChange={(e) => setBruto(e.target.value)}
                placeholder="0,00"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-white font-medium focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all text-lg"
              />
            </div>
          </div>

          {/* Banner Informativo sobre Notas Fiscais */}
          <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-4 flex gap-3 items-start">
            <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-200 font-semibold block mb-0.5">
                {language === 'pt' ? 'Planejamento Tributário Inteligente' : 'Smart Tax Planning'}
              </span>
              {language === 'pt'
                ? 'Emitindo nota como desenvolvedor na sua microempresa, você inicia pagando apenas 6% de DAS, evitando os 27,5% do imposto de renda de pessoa física.'
                : 'By invoicing through your local corporate entity, you pay a flat 6% tax, safely bypassing the heavy individual income tax brackets.'}
            </div>
          </div>
        </div>

        {/* COLUNA DE RESULTADO (5 colunas em telas grandes) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-900/40 border border-slate-800 p-6 rounded-2xl space-y-4 shadow-inner">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            {language === 'pt' ? 'Divisão do Faturamento' : 'Revenue Breakdown'}
          </span>

          <div className="space-y-3">
            {/* Linha 1: Imposto Retido */}
            <div className="flex justify-between items-center bg-slate-950/50 border border-slate-900 p-3 rounded-xl">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-xs text-slate-400 font-medium">Reserva DAS (6%)</span>
              </div>
              <span className="text-sm font-semibold text-amber-400">
                - {formatCurrency(impostoDas)}
              </span>
            </div>

            {/* Ícone de Transição Visual */}
            <div className="flex justify-center my-1 text-slate-700">
              <ArrowRight className="h-4 w-4 rotate-90 lg:rotate-0" />
            </div>

            {/* Linha 2: Lucro Líquido Real */}
            <div className="flex justify-between items-center bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
              <div className="flex items-center gap-2">
                <Landmark className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-slate-200 font-semibold">
                  {language === 'pt' ? 'Lucro Líquido' : 'Net Profit'}
                </span>
              </div>
              <span className="text-base font-bold text-emerald-400">
                {formatCurrency(lucroLiquido)}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}