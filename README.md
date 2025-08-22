# WealthWiseCalculator - Financial Calculator Hub

A comprehensive financial calculator application built with React and Vite. Calculate loans, investments, taxes, and more with our suite of financial tools.

## Features

- **Loan Calculators**: EMI Calculator, Home Loan, Car Loan, Personal Loan, Bike Loan, Business Loan, Education Loan
- **Investment Tools**: SIP Calculator, Compound Interest, Retirement Planning, FD Calculator, Lumpsum Calculator
- **Tax & Salary**: Income Tax Calculator, GST Calculator, Salary Calculator
- **Financial Planning**: Budget Calculator, Debt Payoff Calculator, Emergency Fund Calculator, Savings Goal Calculator

## Getting Started

This is a financial calculator application built with React and Vite.

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone <YOUR_GIT_URL>
cd money-math-hub-main
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Building for Production

```bash
npm run build
```

## Deployment

The application can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

### Example deployment commands:

**Vercel:**
```bash
npm i -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Technologies Used

- **Vite** - Fast build tool and development server
- **React** - UI library for building user interfaces
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Recharts** - Composable charting library
- **Lucide React** - Beautiful & consistent icon library

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout/         # Layout components (Header, Footer)
│   └── ui/             # Shadcn/ui components
├── pages/              # Page components
│   ├── calculators/    # Individual calculator pages
│   ├── AboutPage.tsx   # About page
│   ├── BlogPage.tsx    # Blog listing page
│   └── Index.tsx       # Homepage
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── assets/             # Static assets
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact us at: halofable6@gmail.com

## URL

**Production**: https://wealthwisecalculator.com
