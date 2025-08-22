import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import AdSlot from '@/components/AdSlot';
import { Target, Plus, Minus, PieChart } from 'lucide-react';
import { PieChart as RechartsPieChart, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

// SEO Meta Tags
const SEO = {
  title: "Budget Calculator | Monthly Budget Planner India",
  description: "Plan and track your monthly budget with our free budget calculator. Follow the 50/30/20 rule for optimal financial health and savings.",
  keywords: "budget calculator, monthly budget planner, budget planner calculator, 50/30/20 rule calculator, expense tracker, budget planning tool, personal budget calculator",
  ogTitle: "Budget Calculator | Plan Your Monthly Budget",
  ogDescription: "Plan and track your monthly budget effectively. Follow the 50/30/20 rule for optimal financial health and achieve your savings goals.",
  ogUrl: "https://money-math-hub.com/calculators/budget-calculator",
  ogType: "website",
  canonical: "https://money-math-hub.com/calculators/budget-calculator"
};

const BudgetCalculator = () => {
  const [monthlyIncome, setMonthlyIncome] = useState(75000);
  const [expenses, setExpenses] = useState([
    { category: 'Housing (Rent/EMI)', amount: 25000, color: '#3b82f6' },
    { category: 'Food & Groceries', amount: 10000, color: '#22c55e' },
    { category: 'Transportation', amount: 8000, color: '#f59e0b' },
    { category: 'Utilities', amount: 5000, color: '#ef4444' },
    { category: 'Insurance', amount: 3000, color: '#8b5cf6' },
    { category: 'Entertainment', amount: 4000, color: '#06b6d4' },
    { category: 'Shopping', amount: 6000, color: '#f97316' },
    { category: 'Miscellaneous', amount: 3000, color: '#84cc16' }
  ]);

  const updateExpense = (index: number, amount: number) => {
    const newExpenses = [...expenses];
    newExpenses[index].amount = Math.max(0, amount);
    setExpenses(newExpenses);
  };

  const addExpense = () => {
    const newExpenses = [...expenses, { 
      category: 'New Category', 
      amount: 0, 
      color: `#${Math.floor(Math.random()*16777215).toString(16)}` 
    }];
    setExpenses(newExpenses);
  };

  const removeExpense = (index: number) => {
    if (expenses.length > 1) {
      const newExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(newExpenses);
    }
  };

  const calculations = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const savings = monthlyIncome - totalExpenses;
    const savingsRate = monthlyIncome > 0 ? (savings / monthlyIncome) * 100 : 0;
    
    // 50/30/20 Rule recommendations
    const needs = monthlyIncome * 0.5; // 50% for needs
    const wants = monthlyIncome * 0.3; // 30% for wants
    const savingsTarget = monthlyIncome * 0.2; // 20% for savings

    const budgetHealth = {
      needs: Math.min(100, ((expenses.slice(0, 4).reduce((sum, exp) => sum + exp.amount, 0) / needs) * 100)),
      wants: Math.min(100, ((expenses.slice(4).reduce((sum, exp) => sum + exp.amount, 0) / wants) * 100)),
      savings: Math.min(100, ((savings / savingsTarget) * 100))
    };

    return {
      totalExpenses,
      savings,
      savingsRate: savingsRate.toFixed(1),
      needs,
      wants,
      savingsTarget,
      budgetHealth,
      surplus: savings > 0,
      deficit: totalExpenses - monthlyIncome
    };
  }, [monthlyIncome, expenses]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const pieData = expenses.map(expense => ({
    name: expense.category,
    value: expense.amount,
    color: expense.color
  }));

  const budgetHealthData = [
    { category: 'Needs (50%)', actual: calculations.budgetHealth.needs, target: 100 },
    { category: 'Wants (30%)', actual: calculations.budgetHealth.wants, target: 100 },
    { category: 'Savings (20%)', actual: calculations.budgetHealth.savings, target: 100 }
  ];

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
            <Target className="h-10 w-10 text-primary" />
            Budget Planner Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Plan and track your monthly budget. Follow the 50/30/20 rule for optimal financial health.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Income</CardTitle>
                <CardDescription>Enter your total monthly income</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                  <Input
                    id="monthlyIncome"
                    type="number"
                    value={monthlyIncome}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value) || 0)}
                    className="text-right text-lg font-semibold"
                  />
                  <div className="text-sm text-muted-foreground">
                    Annual: {formatCurrency(monthlyIncome * 12)}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Monthly Expenses
                  <Button onClick={addExpense} size="sm" variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
                <CardDescription>Track all your monthly expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {expenses.map((expense, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground">{expense.category}</Label>
                      <Input
                        type="number"
                        value={expense.amount}
                        onChange={(e) => updateExpense(index, Number(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                    {expenses.length > 1 && (
                      <Button 
                        onClick={() => removeExpense(index)} 
                        size="sm" 
                        variant="ghost" 
                        className="text-destructive hover:text-destructive"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Total Expenses:</span>
                    <span className="font-semibold">{formatCurrency(calculations.totalExpenses)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ad Slot */}
            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={calculations.surplus ? 'border-success' : 'border-destructive'}>
                <CardContent className="pt-6">
                  <div className={`text-2xl font-bold mb-1 ${calculations.surplus ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(Math.abs(calculations.savings))}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {calculations.surplus ? 'Monthly Savings' : 'Monthly Deficit'}
                  </p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.savingsRate}% of income
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(monthlyIncome)}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Income</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Annual: {formatCurrency(monthlyIncome * 12)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.totalExpenses)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((calculations.totalExpenses / monthlyIncome) * 100).toFixed(1)}% of income
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Expense Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Expense Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsPieChart>
                      <RechartsPieChart 
                        data={pieData} 
                        cx="50%" 
                        cy="50%" 
                        innerRadius={60} 
                        outerRadius={120}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </RechartsPieChart>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Budget Health */}
              <Card>
                <CardHeader>
                  <CardTitle>Budget Health (50/30/20 Rule)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={budgetHealthData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip formatter={(value) => `${Number(value).toFixed(1)}%`} />
                      <Bar dataKey="actual" fill="#3b82f6" name="Actual %" />
                      <Bar dataKey="target" fill="#e5e7eb" name="Target %" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Needs (50%)</h4>
                      <p className="text-2xl font-bold text-blue-600">{formatCurrency(calculations.needs)}</p>
                      <p className="text-sm text-blue-700">Rent, utilities, groceries</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">Wants (30%)</h4>
                      <p className="text-2xl font-bold text-green-600">{formatCurrency(calculations.wants)}</p>
                      <p className="text-sm text-green-700">Entertainment, dining out</p>
                    </div>
                    <div className="p-4 bg-purple-50 rounded-lg">
                      <h4 className="font-semibold text-purple-900">Savings (20%)</h4>
                      <p className="text-2xl font-bold text-purple-600">{formatCurrency(calculations.savingsTarget)}</p>
                      <p className="text-sm text-purple-700">Emergency fund, investments</p>
                    </div>
                  </div>

                  {!calculations.surplus && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <h4 className="font-semibold text-red-900 mb-2">⚠️ Budget Alert</h4>
                      <p className="text-red-800">
                        You're spending {formatCurrency(Math.abs(calculations.deficit))} more than your income. 
                        Consider reducing expenses or increasing income.
                      </p>
                    </div>
                  )}
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
  );
};

export default BudgetCalculator;