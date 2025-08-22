import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { Target, Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SavingsGoalCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Savings Goal Calculator | Financial Goal Calculator India",
    description: "Calculate how much you need to save monthly to reach your financial goals. Plan your savings strategy effectively with our goal calculator.",
    keywords: "savings goal calculator, financial goal calculator, savings calculator india, goal calculator, savings planner, financial goal planner, savings target calculator, savings calculator with time frame",
    ogTitle: "Savings Goal Calculator - Plan Your Financial Goals",
    ogDescription: "Calculate how much you need to save monthly to reach your financial goals. Plan your savings strategy effectively with our goal calculator.",
    ogUrl: "https://money-math-hub.com/calculators/savings-goal",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/savings-goal"
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
  const [goalAmount, setGoalAmount] = useState(1000000);
  const [timeFrame, setTimeFrame] = useState(5);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [calculationType, setCalculationType] = useState('monthly');

  const calculations = useMemo(() => {
    const monthlyRate = expectedReturn / 12 / 100;
    const months = timeFrame * 12;
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + monthlyRate, months);
    const remainingAmount = Math.max(0, goalAmount - futureValueOfCurrentSavings);

    let requiredMonthlySIP = 0;
    if (remainingAmount > 0) {
      requiredMonthlySIP = remainingAmount / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));
    }

    // Calculate year-wise progression
    const progression = [];
    let cumulativeInvestment = currentSavings;
    let portfolioValue = currentSavings;

    for (let year = 1; year <= timeFrame; year++) {
      const yearlyInvestment = requiredMonthlySIP * 12;
      cumulativeInvestment += yearlyInvestment;
      
      // Calculate portfolio value at end of year
      portfolioValue = (portfolioValue + yearlyInvestment) * (1 + expectedReturn / 100);
      
      progression.push({
        year,
        investment: Math.round(cumulativeInvestment),
        value: Math.round(portfolioValue),
        returns: Math.round(portfolioValue - cumulativeInvestment)
      });
    }

    const totalInvestment = currentSavings + (requiredMonthlySIP * months);
    const totalReturns = goalAmount - totalInvestment;

    return {
      requiredMonthlySIP: Math.round(requiredMonthlySIP),
      totalInvestment: Math.round(totalInvestment),
      totalReturns: Math.round(totalReturns),
      futureValueOfCurrentSavings: Math.round(futureValueOfCurrentSavings),
      progression
    };
  }, [goalAmount, timeFrame, currentSavings, expectedReturn]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
      {renderSEOTags()}
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Target className="h-10 w-10 text-primary" />
            Savings Goal Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate how much you need to save monthly to reach your financial goals. Plan your savings strategy effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Goal Details</CardTitle>
                <CardDescription>Enter your savings goal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="goalAmount">Goal Amount (₹)</Label>
                  <Input
                    id="goalAmount"
                    type="number"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeFrame">Time Frame (Years)</Label>
                  <Select value={timeFrame.toString()} onValueChange={(value) => setTimeFrame(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
                  <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
                  <Input
                    id="expectedReturn"
                    type="number"
                    step="0.1"
                    value={expectedReturn}
                    onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>

            <AdSlot type="sidebar" />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.requiredMonthlySIP)}
                  </div>
                  <p className="text-sm text-muted-foreground">Required Monthly SIP</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.totalInvestment)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatCurrency(calculations.totalReturns)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Goal Progression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={calculations.progression}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                      labelFormatter={(year) => `Year ${year}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="investment" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      name="Total Investment"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      name="Portfolio Value"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Yearly Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calculations.progression}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="investment" fill="#3b82f6" name="Investment" />
                    <Bar dataKey="returns" fill="#22c55e" name="Returns" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Goal Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Goal Amount:</span>
                      <span className="font-semibold">{formatCurrency(goalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Time Frame:</span>
                      <span className="font-semibold">{timeFrame} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Current Savings:</span>
                      <span className="font-semibold">{formatCurrency(currentSavings)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly SIP Required:</span>
                      <span className="font-semibold">{formatCurrency(calculations.requiredMonthlySIP)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Expected Return:</span>
                      <span className="font-semibold">{expectedReturn}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Future Value of Current Savings:</span>
                      <span className="font-semibold">{formatCurrency(calculations.futureValueOfCurrentSavings)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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

export default SavingsGoalCalculator;