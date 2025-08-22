import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { CreditCard, TrendingUp, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const PersonalLoanCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Personal Loan Calculator | Personal Loan EMI Calculator India",
    description: "Calculate personal loan EMI for various purposes. Get instant loan calculations with competitive rates for wedding, medical, education, travel and debt consolidation.",
    keywords: "personal loan calculator, personal loan emi calculator, personal loan calculator india, personal loan calculation, personal loan interest calculator, personal loan eligibility calculator, personal loan emi calculator online, personal loan calculator with tenure",
    ogTitle: "Personal Loan Calculator - Calculate Personal Loan EMI",
    ogDescription: "Calculate personal loan EMI for various purposes. Get instant loan calculations with competitive rates for wedding, medical, education, travel and debt consolidation.",
    ogUrl: "https://money-math-hub.com/calculators/personal-loan",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/personal-loan"
  };

  const renderSEOTags = () => (
    <>
      <title>{SEO.title}</title>
      <meta name="description" content={SEO.description} />
      <meta name="keywords" content={SEO.keywords} />
      <meta property="og:title" content={SEO.ogTitle} />
      <meta property="og:description" content={SEO.ogDescription} />
      <meta property="og:url" content={SEO.ogUrl} />
      <meta property="og:type" content={SEO.ogType} />
      <link rel="canonical" href={SEO.canonical} />
    </>
  );
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(12);
  const [tenure, setTenure] = useState(3);
  const [loanPurpose, setLoanPurpose] = useState('general');

  const calculations = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = tenure * 12;
    
    if (r === 0) {
      const emi = P / n;
      return {
        emi: Math.round(emi),
        totalAmount: P,
        totalInterest: 0,
        monthlyBreakdown: []
      };
    }
    
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalAmount = emi * n;
    const totalInterest = totalAmount - P;
    
    // Generate year-wise breakdown
    const monthlyBreakdown = [];
    let remainingPrincipal = P;
    
    for (let year = 1; year <= tenure; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;
      
      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingPrincipal * r;
        const principalPayment = emi - interestPayment;
        
        yearlyPrincipal += principalPayment;
        yearlyInterest += interestPayment;
        remainingPrincipal -= principalPayment;
        
        if (remainingPrincipal <= 0) break;
      }
      
      monthlyBreakdown.push({
        year,
        principal: Math.round(yearlyPrincipal),
        interest: Math.round(yearlyInterest),
        balance: Math.round(Math.max(0, remainingPrincipal))
      });
      
      if (remainingPrincipal <= 0) break;
    }
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      monthlyBreakdown
    };
  }, [loanAmount, interestRate, tenure]);

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#22c55e' },
    { name: 'Interest', value: calculations.totalInterest, color: '#3b82f6' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const purposeRates = {
    general: 12,
    wedding: 11.5,
    medical: 11,
    education: 10.5,
    travel: 12.5,
    debt: 13
  };

  const handlePurposeChange = (purpose: string) => {
    setLoanPurpose(purpose);
    setInterestRate(purposeRates[purpose as keyof typeof purposeRates] || 12);
  };

  return (
    <>
      {renderSEOTags()}
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <CreditCard className="h-10 w-10 text-primary" />
            Personal Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your personal loan EMI for various purposes. Get instant loan calculations with competitive rates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Loan Details</CardTitle>
                <CardDescription>Enter your loan requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(loanAmount)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Loan Purpose</Label>
                  <Select value={loanPurpose} onValueChange={handlePurposeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Purpose</SelectItem>
                      <SelectItem value="wedding">Wedding</SelectItem>
                      <SelectItem value="medical">Medical Emergency</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="travel">Travel</SelectItem>
                      <SelectItem value="debt">Debt Consolidation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (% p.a.)</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Adjusted based on loan purpose
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tenure">Loan Tenure (Years)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {tenure * 12} months
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">💡 Personal Loan Tips</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Check your credit score first</li>
                      <li>• Compare rates from multiple lenders</li>
                      <li>• Avoid prepayment penalties</li>
                      <li>• Borrow only what you need</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.emi)}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.totalAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency(calculations.totalInterest)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Principal vs Interest
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <RechartsPieChart data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={120}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                    </RechartsPieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span className="text-sm">Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm">Interest</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Line Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Payment Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculations.monthlyBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="principal" stroke="#22c55e" strokeWidth={2} name="Principal" />
                      <Line type="monotone" dataKey="interest" stroke="#3b82f6" strokeWidth={2} name="Interest" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
    </>
  );
};

export default PersonalLoanCalculator;