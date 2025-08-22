import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { Building2, Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// SEO Meta Tags
const SEO = {
  title: "Business Loan Calculator | Commercial Loan EMI Calculator India",
  description: "Calculate business loan EMI, interest, and total payments with our free commercial loan calculator. Plan your business financing effectively.",
  keywords: "business loan calculator, commercial loan EMI calculator, business finance calculator, SME loan calculator, business loan interest calculator, commercial loan calculator, business financing calculator",
  ogTitle: "Business Loan Calculator | Calculate Your Commercial Loan Payments",
  ogDescription: "Plan your business growth with our comprehensive business loan calculator. Calculate EMI, compare interest rates, and make informed decisions about your commercial financing.",
  ogUrl: "https://money-math-hub.com/calculators/business-loan-calculator",
  ogType: "website",
  canonical: "https://money-math-hub.com/calculators/business-loan-calculator"
};

const BusinessLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(11);
  const [loanTerm, setLoanTerm] = useState(5);
  const [processingFee, setProcessingFee] = useState(10000);
  const [loanType, setLoanType] = useState('term');

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTerm * 12;
    
    let emi, totalPayment, totalInterest;

    if (loanType === 'term') {
      // Term loan calculation
      emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
            (Math.pow(1 + monthlyRate, months) - 1);
      totalPayment = emi * months;
      totalInterest = totalPayment - loanAmount;
    } else {
      // Working capital loan (interest only payments)
      emi = loanAmount * monthlyRate;
      totalPayment = emi * months + loanAmount; // Interest + Principal at end
      totalInterest = emi * months;
    }

    const totalCost = totalPayment + processingFee;

    const yearlyBreakdown = [];
    let balance = loanAmount;

    for (let year = 1; year <= loanTerm; year++) {
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let month = 1; month <= 12; month++) {
        if (loanType === 'term') {
          const interestPayment = balance * monthlyRate;
          const principalPayment = emi - interestPayment;
          balance -= principalPayment;
          yearInterest += interestPayment;
          yearPrincipal += principalPayment;
        } else {
          yearInterest += emi;
          if (year === loanTerm && month === 12) {
            yearPrincipal = loanAmount;
            balance = 0;
          }
        }
      }

      yearlyBreakdown.push({
        year,
        interest: Math.round(yearInterest),
        principal: Math.round(yearPrincipal),
        balance: Math.round(Math.max(0, balance))
      });
    }

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      totalCost: Math.round(totalCost),
      yearlyBreakdown
    };
  }, [loanAmount, interestRate, loanTerm, processingFee, loanType]);

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
            <Building2 className="h-10 w-10 text-primary" />
            Business Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your business loan EMI for term loans or working capital loans. Plan your business financing effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your business loan information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="loanAmount">Loan Amount (₹)</Label>
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
                  <Label>Loan Type</Label>
                  <Select value={loanType} onValueChange={setLoanType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="term">Term Loan</SelectItem>
                      <SelectItem value="working-capital">Working Capital Loan</SelectItem>
                    </SelectContent>
                  </Select>
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
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.emi)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {loanType === 'term' ? 'Monthly EMI' : 'Monthly Interest'}
                  </p>
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

              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency(calculations.totalCost)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Cost</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Yearly Payment Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={calculations.yearlyBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                    />
                    <Bar dataKey="principal" stackId="a" fill="#22c55e" name="Principal" />
                    <Bar dataKey="interest" stackId="a" fill="#ef4444" name="Interest" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cost Breakdown</CardTitle>
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

export default BusinessLoanCalculator;