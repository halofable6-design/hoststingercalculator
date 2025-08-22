import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { PiggyBank, TrendingUp, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Cell } from 'recharts';

const FDCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Fixed Deposit Calculator | FD Interest Calculator India",
    description: "Calculate Fixed Deposit returns with compound interest and tax implications. Plan your FD investments with our comprehensive FD calculator.",
    keywords: "fixed deposit calculator, fd calculator, fd interest calculator, fixed deposit interest calculator, fd maturity calculator, fd return calculator, fixed deposit return calculator, fd calculator india, fd calculator with tax",
    ogTitle: "Fixed Deposit Calculator - Calculate FD Returns & Interest",
    ogDescription: "Calculate your Fixed Deposit returns with compound interest and tax implications. Plan your FD investments with our comprehensive FD calculator.",
    ogUrl: "https://money-math-hub.com/calculators/fixed-deposit",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/fixed-deposit"
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
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(6.8);
  const [tenure, setTenure] = useState(1);
  const [compoundingFrequency, setCompoundingFrequency] = useState('quarterly');

  const calculations = useMemo(() => {
    const frequencies = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12
    };
    
    const n = frequencies[compoundingFrequency as keyof typeof frequencies];
    const r = rate / 100;
    const t = tenure;
    
    // Compound Interest Formula: A = P(1 + r/n)^(nt)
    const maturityAmount = principal * Math.pow(1 + r / n, n * t);
    const interestEarned = maturityAmount - principal;
    
    // Tax calculation (assuming 30% tax bracket for simplicity)
    const taxOnInterest = interestEarned * 0.1; // 10% TDS
    const postTaxAmount = maturityAmount - taxOnInterest;
    
    // Generate quarterly breakdown for visualization
    const quarterlyData = [];
    const quarters = tenure * 4;
    for (let quarter = 1; quarter <= quarters; quarter++) {
      const timeElapsed = quarter / 4;
      const amount = principal * Math.pow(1 + r / 4, 4 * timeElapsed);
      const interest = amount - principal;
      
      quarterlyData.push({
        quarter,
        principal: principal,
        interest: Math.round(interest),
        total: Math.round(amount)
      });
    }
    
    return {
      maturityAmount: Math.round(maturityAmount),
      interestEarned: Math.round(interestEarned),
      taxOnInterest: Math.round(taxOnInterest),
      postTaxAmount: Math.round(postTaxAmount),
      quarterlyData
    };
  }, [principal, rate, tenure, compoundingFrequency]);

  const pieData = [
    { name: 'Principal', value: principal, color: '#22c55e' },
    { name: 'Interest Earned', value: calculations.interestEarned, color: '#3b82f6' },
    { name: 'Tax Deducted', value: calculations.taxOnInterest, color: '#ef4444' }
  ];

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
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <PiggyBank className="h-10 w-10 text-primary" />
            Fixed Deposit Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate returns on your Fixed Deposit investment with compound interest and tax implications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>FD Details</CardTitle>
                <CardDescription>Enter your fixed deposit information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="principal">Deposit Amount (₹)</Label>
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
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tenure">Tenure (Years)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    step="0.5"
                    value={tenure}
                    onChange={(e) => setTenure(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Compounding Frequency</Label>
                  <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="annually">Annually</SelectItem>
                      <SelectItem value="semiannually">Semi-Annually</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">💡 FD Benefits</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Guaranteed returns</li>
                      <li>• Capital protection</li>
                      <li>• Flexible tenure options</li>
                      <li>• Loan facility available</li>
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
                    {formatCurrency(calculations.maturityAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Maturity Amount</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatCurrency(calculations.interestEarned)}
                  </div>
                  <p className="text-sm text-muted-foreground">Interest Earned</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.postTaxAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Post-Tax Amount</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PiggyBank className="h-5 w-5" />
                    Amount Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <PieChart data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={120}>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </PieChart>
                    </PieChart>
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
                      <div className="w-3 h-3 bg-red-500 rounded"></div>
                      <span>Tax</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bar Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Growth Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculations.quarterlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="principal" fill="#22c55e" name="Principal" />
                      <Bar dataKey="interest" fill="#3b82f6" name="Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Summary Table */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Principal Amount:</span>
                      <span className="font-semibold">{formatCurrency(principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate:</span>
                      <span className="font-semibold">{rate}% p.a.</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tenure:</span>
                      <span className="font-semibold">{tenure} years</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compounding:</span>
                      <span className="font-semibold capitalize">{compoundingFrequency}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Maturity Amount:</span>
                      <span className="font-semibold text-primary">{formatCurrency(calculations.maturityAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Earned:</span>
                      <span className="font-semibold text-success">{formatCurrency(calculations.interestEarned)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>TDS (10%):</span>
                      <span className="font-semibold text-destructive">{formatCurrency(calculations.taxOnInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span>Net Amount:</span>
                      <span className="font-bold text-lg">{formatCurrency(calculations.postTaxAmount)}</span>
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

export default FDCalculator;