import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdSlot from '@/components/AdSlot';
import { TrendingUp, BarChart3, Calculator } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const SimpleInterestCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Simple Interest Calculator | Simple Interest Calculator India",
    description: "Calculate simple interest on your investments or loans. Perfect for fixed deposits, bonds, and straightforward lending scenarios.",
    keywords: "simple interest calculator, simple interest calculator india, simple interest calculation, simple interest formula, simple interest calculator online, simple interest calculator with time, simple interest calculator with principal, simple interest calculator with rate",
    ogTitle: "Simple Interest Calculator - Calculate Simple Interest",
    ogDescription: "Calculate simple interest on your investments or loans. Perfect for fixed deposits, bonds, and straightforward lending scenarios.",
    ogUrl: "https://money-math-hub.com/calculators/simple-interest",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/simple-interest"
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
  const [rate, setRate] = useState(8);
  const [time, setTime] = useState(5);

  const calculations = useMemo(() => {
    const simpleInterest = (principal * rate * time) / 100;
    const totalAmount = principal + simpleInterest;
    
    // Generate year-wise breakdown
    const yearlyData = [];
    for (let year = 1; year <= time; year++) {
      const yearlyInterest = (principal * rate) / 100;
      const cumulativeInterest = yearlyInterest * year;
      const totalValue = principal + cumulativeInterest;
      
      yearlyData.push({
        year,
        principal: principal,
        interest: Math.round(cumulativeInterest),
        total: Math.round(totalValue),
        yearlyInterest: Math.round(yearlyInterest)
      });
    }
    
    return {
      simpleInterest: Math.round(simpleInterest),
      totalAmount: Math.round(totalAmount),
      monthlyInterest: Math.round(simpleInterest / 12 / time),
      yearlyData
    };
  }, [principal, rate, time]);

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
            <Calculator className="h-10 w-10 text-primary" />
            Simple Interest Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate simple interest on your investments or loans. Perfect for fixed deposits, bonds, and straightforward lending scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>Enter your simple interest calculation details</CardDescription>
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
                  <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {rate}% per annum
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="time">Time Period (Years)</Label>
                  <Input
                    id="time"
                    type="number"
                    value={time}
                    onChange={(e) => setTime(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {time * 12} months
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">📊 Simple Interest Formula</h4>
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">SI = P × R × T / 100</p>
                      <p>Where:</p>
                      <ul className="list-disc list-inside space-y-1 mt-1">
                        <li>P = Principal Amount</li>
                        <li>R = Rate of Interest</li>
                        <li>T = Time Period</li>
                      </ul>
                    </div>
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
                    {formatCurrency(calculations.simpleInterest)}
                  </div>
                  <p className="text-sm text-muted-foreground">Simple Interest</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.totalAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Maturity Amount</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency((principal * rate) / 100)}
                  </div>
                  <p className="text-sm text-muted-foreground">Yearly Interest</p>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Bar Chart - Year wise breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Year-wise Interest Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={calculations.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="principal" fill="#22c55e" name="Principal" />
                      <Bar dataKey="interest" fill="#3b82f6" name="Interest" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Line Chart - Growth over time */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Investment Growth Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculations.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line 
                        type="monotone" 
                        dataKey="total" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        name="Total Amount"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="principal" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Principal"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Comparison Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Year-wise Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Year</th>
                          <th className="text-right py-2">Yearly Interest</th>
                          <th className="text-right py-2">Total Interest</th>
                          <th className="text-right py-2">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.yearlyData.map((row) => (
                          <tr key={row.year} className="border-b">
                            <td className="py-2">{row.year}</td>
                            <td className="text-right py-2">{formatCurrency(row.yearlyInterest)}</td>
                            <td className="text-right py-2">{formatCurrency(row.interest)}</td>
                            <td className="text-right py-2 font-semibold">{formatCurrency(row.total)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default SimpleInterestCalculator;