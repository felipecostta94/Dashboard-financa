import { Globe, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { useExchangeRate } from '../../hooks/useExchangeRate'; // <--- IMPORT NOVO

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  // PUXANDO OS DADOS DA API REAL DO DÓLAR:
  const { rate, loading } = useExchangeRate();

  return (
    <header className="w-full max-w-full min-w-0 h-16 border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-4 md:px-8 shrink-0">
      
      {/* Lado Esquerdo: Cotação Dinâmica / Real-time */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/60 border border-slate-800/80 px-3.5 py-1.5 rounded-full shadow-sm">
        <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
        {loading ? (
          <span className="text-slate-500 animate-pulse">{t.loadingExchange}</span>
        ) : (
          <span>
            USD/BRL: <span className="text-white font-bold">R$ {rate}</span>
          </span>
        )}
      </div>

      {/* Lado Direito: Seletor de Idioma */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <Globe className="h-4 w-4 text-slate-500 ml-1.5" />
          
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('pt')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                language === 'pt'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              PT
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}