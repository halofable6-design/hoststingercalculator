import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AdSlot from '@/components/AdSlot';
import { Calculator, TrendingUp, Shield, Users, Award, Target } from 'lucide-react';

const AboutPage = () => {
  const features = [
    { icon: Calculator, title: 'Accurate Calculations', desc: 'Precise financial computations using industry-standard formulas' },
    { icon: Shield, title: 'Trusted Platform', desc: 'Secure and reliable financial planning tools used by thousands' },
    { icon: TrendingUp, title: 'Real-time Results', desc: 'Instant calculations with dynamic updates as you change inputs' },
    { icon: Users, title: 'User-Friendly', desc: 'Intuitive interface designed for both beginners and experts' }
  ];

  const stats = [
    { number: '30+', label: 'Financial Calculators' },
    { number: '100K+', label: 'Monthly Users' },
    { number: '500+', label: 'Blog Articles' },
    { number: '99.9%', label: 'Uptime Reliability' }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About FinanceCalc</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empowering individuals to make informed financial decisions through comprehensive, 
            easy-to-use calculators and educational content.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              At FinanceCalc, we believe that everyone deserves access to powerful financial planning tools. 
              Our mission is to democratize financial literacy by providing accurate, user-friendly calculators 
              that help individuals plan their financial future with confidence.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you're calculating loan EMIs, planning retirement savings, or optimizing tax strategies, 
              our comprehensive suite of tools ensures you have the information needed to make smart financial decisions.
            </p>
          </div>
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-8">
              <Target className="h-12 w-12 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-lg opacity-90">
                To become the most trusted digital platform for financial planning and education, 
                helping millions achieve their financial goals through informed decision-making.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Ad Slot */}
        <div className="flex justify-center mb-16">
          <AdSlot type="banner" />
        </div>

        {/* Stats Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-8">Trusted by Thousands</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={stat.label} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose FinanceCalc?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={feature.title} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational Purpose Notice */}
        <Card className="bg-warning-light border-warning">
          <CardContent className="p-8 text-center">
            <Award className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-warning-foreground mb-4">Educational Purpose</h3>
            <p className="text-lg text-warning-foreground max-w-3xl mx-auto">
              All calculators and information provided on FinanceCalc are for educational purposes only. 
              While we strive for accuracy, we recommend consulting with certified financial advisors 
              for personalized financial planning and investment decisions.
            </p>
          </CardContent>
        </Card>

        {/* Ad Slot */}
        <div className="flex justify-center mt-16">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;