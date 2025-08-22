import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdSlot from '@/components/AdSlot';
import { Car, TrendingUp, PieChart } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

// SEO Meta Tags
const SEO = {
  title: "Car Loan EMI Calculator | Auto Loan Calculator India",
  description: "Calculate car loan EMI, interest, and total payments with our free car loan calculator. Compare loan options and plan your vehicle purchase effectively.",
  keywords: "car loan calculator, auto loan EMI calculator, car finance calculator, vehicle loan calculator, car loan interest calculator, new car loan calculator, used car loan calculator",
  ogTitle: "Car Loan EMI Calculator | Calculate Your Car Loan Payments",
  ogDescription: "Plan your car purchase with our comprehensive car loan calculator. Calculate EMI, compare interest rates, and make informed decisions about your vehicle financing.",
  ogUrl: "https://money-math-hub.com/calculators/car-loan-calculator",
  ogType: "website",
  canonical: "https://money-math-hub.com/calculators/car-loan-calculator"
};

const CarLoanCalculator = () => {
  const [carPrice, setCarPrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(9.5);
  const [tenure, setTenure] = useState(5);

  const calculations = useMemo(() => {
    const P = carPrice - downPayment;
    const r = interestRate / 100 / 12;
    const n = tenure * 12;
    
    if (r === 0) {
      const emi = P / n;
      return {
        emi: Math.round(emi),
        totalAmount: P,
        totalInterest: 0,
        loanAmount: P,
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
      loanAmount: P,
      monthlyBreakdown
    };
  }, [carPrice, downPayment, interestRate, tenure]);

  const pieData = [
    { name: 'Principal', value: calculations.loanAmount, color: '#22c55e' },
    { name: 'Interest', value: calculations.totalInterest, color: '#3b82f6' },
    { name: 'Down Payment', value: downPayment, color: '#f59e0b' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Function to render SEO meta tags
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

  return (
    <div className="min-h-screen py-8">
      {/* SEO Meta Tags */}
      <React.Fragment>
        <title>{SEO.title}</title>
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords} />
        <meta property="og:title" content={SEO.ogTitle} />
        <meta property="og:description" content={SEO.ogDescription} />
        <meta property="og:url" content={SEO.ogUrl} />
        <meta property="og:type" content={SEO.ogType} />
        <link rel="canonical" href={SEO.canonical} />
      </React.Fragment>
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Car className="h-10 w-10 text-primary" />
            Car Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your car loan EMI and plan your vehicle purchase with our comprehensive car loan calculator.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Car Loan Details</CardTitle>
                <CardDescription>Enter your car financing information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="carPrice">Car Price (₹)</Label>
                  <Input
                    id="carPrice"
                    type="number"
                    value={carPrice}
                    onChange={(e) => setCarPrice(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(carPrice)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downPayment">Down Payment (₹)</Label>
                  <Input
                    id="downPayment"
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {((downPayment / carPrice) * 100).toFixed(1)}% of car price
                  </div>
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
                    <h4 className="font-semibold text-primary mb-2">💡 Car Loan Tips</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Higher down payment = lower EMI</li>
                      <li>• Check for seasonal offers</li>
                      <li>• Compare rates across lenders</li>
                      <li>• Consider total cost of ownership</li>
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
                    {formatCurrency(calculations.loanAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Loan Amount</p>
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
                    Cost Breakdown
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
                  <div className="flex justify-center gap-4 mt-4 text-xs flex-wrap">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Principal</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>Interest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded"></div>
                      <span>Down Payment</span>
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
                      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
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
  );
};

export default CarLoanCalculator;