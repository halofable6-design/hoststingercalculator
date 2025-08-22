import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AdSlot from '@/components/AdSlot';
import { 
  Calculator, 
  Home, 
  Car, 
  CreditCard, 
  TrendingUp, 
  PiggyBank, 
  Receipt, 
  Target,
  Clock,
  BarChart3,
  Shield,
  Building2,
  GraduationCap,
  Search,
  Bike
} from 'lucide-react';

const CalculatorsPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const allCalculators = [
    // Loan & Credit
    { name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: Calculator, category: 'Loan & Credit', description: 'Calculate your monthly EMI for loans' },
    { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator', icon: Home, category: 'Loan & Credit', description: 'Plan your home loan and EMI' },
    { name: 'Car Loan Calculator', path: '/calculators/car-loan-calculator', icon: Car, category: 'Loan & Credit', description: 'Calculate car loan EMI and interest' },
    { name: 'Bike Loan Calculator', path: '/calculators/bike-loan-calculator', icon: Bike, category: 'Loan & Credit', description: 'Two-wheeler loan EMI calculator' },
    { name: 'Personal Loan Calculator', path: '/calculators/personal-loan-calculator', icon: CreditCard, category: 'Loan & Credit', description: 'Personal loan EMI calculator' },
    { name: 'Education Loan Calculator', path: '/calculators/education-loan-calculator', icon: GraduationCap, category: 'Loan & Credit', description: 'Education loan with moratorium period' },
    { name: 'Business Loan Calculator', path: '/calculators/business-loan-calculator', icon: Building2, category: 'Loan & Credit', description: 'Business loan and working capital calculator' },
    
    // Investment & Savings
    { name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: Target, category: 'Investment & Savings', description: 'Systematic Investment Plan calculator' },
    { name: 'Lumpsum Calculator', path: '/calculators/lumpsum-calculator', icon: Target, category: 'Investment & Savings', description: 'One-time investment calculator' },
    { name: 'Compound Interest Calculator', path: '/calculators/compound-interest-calculator', icon: BarChart3, category: 'Investment & Savings', description: 'Calculate compound interest returns' },
    { name: 'Simple Interest Calculator', path: '/calculators/simple-interest-calculator', icon: Calculator, category: 'Investment & Savings', description: 'Calculate simple interest' },
    { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', icon: Clock, category: 'Investment & Savings', description: 'Plan your retirement savings' },
    { name: 'Fixed Deposit Calculator', path: '/calculators/fd-calculator', icon: PiggyBank, category: 'Investment & Savings', description: 'FD returns calculator' },
    { name: 'Savings Goal Calculator', path: '/calculators/savings-goal-calculator', icon: Target, category: 'Investment & Savings', description: 'Calculate monthly savings required for goals' },
    
    // Tax & Salary
    { name: 'Income Tax Calculator', path: '/calculators/income-tax-calculator', icon: Receipt, category: 'Tax & Salary', description: 'Calculate income tax liability' },
    { name: 'GST Calculator', path: '/calculators/gst-calculator', icon: Building2, category: 'Tax & Salary', description: 'GST calculation tool' },
    { name: 'Salary Calculator', path: '/calculators/salary-calculator', icon: GraduationCap, category: 'Tax & Salary', description: 'Gross to net salary calculator' },
    
    // Personal Finance
    { name: 'Budget Planner', path: '/calculators/budget-planner-calculator', icon: Target, category: 'Personal Finance', description: 'Plan and track your budget' },
    { name: 'Debt Payoff Calculator', path: '/calculators/debt-payoff-calculator', icon: CreditCard, category: 'Personal Finance', description: 'Snowball vs Avalanche debt payoff' },
    { name: 'Emergency Fund Calculator', path: '/calculators/emergency-fund-calculator', icon: Shield, category: 'Personal Finance', description: 'Build your financial safety net' },
  ];

  const categories = ['All', 'Loan & Credit', 'Investment & Savings', 'Tax & Salary', 'Personal Finance'];
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredCalculators = allCalculators.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Financial Calculators</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive collection of financial calculators to help you make informed decisions about loans, investments, taxes, and more.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search calculators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Ad Slot */}
        <div className="flex justify-center mb-12">
          <AdSlot type="banner" />
        </div>

        {/* Calculators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {filteredCalculators.map((calculator, index) => (
            <Link key={calculator.name} to={calculator.path}>
              <Card className="h-full hover:shadow-hover transition-all duration-300 group animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <calculator.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {calculator.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {calculator.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {filteredCalculators.length === 0 && (
          <div className="text-center py-12">
            <Calculator className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No calculators found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Sidebar Ad Slot */}
        <div className="flex justify-center mt-12">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;