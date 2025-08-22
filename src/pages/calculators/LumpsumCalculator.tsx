import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdSlot from '@/components/AdSlot';
import { TrendingUp, BarChart3, Target } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const LumpsumCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Lumpsum Calculator | One-time Investment Calculator",
    description: "Calculate returns on your one-time lumpsum investment. Plan your wealth creation with compound interest and understand investment growth over time.",
    keywords: "lumpsum calculator, one-time investment calculator, lumpsum investment calculator, lumpsum return calculator, lumpsum growth calculator, one-time investment return, lumpsum investment return, wealth creation calculator",
    ogTitle: "Lumpsum Calculator - Calculate One-time Investment Returns",
    ogDescription: "Calculate returns on your one-time lumpsum investment. Plan your wealth creation with compound interest and understand investment growth over time.",
    ogUrl: "https://money-math-hub.com/calculators/lumpsum",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/lumpsum"
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
  const [initialInvestment, setInitialInvestment] = useState(500000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);

  const calculations = useMemo(() => {
    const P = initialInvestment;
    const r = expectedReturn / 100;
    const t = timePeriod;
    
    // Compound Interest Formula: A = P(1 + r)^t
    const futureValue = P * Math.pow(1 + r, t);
    const totalGains = futureValue - P;
    
    // Generate year-wise growth
    const yearlyData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const yearlyFutureValue = P * Math.pow(1 + r, year);
      const yearlyGains = yearlyFutureValue - P;
      
      yearlyData.push({
        year,
        investment: P,
        futureValue: Math.round(yearlyFutureValue),
        gains: Math.round(yearlyGains),
        cumulativeReturn: Math.round(((yearlyFutureValue - P) / P) * 100)
      });
    }
    
    return {
      futureValue: Math.round(futureValue),
      totalGains: Math.round(totalGains),
      absoluteReturn: Math.round(((futureValue - P) / P) * 100),
      annualizedReturn: expectedReturn, // This is the input return rate
      yearlyData
    };
  }, [initialInvestment, expectedReturn, timePeriod]);

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
            <Target className="h-10 w-10 text-primary" />
            Lumpsum Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate returns on your one-time lumpsum investment. Plan your wealth creation with compound interest.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Investment Details</CardTitle>
                <CardDescription>Enter your lumpsum investment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="initialInvestment">Initial Investment (₹)</Label>
                  <Input
                    id="initialInvestment"
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(initialInvestment)}
                  </div>
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
                  <div className="text-sm text-muted-foreground">
                    Compounded annually
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timePeriod">Investment Period (Years)</Label>
                  <Input
                    id="timePeriod"
                    type="number"
                    value={timePeriod}
                    onChange={(e) => setTimePeriod(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {timePeriod * 12} months
                  </div>
                </div>

                {/* Comparison with SIP */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">💡 Lumpsum vs SIP</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Higher returns if invested at market lows</li>
                      <li>• Full exposure to market fluctuations</li>
                      <li>• Requires market timing skills</li>
                      <li>• Best for large available capital</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Key Statistics */}
                <Card className="bg-secondary/5 border-secondary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-secondary mb-2">📊 Quick Stats</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Doubling Time:</span>
                        <span className="font-semibold">{Math.round(72/expectedReturn)} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>10-Year Growth:</span>
                        <span className="font-semibold">{Math.round(((Math.pow(1 + expectedReturn/100, 10) - 1) * 100))}%</span>
                      </div>
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
                    {formatLakhs(calculations.futureValue)}
                  </div>
                  <p className="text-sm text-muted-foreground">Future Value</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(calculations.futureValue)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatLakhs(calculations.totalGains)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Gains</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.absoluteReturn}% absolute return
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {expectedReturn}%
                  </div>
                  <p className="text-sm text-muted-foreground">Annualized Return</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    CAGR over {timePeriod} years
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="space-y-6">
              {/* Area Chart - Wealth Growth */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Investment Growth Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={calculations.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => formatLakhs(value)} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(year) => `Year ${year}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="investment" 
                        stackId="1"
                        stroke="#3b82f6" 
                        fill="#3b82f6"
                        fillOpacity={0.6}
                        name="Initial Investment"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gains" 
                        stackId="1"
                        stroke="#22c55e" 
                        fill="#22c55e"
                        fillOpacity={0.6}
                        name="Gains"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Growth Comparison Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Investment Value Growth
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={calculations.yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis tickFormatter={(value) => formatLakhs(value)} />
                      <Tooltip 
                        formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        labelFormatter={(year) => `Year ${year}`}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="investment" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Initial Investment"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="futureValue" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        name="Future Value"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Year-wise breakdown table */}
              <Card>
                <CardHeader>
                  <CardTitle>Year-wise Growth Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Year</th>
                          <th className="text-right py-2">Future Value</th>
                          <th className="text-right py-2">Total Gains</th>
                          <th className="text-right py-2">Return %</th>
                        </tr>
                      </thead>
                      <tbody>
                        {calculations.yearlyData.map((row) => (
                          <tr key={row.year} className="border-b">
                            <td className="py-2">{row.year}</td>
                            <td className="text-right py-2 font-semibold">{formatCurrency(row.futureValue)}</td>
                            <td className="text-right py-2 text-success">{formatCurrency(row.gains)}</td>
                            <td className="text-right py-2 font-semibold">{row.cumulativeReturn}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Power of Compounding Explanation */}
              <Card>
                <CardHeader>
                  <CardTitle>Understanding Lumpsum Investment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div>
                      <h4 className="font-semibold mb-2 text-primary">Advantages:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Full benefit of market uptrends</li>
                        <li>• Maximum compounding effect</li>
                        <li>• Lower transaction costs</li>
                        <li>• Simple one-time investment</li>
                        <li>• Ideal for long-term goals</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-secondary">Considerations:</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Timing the market is crucial</li>
                        <li>• High volatility exposure</li>
                        <li>• Requires discipline to hold</li>
                        <li>• May underperform in bear markets</li>
                        <li>• Emotional decision-making risk</li>
                      </ul>
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

export default LumpsumCalculator;