import { useState, useEffect } from 'react';

export function useExchangeRate() {
  const [rate, setRate] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchRate() {
      try {
        // Buscando a cotação do Dólar Comercial para o Real
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
        const data = await response.json();
        
        // A API responde no formato data.USDBRL.bid (o preço atual de compra)
        if (data && data.USDBRL) {
          const bidValue = parseFloat(data.USDBRL.bid);
          // Formatando o número para o padrão de moeda brasileiro (ex: 5,15)
          const formatted = bidValue.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          setRate(formatted);
        }
      } catch (error) {
        console.error("Erro ao buscar a cotação do dólar:", error);
        setRate("5,20"); // Valor de fallback caso a API falhe, para não quebrar a tela
      } finally {
        setLoading(false);
      }
    }

    fetchRate();
  }, []);

  return { rate, loading };
}