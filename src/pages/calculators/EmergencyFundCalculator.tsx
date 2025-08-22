import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { Shield, TrendingUp, Target, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const EmergencyFundCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Emergency Fund Calculator | Financial Safety Net Calculator",
    description: "Calculate how much emergency fund you need and create a savings plan. Build a financial safety net for unexpected expenses with our comprehensive emergency fund calculator.",
    keywords: "emergency fund calculator, financial safety net calculator, emergency savings calculator, how much emergency fund, emergency fund calculator india, financial emergency fund, emergency savings goal calculator, emergency fund planner",
    ogTitle: "Emergency Fund Calculator - Build Your Financial Safety Net",
    ogDescription: "Calculate your emergency fund needs and create a savings plan. Build a financial safety net for unexpected expenses with our comprehensive calculator.",
    ogUrl: "https://money-math-hub.com/calculators/emergency-fund",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/emergency-fund"
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
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(100000);
  const [targetMonths, setTargetMonths] = useState(6);
  const [monthlyContribution, setMonthlyContribution] = useState(10000);
  const [riskTolerance, setRiskTolerance] = useState('moderate');

  const calculations = useMemo(() => {
    const targetAmount = monthlyExpenses * targetMonths;
    const remainingAmount = Math.max(0, targetAmount - currentSavings);
    const monthsToTarget = remainingAmount > 0 ? Math.ceil(remainingAmount / monthlyContribution) : 0;
    
    // Risk-based recommendations
    const riskMultipliers = {
      low: { months: 3, description: 'Stable job, dual income' },
      moderate: { months: 6, description: 'Average job security' },
      high: { months: 9, description: 'Unstable income, single income' }
    };
    
    const recommendedMonths = riskMultipliers[riskTolerance as keyof typeof riskMultipliers].months;
    const recommendedAmount = monthlyExpenses * recommendedMonths;
    
    // Generate monthly savings timeline
    const savingsTimeline = [];
    let currentAmount = currentSavings;
    
    for (let month = 0; month <= Math.min(monthsToTarget + 12, 60); month++) {
      if (month > 0) currentAmount += monthlyContribution;
      
      savingsTimeline.push({
        month,
        savings: Math.round(currentAmount),
        target: targetAmount,
        recommended: recommendedAmount,
        coverage: Math.round((currentAmount / monthlyExpenses) * 10) / 10
      });
      
      if (currentAmount >= targetAmount && month >= monthsToTarget) break;
    }
    
    // Category-wise expense breakdown (example)
    const expenseCategories = [
      { category: 'Housing', amount: monthlyExpenses * 0.30, percentage: 30 },
      { category: 'Food', amount: monthlyExpenses * 0.15, percentage: 15 },
      { category: 'Transportation', amount: monthlyExpenses * 0.12, percentage: 12 },
      { category: 'Utilities', amount: monthlyExpenses * 0.08, percentage: 8 },
      { category: 'Insurance', amount: monthlyExpenses * 0.10, percentage: 10 },
      { category: 'Other', amount: monthlyExpenses * 0.25, percentage: 25 }
    ];
    
    return {
      targetAmount: Math.round(targetAmount),
      remainingAmount: Math.round(remainingAmount),
      monthsToTarget,
      recommendedAmount: Math.round(recommendedAmount),
      recommendedMonths,
      currentCoverage: Math.round((currentSavings / monthlyExpenses) * 10) / 10,
      completionPercentage: Math.round((currentSavings / targetAmount) * 100),
      savingsTimeline,
      expenseCategories,
      isOnTrack: currentSavings >= recommendedAmount
    };
  }, [monthlyExpenses, currentSavings, targetMonths, monthlyContribution, riskTolerance]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = () => {
    if (calculations.completionPercentage >= 100) return 'text-success';
    if (calculations.completionPercentage >= 75) return 'text-primary';
    if (calculations.completionPercentage >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getStatusMessage = () => {
    if (calculations.completionPercentage >= 100) return 'Excellent! Your emergency fund is complete.';
    if (calculations.completionPercentage >= 75) return 'Good progress! Almost there.';
    if (calculations.completionPercentage >= 50) return 'Making progress, keep going!';
    if (calculations.completionPercentage >= 25) return 'Started well, continue building.';
    return 'Just getting started, consistency is key.';
  };

  return (
    <>
      {renderSEOTags()}
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            Emergency Fund Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build a financial safety net for unexpected expenses. Calculate how much you need and create a savings plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Information</CardTitle>
                <CardDescription>Enter your monthly expenses and savings details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyExpenses">Monthly Expenses (₹)</Label>
                  <Input
                    id="monthlyExpenses"
                    type="number"
                    value={monthlyExpenses}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Include all essential expenses
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentSavings">Current Emergency Savings (₹)</Label>
                  <Input
                    id="currentSavings"
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {calculations.currentCoverage} months coverage
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetMonths">Target Coverage (Months)</Label>
                  <Input
                    id="targetMonths"
                    type="number"
                    value={targetMonths}
                    onChange={(e) => setTargetMonths(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Recommended: {calculations.recommendedMonths} months
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="monthlyContribution">Monthly Savings (₹)</Label>
                  <Input
                    id="monthlyContribution"
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {((monthlyContribution / monthlyExpenses) * 100).toFixed(1)}% of monthly expenses
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Risk Profile</Label>
                  <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select risk tolerance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low Risk (3 months)</SelectItem>
                      <SelectItem value="moderate">Moderate Risk (6 months)</SelectItem>
                      <SelectItem value="high">High Risk (9 months)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    {(riskTolerance === 'low' && 'Stable job, dual income') ||
                     (riskTolerance === 'moderate' && 'Average job security') ||
                     (riskTolerance === 'high' && 'Unstable income, single income')}
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">🎯 Emergency Fund Tips</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Keep in liquid, accessible accounts</li>
                      <li>• Separate from other savings</li>
                      <li>• Only use for true emergencies</li>
                      <li>• Replenish after using</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Emergency Fund Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Progress to Target</span>
                    <span className={`font-bold text-2xl ${getStatusColor()}`}>
                      {calculations.completionPercentage}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-4">
                    <div 
                      className="bg-primary h-4 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(calculations.completionPercentage, 100)}%` }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className={`font-semibold ${getStatusColor()}`}>
                      {getStatusMessage()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.targetAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Target Amount</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {targetMonths} months coverage
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.remainingAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Amount Needed</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.monthsToTarget} months to go
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {calculations.currentCoverage}
                  </div>
                  <p className="text-sm text-muted-foreground">Months Covered</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Current coverage
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Savings Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Savings Progress Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculations.savingsTimeline}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(month) => `Month ${month}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        name="Your Savings"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target Amount"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="recommended" 
                        stroke="#f59e0b" 
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        name="Recommended Amount"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Expense Categories */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expense Breakdown</CardTitle>
                  <CardDescription>Understanding what your emergency fund should cover</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculations.expenseCategories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="amount" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Scenarios Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Emergency Scenarios Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-destructive">Job Loss (3-6 months)</h4>
                      <div className="text-sm space-y-1">
                        <div>Required: {formatCurrency(monthlyExpenses * 3)} - {formatCurrency(monthlyExpenses * 6)}</div>
                        <div>Your Coverage: {formatCurrency(currentSavings)}</div>
                        <div className={calculations.currentCoverage >= 3 ? 'text-success' : 'text-destructive'}>
                          {calculations.currentCoverage >= 3 ? '✓ Covered' : '✗ Insufficient'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-warning">Medical Emergency</h4>
                      <div className="text-sm space-y-1">
                        <div>Typical Range: ₹50,000 - ₹2,00,000</div>
                        <div>Your Coverage: {formatCurrency(currentSavings)}</div>
                        <div className={currentSavings >= 200000 ? 'text-success' : 'text-warning'}>
                          {currentSavings >= 200000 ? '✓ Well Covered' : '⚠ Partial Coverage'}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2 text-primary">Home/Car Repair</h4>
                      <div className="text-sm space-y-1">
                        <div>Typical Range: ₹25,000 - ₹1,00,000</div>
                        <div>Your Coverage: {formatCurrency(currentSavings)}</div>
                        <div className={currentSavings >= 100000 ? 'text-success' : 'text-primary'}>
                          {currentSavings >= 100000 ? '✓ Covered' : '⚠ Limited Coverage'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Plan */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Action Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2 text-primary">Immediate Steps:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Open a separate high-yield savings account</li>
                          <li>• Set up automatic monthly transfers</li>
                          <li>• Start with at least ₹25,000</li>
                          <li>• Track progress monthly</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-secondary">Long-term Strategy:</h4>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• Gradually increase savings rate</li>
                          <li>• Review and adjust target annually</li>
                          <li>• Consider liquid mutual funds for higher returns</li>
                          <li>• Don't touch unless true emergency</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Your Timeline:</h4>
                      <p className="text-sm">
                        At your current savings rate of {formatCurrency(monthlyContribution)} per month, 
                        you'll reach your target of {formatCurrency(calculations.targetAmount)} in{' '}
                        <span className="font-semibold text-primary">{calculations.monthsToTarget} months</span>
                        {calculations.monthsToTarget > 12 && ` (${Math.round(calculations.monthsToTarget / 12 * 10) / 10} years)`}.
                      </p>
                    </div>
                  </div>
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

export default EmergencyFundCalculator;