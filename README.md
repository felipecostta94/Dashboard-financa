1. Estrutura de Pastas e Arquivos
O projeto segue o padrão modular do React com Vite, organizando componentes por domínio de responsabilidade:

src/
├── components/
│   ├── dashboard/
│   │   ├── CategoryChart.tsx    # Gráfico de rosca (Fontes de Receita - Recharts)
│   │   ├── MetricCard.tsx       # Cards de indicadores superiores (Saldo, DAS, etc.)
│   │   ├── RevenueChart.tsx     # Gráfico de área (Evolução do Faturamento - Recharts)
│   │   └── TaxSimulator.tsx     # Simulador interativo do Anexo III da ME
│   ├── layout/
│   │   ├── MobileNav.tsx        # Menu mobile inteligente com botão flutuante e modal 100svh
│   │   ├── Navbar.tsx           # Barra superior com cotações de moedas e seletor de idioma
│   │   └── Sidebar.tsx          # Menu lateral de navegação fixa (Desktop)
│   └── projects/
│       └── ProjectsTable.tsx    # Listagem de contratos com tabelas responsivas
├── hooks/
│   └── useLanguage.ts           # Hook customizado para gerenciar a tradução (PT/EN)
├── mock/
│   └── projectsMock.ts          # Base de dados em mock para os cálculos de faturamento
├── App.tsx                      # Componente raiz, gerenciador de estado e fluxo de layout
├── index.css                    # Estilos globais e reset de viewports (Tailwind CSS)
└── main.tsx                     # Ponto de entrada do React

2. Decisões de Design de Layout e Responsividade
O maior desafio técnico do front-end deste projeto foi alinhar e estabilizar o comportamento elástico dos gráficos e do posicionamento em múltiplos dispositivos. As soluções aplicadas foram:

Isolamento de Viewport Global (index.css): O HTML e o Body foram travados em width: 100% e overflow-x-hidden para neutralizar vazamentos de pixels causados pela largura da barra de rolagem do Windows, matando frestas brancas de fundo.

Sidebar com Fluxo Independente (App.tsx): Em telas desktop, a sidebar é travada via fixed top-0 left-0 h-screen, agindo como um painel nativo estável enquanto o bloco da direita rola livremente.

Blindagem de Gráficos SVG (CategoryChart.tsx & RevenueChart.tsx): Os containers do Recharts foram envelopados em divs com posicionamento absolute inset-0 dentro de pais flexíveis de altura rígida (h-[350px]). Isso impede que o SVG infle e estoure o tamanho do card.

Mobile-First com Hardware Control (MobileNav.tsx): O menu mobile utiliza propriedades físicas (transform: translateZ(0) e will-change-transform) para forçar o processamento do botão flutuante direto na GPU do smartphone. Isso remove o delay de renderização causado pela variação da barra de endereços do navegador durante o scroll.

Tabelas Anti-Esmagamento (ProjectsTable.tsx): Aplicação de whitespace-nowrap e larguras mínimas nas colunas de texto para garantir leitura perfeita sem quebras de linha feias em telas pequenas.

3. Regras de Negócio e Cálculos Dinâmicos
Toda a inteligência do App.tsx baseia-se no consumo dos dados consolidados no arquivo de mock. A partir dele, o sistema filtra e reduz os valores em tempo real para alimentar a interface:

Saldo em Caixa: Soma o valor de todos os projetos marcados estritamente com o status de pagos (status === 'paid').

A Receber: Mapeia e acumula o montante de notas emitidas que ainda constam como pendentes (status === 'pending').

Reserva de Impostos (ME): Calcula automaticamente a alíquota base de 6% sobre o faturamento total recebido, simulando o desconto mensal unificado do DAS para desenvolvedores enquadrados no Anexo III do Simples Nacional.

4. Stack Tecnológica Utilizada
React 18 (Biblioteca SPA para interfaces reativas)

TypeScript (Tipagem estática para maior segurança no fluxo de dados)

Tailwind CSS (Framework utilitário para estilização ultraveloz e responsiva)

Recharts (Biblioteca de gráficos otimizada para React baseada em SVG)

Lucide React (Pacote de ícones vetoriais modernos e leves)
