import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdSlot from '@/components/AdSlot';
import { 
  Calculator, 
  TrendingUp, 
  PiggyBank, 
  CreditCard, 
  Home, 
  Car, 
  GraduationCap,
  Building2,
  Receipt,
  ArrowRight,
  BarChart3,
  Target,
  Clock,
  Shield
} from 'lucide-react';

const Index = () => {
  const calculatorCategories = [
    {
      title: 'Loan & Credit Calculators',
      description: 'Calculate EMIs, loan eligibility, and credit costs',
      icon: CreditCard,
      color: 'bg-primary',
      calculators: [
        { name: 'EMI Calculator', path: '/calculators/emi-calculator', icon: Calculator },
        { name: 'Home Loan Calculator', path: '/calculators/home-loan-calculator', icon: Home },
        { name: 'Car Loan Calculator', path: '/calculators/car-loan-calculator', icon: Car },
        { name: 'Personal Loan Calculator', path: '/calculators/personal-loan-calculator', icon: Receipt }
      ]
    },
    {
      title: 'Investment & Savings',
      description: 'Plan your investments and track growth',
      icon: TrendingUp,
      color: 'bg-secondary',
      calculators: [
        { name: 'SIP Calculator', path: '/calculators/sip-calculator', icon: Target },
        { name: 'Compound Interest Calculator', path: '/calculators/compound-interest-calculator', icon: BarChart3 },
        { name: 'Retirement Calculator', path: '/calculators/retirement-calculator', icon: Clock },
        { name: 'Fixed Deposit Calculator', path: '/calculators/fd-calculator', icon: PiggyBank }
      ]
    },
    {
      title: 'Tax & Salary Planning',
      description: 'Optimize your tax and salary planning',
      icon: Shield,
      color: 'bg-accent',
      calculators: [
        { name: 'Income Tax Calculator', path: '/calculators/income-tax-calculator', icon: Receipt },
        { name: 'GST Calculator', path: '/calculators/gst-calculator', icon: Building2 },
        { name: 'Salary Calculator', path: '/calculators/salary-calculator', icon: GraduationCap },
        { name: 'Budget Planner', path: '/calculators/budget-planner-calculator', icon: Target }
      ]
    }
  ];

  const features = [
    { title: 'Accurate Calculations', desc: 'Precise financial computations you can trust', icon: Calculator },
    { title: 'Real-time Results', desc: 'Instant calculations with dynamic updates', icon: TrendingUp },
    { title: 'Mobile Friendly', desc: 'Calculate on any device, anywhere', icon: Shield },
    { title: 'Expert Insights', desc: 'Learn from our comprehensive blog articles', icon: BarChart3 }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-primary">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Smart Financial <span className="text-yellow-300">Calculators</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
              Make informed financial decisions with our comprehensive suite of calculators.
              Plan loans, investments, taxes, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Button asChild size="lg" variant="secondary" className="font-semibold">
                <Link to="/calculators">
                  Explore Calculators <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" className="font-semibold bg-yellow-400 text-black hover:bg-yellow-300 border-2 border-yellow-300 shadow-lg">
                <Link to="/blog">
                  📊 Financial Insights & Tips
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Ad Slot - Banner */}
      <section className="py-8 bg-muted/50">
        <div className="container px-4 mx-auto flex justify-center">
          <AdSlot type="banner" />
        </div>
      </section>

      {/* Calculator Categories */}
      <section className="py-16 lg:py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Financial Calculators</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose from our comprehensive collection of financial tools to make better money decisions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {calculatorCategories.map((category, index) => (
              <Card key={category.title} className="group hover:shadow-hover transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.calculators.map((calc) => (
                      <Link
                        key={calc.name}
                        to={calc.path}
                        className="flex items-center p-3 rounded-lg hover:bg-muted transition-colors group/item"
                      >
                        <calc.icon className="h-4 w-4 text-muted-foreground mr-3" />
                        <span className="font-medium group-hover/item:text-primary transition-colors">
                          {calc.name}
                        </span>
                        <ArrowRight className="h-4 w-4 ml-auto text-muted-foreground group-hover/item:text-primary transition-colors" />
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ad Slot - Inline */}
      <section className="py-8">
        <div className="container px-4 mx-auto flex justify-center">
          <AdSlot type="inline" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FinanceCalc?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted by thousands for accurate financial planning and calculations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="text-center group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take Control of Your Finances?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start using our calculators today and make informed financial decisions that matter.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link to="/calculators">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
