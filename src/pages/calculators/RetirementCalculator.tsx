import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdSlot from '@/components/AdSlot';
import { Clock, TrendingUp, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const RetirementCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Retirement Calculator | Retirement Planning Calculator India",
    description: "Plan your retirement and ensure financial independence. Calculate how much you need to save for a comfortable retirement with inflation-adjusted calculations.",
    keywords: "retirement calculator, retirement planning calculator, retirement calculator india, retirement planning, retirement corpus calculator, retirement savings calculator, retirement income calculator, retirement fund calculator",
    ogTitle: "Retirement Calculator - Plan Your Financial Independence",
    ogDescription: "Plan your retirement and ensure financial independence. Calculate how much you need to save for a comfortable retirement with inflation-adjusted calculations.",
    ogUrl: "https://money-math-hub.com/calculators/retirement",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/retirement"
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
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [monthlySavings, setMonthlySavings] = useState(15000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const calculations = useMemo(() => {
    const yearsToRetirement = retirementAge - currentAge;
    const yearsInRetirement = 25; // Assume 25 years post retirement
    const monthsToRetirement = yearsToRetirement * 12;
    
    // Future value of current savings
    const futureValueCurrentSavings = currentSavings * Math.pow(1 + expectedReturn/100, yearsToRetirement);
    
    // Future value of monthly SIP
    const monthlyRate = expectedReturn / 100 / 12;
    const futureValueSIP = monthlySavings * ((Math.pow(1 + monthlyRate, monthsToRetirement) - 1) / monthlyRate);
    
    // Total corpus at retirement
    const totalCorpus = futureValueCurrentSavings + futureValueSIP;
    
    // Monthly expenses at retirement (adjusted for inflation)
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate/100, yearsToRetirement);
    
    // Required corpus for retirement (25x annual expenses)
    const requiredCorpus = futureMonthlyExpenses * 12 * 25;
    
    // Shortfall or surplus
    const surplus = totalCorpus - requiredCorpus;
    const isShortfall = surplus < 0;
    
    // If shortfall, calculate additional monthly savings needed
    let additionalSavingsNeeded = 0;
    if (isShortfall) {
      const shortfall = Math.abs(surplus);
      additionalSavingsNeeded = (shortfall * monthlyRate) / (Math.pow(1 + monthlyRate, monthsToRetirement) - 1);
    }
    
    // Generate year-wise projection
    const yearlyProjection = [];
    let currentCorpus = currentSavings;
    
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const yearlyContribution = monthlySavings * 12;
      
      if (year > 0) {
        currentCorpus = (currentCorpus + yearlyContribution) * (1 + expectedReturn/100);
      }
      
      const inflatedExpenses = monthlyExpenses * Math.pow(1 + inflationRate/100, year);
      
      yearlyProjection.push({
        year: year,
        age: age,
        corpus: Math.round(currentCorpus),
        monthlyExpenses: Math.round(inflatedExpenses),
        annualExpenses: Math.round(inflatedExpenses * 12)
      });
    }
    
    return {
      yearsToRetirement,
      totalCorpus: Math.round(totalCorpus),
      requiredCorpus: Math.round(requiredCorpus),
      futureMonthlyExpenses: Math.round(futureMonthlyExpenses),
      surplus: Math.round(Math.abs(surplus)),
      isShortfall,
      additionalSavingsNeeded: Math.round(additionalSavingsNeeded),
      yearlyProjection,
      currentSavingsGrowth: Math.round(futureValueCurrentSavings),
      sipGrowth: Math.round(futureValueSIP)
    };
  }, [currentAge, retirementAge, monthlyExpenses, currentSavings, monthlySavings, expectedReturn, inflationRate]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatLakhs = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return formatCurrency(amount);
  };

  return (
    <>
      {renderSEOTags()}
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Clock className="h-10 w-10 text-primary" />
            Retirement Planning Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plan your retirement and ensure financial independence. Calculate how much you need to save for a comfortable retirement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>Your current financial situation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentAge">Current Age</Label>
                  <Input
                    id="currentAge"
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retirementAge">Retirement Age</Label>
                  <Input
                    id="retirementAge"
                    type="number"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {calculations.yearsToRetirement} years to retirement
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Current Monthly Expenses (₹)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Annual: {formatCurrency(monthlyExpenses * 12)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>Your savings and investment plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Savings (₹)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="monthlySavings">Monthly Savings (₹)</Label>
                  <Input
                    id="monthlySavings"
                    type="number"
                    value={monthlySavings}
                    onChange={(e) => setMonthlySavings(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Annual: {formatCurrency(monthlySavings * 12)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expectedReturn">Expected Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
                  <Input
                    id="inflationRate"
                    type="number"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Ad Slot */}
            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Retirement Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={calculations.isShortfall ? 'border-destructive' : 'border-success'}>
                <CardContent className="pt-6">
                  <div className={`text-2xl font-bold mb-1 ${calculations.isShortfall ? 'text-destructive' : 'text-success'}`}>
                    {formatLakhs(calculations.surplus)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {calculations.isShortfall ? 'Shortfall' : 'Surplus'}
                  </p>
                  {calculations.isShortfall && (
                    <div className="text-xs text-destructive mt-1">
                      Need ₹{calculations.additionalSavingsNeeded.toLocaleString()}/month more
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatLakhs(calculations.totalCorpus)}
                  </div>
                  <p className="text-sm text-muted-foreground">Projected Corpus</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    At age {retirementAge}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatLakhs(calculations.requiredCorpus)}
                  </div>
                  <p className="text-sm text-muted-foreground">Required Corpus</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    25x annual expenses
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Wealth Growth Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Retirement Corpus Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={calculations.yearlyProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis tickFormatter={(value) => formatLakhs(value)} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(age) => `Age ${age}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="corpus" 
                        stroke="#22c55e" 
                        fill="#22c55e"
                        fillOpacity={0.3}
                        name="Retirement Corpus"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expenses vs Corpus */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Corpus vs Future Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculations.yearlyProjection}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age" />
                      <YAxis tickFormatter={(value) => formatLakhs(value)} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(age) => `Age ${age}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="corpus" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        name="Corpus Growth"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="annualExpenses" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Annual Expenses (Inflated)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Retirement Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Retirement Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Corpus Breakdown</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>From current savings:</span>
                        <span className="font-medium">{formatLakhs(calculations.currentSavingsGrowth)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>From monthly SIPs:</span>
                        <span className="font-medium">{formatLakhs(calculations.sipGrowth)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total corpus:</span>
                        <span>{formatLakhs(calculations.totalCorpus)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Future Monthly Expenses</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current monthly expenses:</span>
                        <span className="font-medium">{formatCurrency(monthlyExpenses)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>At retirement (inflated):</span>
                        <span className="font-medium">{formatCurrency(calculations.futureMonthlyExpenses)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inflation impact:</span>
                        <span className="font-medium">{((calculations.futureMonthlyExpenses / monthlyExpenses - 1) * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Ad Slot */}
        <div className="flex justify-center mt-8">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
    </>
  );
};

export default RetirementCalculator;