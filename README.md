# 💼 DevFreelance Dashboard

Dashboard financeiro moderno para freelancers e desenvolvedores, construído com React + TypeScript + Tailwind.

---

## 🚀 Preview

<p align="center">
  <img src="./public/preview.png" width="100%" />
</p>

---

## ✨ Features

- 📊 Dashboard financeiro responsivo
- 📈 Gráficos dinâmicos com Recharts
- 🌍 Sistema de idiomas (PT/EN)
- 📱 Navegação mobile otimizada
- 💰 Simulação de impostos (ME - Anexo III)
- ⚡ Interface performática e mobile-first
- 🎨 Layout moderno inspirado em SaaS dashboards

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 | Interface SPA |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização |
| Recharts | Visualização de dados |
| Lucide React | Ícones |
| Vite | Build tool |

---

## 📂 Estrutura do Projeto

```txt
src/
├── components/
├── hooks/
├── mock/
├── App.tsx
└── main.tsx
```

---

## 🧠 Decisões Técnicas

### Blindagem de gráficos SVG

Os gráficos foram encapsulados em containers com altura rígida para impedir overflow e quebra do layout responsivo.

### Mobile Performance

O menu mobile utiliza aceleração por GPU com:

```css
transform: translateZ(0);
will-change: transform;
```

### Sidebar independente

A sidebar desktop utiliza posicionamento fixo para manter navegação estável enquanto o conteúdo principal rola separadamente.

---

## 📸 Screenshots

### Dashboard

<p align="center">
  <img src="./public/dashboard.png" width="100%" />
</p>

### Mobile

<p align="center">
  <img src="./public/mobile.png" width="40%" />
</p>

---

## ⚙️ Instalação

```bash
npm install
```

---

## ▶️ Rodando o projeto

```bash
npm run dev
```

---

## 🎯 Objetivo do Projeto

Este projeto foi criado para praticar:

- Arquitetura React escalável
- Componentização
- Responsividade avançada
- Gerenciamento de estado
- Performance mobile
- Visualização de dados
- UX/UI para dashboards

---

## 📌 Status

🚧 Em evolução contínua

Novas features e melhorias estão sendo implementadas constantemente.
