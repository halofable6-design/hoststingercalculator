import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AdSlot from '@/components/AdSlot';
import { Target, TrendingUp, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const SIPCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "SIP Calculator | Systematic Investment Plan Calculator India",
    description: "Calculate SIP returns and plan your investments. Estimate your mutual fund SIP returns with our comprehensive calculator.",
    keywords: "sip calculator, systematic investment plan calculator, sip calculator india, sip return calculator, sip calculator mutual fund, sip calculator online, sip calculator with inflation, sip calculator with tax",
    ogTitle: "SIP Calculator - Calculate Systematic Investment Plan Returns",
    ogDescription: "Calculate SIP returns and plan your investments. Estimate your mutual fund SIP returns with our comprehensive calculator.",
    ogUrl: "https://money-math-hub.com/calculators/sip",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/sip"
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
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  const calculations = useMemo(() => {
    const P = monthlyInvestment;
    const r = expectedReturn / 100 / 12;
    const n = timePeriod * 12;
    
    // SIP Future Value Formula: P * [((1+r)^n - 1) / r] * (1+r)
    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const totalGains = futureValue - totalInvestment;
    
    // Generate year-wise growth
    const yearlyData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const months = year * 12;
      const yearlyFutureValue = P * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      const yearlyInvestment = P * months;
      const yearlyGains = yearlyFutureValue - yearlyInvestment;
      
      yearlyData.push({
        year,
        investment: Math.round(yearlyInvestment),
        futureValue: Math.round(yearlyFutureValue),
        gains: Math.round(yearlyGains)
      });
    }
    
    return {
      futureValue: Math.round(futureValue),
      totalInvestment: Math.round(totalInvestment),
      totalGains: Math.round(totalGains),
      yearlyData
    };
  }, [monthlyInvestment, expectedReturn, timePeriod]);

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
            SIP Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate returns on your Systematic Investment Plan (SIP). Plan your long-term wealth creation journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>SIP Details</CardTitle>
                <CardDescription>Enter your investment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="monthlyInvestment">Monthly Investment (₹)</Label>
                  <Input
                    id="monthlyInvestment"
                    type="number"
                    value={monthlyInvestment}
                    onChange={(e) => setMonthlyInvestment(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Annual: {formatCurrency(monthlyInvestment * 12)}
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
                    Monthly: {(expectedReturn / 12).toFixed(2)}%
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

                {/* Key Insights */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">💡 SIP Benefits</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Rupee cost averaging</li>
                      <li>• Power of compounding</li>
                      <li>• Disciplined investing</li>
                      <li>• Lower risk through averaging</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            {/* Ad Slot */}
            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* SIP Results */}
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
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatLakhs(calculations.totalInvestment)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Investment</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatCurrency(calculations.totalInvestment)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatLakhs(calculations.totalGains)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Returns</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {((calculations.totalGains / calculations.totalInvestment) * 100).toFixed(1)}% gain
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
                    Wealth Growth Over Time
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
                        name="Investment"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gains" 
                        stackId="1"
                        stroke="#22c55e" 
                        fill="#22c55e"
                        fillOpacity={0.6}
                        name="Returns"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Investment vs Returns Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Investment vs Returns
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
                        strokeWidth={3}
                        name="Total Investment"
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
            </div>
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

export default SIPCalculator;