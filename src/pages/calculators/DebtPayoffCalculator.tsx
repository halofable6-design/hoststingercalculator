import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdSlot from '@/components/AdSlot';
import { CreditCard, TrendingDown, BarChart3, Plus, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// SEO Meta Tags
const SEO = {
  title: "Debt Payoff Calculator | Loan Repayment Calculator India",
  description: "Calculate debt payoff strategies and plan your loan repayment with our free debt payoff calculator. Become debt-free faster with smart repayment plans.",
  keywords: "debt payoff calculator, loan repayment calculator, debt calculator, debt free calculator, debt snowball calculator, debt avalanche calculator, loan payoff calculator, debt repayment strategy",
  ogTitle: "Debt Payoff Calculator | Plan Your Debt-Free Journey",
  ogDescription: "Plan your debt-free future with our comprehensive debt payoff calculator. Compare repayment strategies and become debt-free faster with smart financial planning.",
  ogUrl: "https://money-math-hub.com/calculators/debt-payoff-calculator",
  ogType: "website",
  canonical: "https://money-math-hub.com/calculators/debt-payoff-calculator"
};

interface Debt {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  minimumPayment: number;
}

const DebtPayoffCalculator = () => {
  const [debts, setDebts] = useState<Debt[]>([
    { id: '1', name: 'Credit Card 1', balance: 50000, interestRate: 24, minimumPayment: 2500 },
    { id: '2', name: 'Personal Loan', balance: 200000, interestRate: 15, minimumPayment: 8000 },
    { id: '3', name: 'Credit Card 2', balance: 30000, interestRate: 28, minimumPayment: 1500 }
  ]);
  const [extraPayment, setExtraPayment] = useState(5000);
  const [strategy, setStrategy] = useState<'snowball' | 'avalanche'>('avalanche');

  const addDebt = () => {
    const newDebt: Debt = {
      id: Date.now().toString(),
      name: `Debt ${debts.length + 1}`,
      balance: 25000,
      interestRate: 18,
      minimumPayment: 1250
    };
    setDebts([...debts, newDebt]);
  };

  const removeDebt = (id: string) => {
    setDebts(debts.filter(debt => debt.id !== id));
  };

  const updateDebt = (id: string, field: string, value: number) => {
    setDebts(debts.map(debt => 
      debt.id === id ? { ...debt, [field]: value } : debt
    ));
  };

  const calculateTimeSavedWithExtra = () => {
    // Calculate time without extra payment for comparison
    let remainingDebts = debts.map(debt => ({ ...debt }));
    let month = 0;
    let totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);

    while (remainingDebts.length > 0 && month < 360) {
      month++;
      
      remainingDebts.forEach(debt => {
        const monthlyInterest = (debt.balance * debt.interestRate / 100) / 12;
        const principalPayment = Math.max(0, debt.minimumPayment - monthlyInterest);
        debt.balance = Math.max(0, debt.balance - principalPayment);
      });

      remainingDebts = remainingDebts.filter(debt => debt.balance > 0);
      if (remainingDebts.length === 0) break;
    }

    return month;
  };

  const calculations = useMemo(() => {
    if (debts.length === 0) return { payoffOrder: [], timeline: [], summary: {} };

    // Sort debts based on strategy
    const sortedDebts = [...debts].sort((a, b) => {
      if (strategy === 'snowball') {
        return a.balance - b.balance; // Smallest balance first
      } else {
        return b.interestRate - a.interestRate; // Highest interest rate first
      }
    });

    // Calculate payoff timeline
    let remainingDebts = sortedDebts.map(debt => ({ ...debt }));
    const payoffOrder: Array<{debt: string, month: number, totalPaid: number}> = [];
    const timeline: Array<{month: number, totalBalance: number, monthlyPayment: number}> = [];
    
    let month = 0;
    let totalInterestPaid = 0;
    let totalMinimumPayments = debts.reduce((sum, debt) => sum + debt.minimumPayment, 0);
    let totalAvailablePayment = totalMinimumPayments + extraPayment;

    while (remainingDebts.length > 0 && month < 360) { // Max 30 years
      month++;
      let monthlyInterest = 0;
      let availablePayment = totalAvailablePayment;
      
      // Pay minimum on all debts
      remainingDebts.forEach(debt => {
        const monthlyInterestForDebt = (debt.balance * debt.interestRate / 100) / 12;
        monthlyInterest += monthlyInterestForDebt;
        
        const minimumPrincipal = Math.max(0, debt.minimumPayment - monthlyInterestForDebt);
        debt.balance = Math.max(0, debt.balance - minimumPrincipal);
        availablePayment -= debt.minimumPayment;
      });

      // Apply extra payment to target debt (first in sorted order)
      if (remainingDebts.length > 0 && availablePayment > 0) {
        const targetDebt = remainingDebts[0];
        const extraPrincipal = Math.min(availablePayment, targetDebt.balance);
        targetDebt.balance -= extraPrincipal;
        availablePayment -= extraPrincipal;
      }

      // Remove paid-off debts
      const paidOffDebts = remainingDebts.filter(debt => debt.balance <= 0);
      paidOffDebts.forEach(debt => {
        payoffOrder.push({
          debt: debt.name,
          month,
          totalPaid: debts.find(d => d.id === debt.id)?.balance || 0
        });
      });
      remainingDebts = remainingDebts.filter(debt => debt.balance > 0);

      totalInterestPaid += monthlyInterest;
      
      const totalBalance = remainingDebts.reduce((sum, debt) => sum + debt.balance, 0);
      timeline.push({
        month,
        totalBalance: Math.round(totalBalance),
        monthlyPayment: Math.round(totalAvailablePayment)
      });

      if (totalBalance <= 0) break;
    }

    const totalOriginalDebt = debts.reduce((sum, debt) => sum + debt.balance, 0);
    const totalPayments = (totalOriginalDebt + totalInterestPaid);
    const payoffTimeMonths = month;
    const timeSavedMonths = Math.max(0, calculateTimeSavedWithExtra() - payoffTimeMonths);

    return {
      payoffOrder,
      timeline,
      summary: {
        payoffTimeMonths,
        payoffTimeYears: Math.round(payoffTimeMonths / 12 * 10) / 10,
        totalInterestPaid: Math.round(totalInterestPaid),
        totalPayments: Math.round(totalPayments),
        timeSavedMonths,
        monthlySavings: Math.round(totalInterestPaid / payoffTimeMonths)
      }
    };
  }, [debts, extraPayment, strategy]);

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
            <CreditCard className="h-10 w-10 text-primary" />
            Debt Payoff Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Compare Snowball vs Avalanche debt payoff strategies. Create a plan to become debt-free faster.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Debt Information</CardTitle>
                <CardDescription>Enter your debt details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {debts.map((debt, index) => (
                  <div key={debt.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="font-semibold">Debt {index + 1}</Label>
                      {debts.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDebt(debt.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Balance (₹)</Label>
                      <Input
                        type="number"
                        value={debt.balance}
                        onChange={(e) => updateDebt(debt.id, 'balance', Number(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Interest Rate (%)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={debt.interestRate}
                        onChange={(e) => updateDebt(debt.id, 'interestRate', Number(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Minimum Payment (₹)</Label>
                      <Input
                        type="number"
                        value={debt.minimumPayment}
                        onChange={(e) => updateDebt(debt.id, 'minimumPayment', Number(e.target.value) || 0)}
                        className="text-right"
                      />
                    </div>
                  </div>
                ))}
                
                <Button onClick={addDebt} variant="outline" className="w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Another Debt
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Strategy & Extra Payment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Extra Monthly Payment (₹)</Label>
                  <Input
                    type="number"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Payoff Strategy</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant={strategy === 'avalanche' ? 'default' : 'outline'}
                      onClick={() => setStrategy('avalanche')}
                      className="text-xs"
                    >
                      Avalanche
                    </Button>
                    <Button
                      variant={strategy === 'snowball' ? 'default' : 'outline'}
                      onClick={() => setStrategy('snowball')}
                      className="text-xs"
                    >
                      Snowball
                    </Button>
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">
                      {strategy === 'avalanche' ? '❄️ Avalanche Method' : '⛄ Snowball Method'}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {strategy === 'avalanche' 
                        ? 'Pay minimum on all debts, focus extra payment on highest interest rate debt first. Saves more money on interest.'
                        : 'Pay minimum on all debts, focus extra payment on smallest balance first. Provides psychological wins.'
                      }
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {calculations.summary.payoffTimeYears} years
                  </div>
                  <p className="text-sm text-muted-foreground">Debt-Free Timeline</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.summary.payoffTimeMonths} months
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.summary.totalInterestPaid || 0)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatCurrency(debts.reduce((sum, debt) => sum + debt.balance, 0))}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Debt</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Results */}
            <Tabs defaultValue="timeline" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="timeline">Payment Timeline</TabsTrigger>
                <TabsTrigger value="payoff-order">Payoff Order</TabsTrigger>
                <TabsTrigger value="comparison">Strategy Comparison</TabsTrigger>
              </TabsList>
              
              <TabsContent value="timeline" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      Debt Reduction Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={calculations.timeline}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                        <Tooltip 
                          formatter={(value) => formatCurrency(Number(value))}
                          labelFormatter={(month) => `Month ${month}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="totalBalance" 
                          stroke="#ef4444" 
                          strokeWidth={3}
                          name="Remaining Balance"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payoff-order" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Debt Payoff Sequence</CardTitle>
                    <CardDescription>Order in which debts will be paid off using {strategy} method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {calculations.payoffOrder.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold">{item.debt}</div>
                              <div className="text-sm text-muted-foreground">
                                Month {item.month} ({Math.round(item.month / 12 * 10) / 10} years)
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{formatCurrency(item.totalPaid)}</div>
                            <div className="text-sm text-muted-foreground">Original Balance</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="comparison" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>❄️ Avalanche Method</CardTitle>
                      <CardDescription>Highest interest rate first</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Strategy:</span>
                        <span className="font-semibold">Mathematically Optimal</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Focus:</span>
                        <span className="font-semibold">Save Most Money</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Motivation:</span>
                        <span className="font-semibold">Financial Logic</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best For:</span>
                        <span className="font-semibold">Disciplined Savers</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>⛄ Snowball Method</CardTitle>
                      <CardDescription>Smallest balance first</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Strategy:</span>
                        <span className="font-semibold">Psychological Wins</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Focus:</span>
                        <span className="font-semibold">Quick Victories</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Motivation:</span>
                        <span className="font-semibold">Emotional Boost</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Best For:</span>
                        <span className="font-semibold">Those Needing Motivation</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Impact of Extra Payments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Extra Payment:</span>
                          <span className="font-semibold">{formatCurrency(extraPayment)}/month</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Time Saved:</span>
                          <span className="font-semibold text-success">
                            {Math.round((calculations.summary.timeSavedMonths || 0) / 12 * 10) / 10} years
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Interest Saved:</span>
                          <span className="font-semibold text-success">
                            {formatCurrency((calculations.summary.timeSavedMonths || 0) * (calculations.summary.monthlySavings || 0))}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Monthly Savings:</span>
                          <span className="font-semibold">{formatCurrency(calculations.summary.monthlySavings || 0)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
  );
};

export default DebtPayoffCalculator;