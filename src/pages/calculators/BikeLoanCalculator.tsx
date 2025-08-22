import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { Bike, Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// SEO Meta Tags
const SEO = {
  title: "Bike Loan Calculator | Two Wheeler Loan EMI Calculator India",
  description: "Calculate bike loan EMI, interest, and total payments with our free two-wheeler loan calculator. Compare loan options and plan your bike purchase effectively.",
  keywords: "bike loan calculator, two wheeler loan EMI calculator, bike finance calculator, scooter loan calculator, motorcycle loan calculator, vehicle loan calculator, bike loan interest calculator",
  ogTitle: "Bike Loan Calculator | Calculate Your Two Wheeler Loan Payments",
  ogDescription: "Plan your bike purchase with our comprehensive bike loan calculator. Calculate EMI, compare interest rates, and make informed decisions about your two-wheeler financing.",
  ogUrl: "https://money-math-hub.com/calculators/bike-loan-calculator",
  ogType: "website",
  canonical: "https://money-math-hub.com/calculators/bike-loan-calculator"
};

const BikeLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(3);
  const [processingFee, setProcessingFee] = useState(2000);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTerm * 12;
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);
    
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loanAmount;
    const totalCost = totalPayment + processingFee;

    const amortization = [];
    let balance = loanAmount;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      amortization.push({
        month: i,
        emi: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance))
      });
    }

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
      amortization
    };
  }, [loanAmount, interestRate, loanTerm, processingFee]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#22c55e' },
    { name: 'Interest', value: calculations.totalInterest, color: '#ef4444' },
    { name: 'Processing Fee', value: processingFee, color: '#f97316' }
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Bike className="h-10 w-10 text-primary" />
            Bike Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your bike loan EMI, interest payments, and total loan cost. Plan your two-wheeler purchase effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your bike loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Bike Loan Amount (₹)</Label>
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="interestRate">Interest Rate (% per annum)</Label>
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
                  <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                  <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="4">4 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processingFee">Processing Fee (₹)</Label>
                  <Input
                    id="processingFee"
                    type="number"
                    value={processingFee}
                    onChange={(e) => setProcessingFee(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>
              </CardContent>
            </Card>

            <AdSlot type="sidebar" />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.emi)}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.totalInterest)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Interest</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Loan Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {pieData.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: entry.color }}
                      ></div>
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
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
  );
};

export default BikeLoanCalculator;