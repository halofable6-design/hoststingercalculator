import { Link } from 'react-router-dom';
import { Calculator, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const calculatorCategories = [
    { name: 'Loan Calculators', items: ['EMI Calculator', 'Home Loan', 'Car Loan', 'Personal Loan'] },
    { name: 'Investment Tools', items: ['SIP Calculator', 'Compound Interest', 'Retirement Planning', 'FD Calculator'] },
    { name: 'Tax & Salary', items: ['Income Tax', 'GST Calculator', 'Salary Calculator', 'Tax Planner'] },
  ];

  return (
    <footer className="bg-muted border-t">
      <div className="container py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                <Calculator className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                WealthWiseCalculator
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Your trusted companion for financial planning. Calculate loans, investments, taxes, 
              and more with our comprehensive suite of financial tools.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>halofable6@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Calculator Categories */}
          {calculatorCategories.map((category) => (
            <div key={category.name}>
              <h3 className="font-semibold text-foreground mb-4">{category.name}</h3>
              <ul className="space-y-2">
                {category.items.map((item) => (
                  <li key={item}>
                    <Link
                      to={`/calculators/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="my-8 border-border" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
            <p className="text-sm text-muted-foreground">
              © {currentYear} WealthWiseCalculator. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          
          <p className="text-sm text-warning font-medium bg-warning-light px-3 py-1 rounded-full">
            This website is for educational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;