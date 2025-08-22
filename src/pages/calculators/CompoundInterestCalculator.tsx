import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { BarChart3, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// SEO Meta Tags
const SEO = {
  title: "Compound Interest Calculator | Investment Returns Calculator India",
  description: "Calculate compound interest returns on your investments. See how your money grows exponentially over time with our free compound interest calculator.",
  keywords: "compound interest calculator, investment returns calculator, compound interest formula, investment growth calculator, SIP returns calculator, mutual fund returns calculator, wealth growth calculator",
  ogTitle: "Compound Interest Calculator | Calculate Investment Returns",
  ogDescription: "Discover the power of compound interest and see how your investments can grow exponentially over time. Plan your wealth creation journey effectively.",
  ogUrl: "https://money-math-hub.com/calculators/compound-interest-calculator",
  ogType: "website",
  canonical: "https://money-math-hub.com/calculators/compound-interest-calculator"
};

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [timePeriod, setTimePeriod] = useState(10);
  const [compoundingFrequency, setCompoundingFrequency] = useState('annually');

  const compoundingOptions = {
    annually: { value: 1, label: 'Annually' },
    semiannually: { value: 2, label: 'Semi-Annually' },
    quarterly: { value: 4, label: 'Quarterly' },
    monthly: { value: 12, label: 'Monthly' },
    daily: { value: 365, label: 'Daily' }
  };

  const calculations = useMemo(() => {
    const P = principal;
    const r = interestRate / 100;
    const n = compoundingOptions[compoundingFrequency as keyof typeof compoundingOptions].value;
    const t = timePeriod;
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const compoundAmount = P * Math.pow(1 + (r / n), n * t);
    const compoundInterest = compoundAmount - P;
    
    // Simple Interest for comparison: SI = P * r * t
    const simpleInterest = P * r * t;
    const simpleAmount = P + simpleInterest;
    
    // Generate year-wise breakdown
    const yearlyData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const compoundAmountYear = P * Math.pow(1 + (r / n), n * year);
      const simpleAmountYear = P + (P * r * year);
      
      yearlyData.push({
        year,
        compound: Math.round(compoundAmountYear),
        simple: Math.round(simpleAmountYear),
        compoundInterest: Math.round(compoundAmountYear - P),
        simpleInterest: Math.round(P * r * year)
      });
    }
    
    return {
      compoundAmount: Math.round(compoundAmount),
      compoundInterest: Math.round(compoundInterest),
      simpleAmount: Math.round(simpleAmount),
      simpleInterest: Math.round(simpleInterest),
      difference: Math.round(compoundInterest - simpleInterest),
      yearlyData
    };
  }, [principal, interestRate, timePeriod, compoundingFrequency]);

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
        {renderSEOTags()}
      </React.Fragment>
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <BarChart3 className="h-10 w-10 text-primary" />
            Compound Interest Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover the power of compound interest and see how your money can grow exponentially over time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>Enter your investment parameters</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Principal Amount (₹)</Label>
                  <Input
                    id="principal"
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(principal)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
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
                  <Label htmlFor="timePeriod">Time Period (Years)</Label>
                  <Input
                    id="timePeriod"
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Compounding Frequency</Label>
                  <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(compoundingOptions).map(([key, option]) => (
                        <SelectItem key={key} value={key}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ad Slot */}
            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Results Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.compoundAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Compound Amount</p>
                  <div className="text-xs text-success mt-1">
                    Interest: {formatCurrency(calculations.compoundInterest)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.simpleAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Simple Interest Amount</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Interest: {formatCurrency(calculations.simpleInterest)}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="md:col-span-2">
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatCurrency(calculations.difference)}
                  </div>
                  <p className="text-sm text-muted-foreground">Extra Earning from Compounding</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((calculations.difference / calculations.simpleInterest) * 100).toFixed(1)}% more than simple interest
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Growth Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Compound vs Simple Interest Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={calculations.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(year) => `Year ${year}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="compound" 
                        stroke="#22c55e" 
                        fill="#22c55e"
                        fillOpacity={0.3}
                        name="Compound Interest"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="simple" 
                        stroke="#3b82f6" 
                        fill="#3b82f6"
                        fillOpacity={0.3}
                        name="Simple Interest"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Interest Earned Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Interest Earned Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculations.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(year) => `Year ${year}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="compoundInterest" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        name="Compound Interest Earned"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="simpleInterest" 
                        stroke="#3b82f6" 
                        strokeWidth={3}
                        name="Simple Interest Earned"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Ad Slot */}
        <div className="flex justify-center mt-8">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
  );
};

export default CompoundInterestCalculator;