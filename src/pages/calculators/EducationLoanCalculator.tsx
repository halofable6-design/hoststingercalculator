import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AdSlot from '@/components/AdSlot';
import { GraduationCap, Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const EducationLoanCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Education Loan Calculator | EMI Calculator with Moratorium Period",
    description: "Calculate education loan EMI with moratorium period. Plan your higher education financing effectively with our comprehensive education loan calculator.",
    keywords: "education loan calculator, education loan EMI calculator, student loan calculator, education loan interest calculator, moratorium period calculator, higher education loan, student loan EMI, education finance calculator",
    ogTitle: "Education Loan Calculator - Calculate Your Student Loan EMI",
    ogDescription: "Plan your higher education financing with our education loan calculator. Calculate EMI with moratorium period and understand total interest costs.",
    ogUrl: "https://money-math-hub.com/calculators/education-loan",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/education-loan"
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
  const [loanAmount, setLoanAmount] = useState(500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(10);
  const [moratoriumPeriod, setMoratoriumPeriod] = useState(1);

  const calculations = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const moratoriumMonths = moratoriumPeriod * 12;
    const repaymentMonths = loanTerm * 12;
    
    // During moratorium, interest accrues
    const accruedInterest = loanAmount * moratoriumMonths * monthlyRate;
    const principalAfterMoratorium = loanAmount + accruedInterest;
    
    // EMI calculation for repayment period
    const emi = (principalAfterMoratorium * monthlyRate * Math.pow(1 + monthlyRate, repaymentMonths)) / 
                (Math.pow(1 + monthlyRate, repaymentMonths) - 1);
    
    const totalPayment = emi * repaymentMonths;
    const totalInterest = totalPayment - loanAmount;

    const paymentSchedule = [];
    let balance = principalAfterMoratorium;

    // Moratorium period
    for (let i = 1; i <= moratoriumMonths; i++) {
      paymentSchedule.push({
        month: i,
        payment: 0,
        principal: 0,
        interest: balance * monthlyRate,
        balance: balance + (balance * monthlyRate),
        phase: 'Moratorium'
      });
      balance = balance + (balance * monthlyRate);
    }

    // Repayment period
    balance = principalAfterMoratorium;
    for (let i = 1; i <= repaymentMonths; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      paymentSchedule.push({
        month: moratoriumMonths + i,
        payment: Math.round(emi),
        principal: Math.round(principalPayment),
        interest: Math.round(interestPayment),
        balance: Math.round(Math.max(0, balance)),
        phase: 'Repayment'
      });
    }

    return {
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      accruedInterest: Math.round(accruedInterest),
      principalAfterMoratorium: Math.round(principalAfterMoratorium),
      paymentSchedule
    };
  }, [loanAmount, interestRate, loanTerm, moratoriumPeriod]);

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
            <GraduationCap className="h-10 w-10 text-primary" />
            Education Loan Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your education loan EMI with moratorium period. Plan your higher education financing effectively.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Loan Details</CardTitle>
                <CardDescription>Enter your education loan information</CardDescription>
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
                  <Label htmlFor="loanTerm">Repayment Term (Years)</Label>
                  <Select value={loanTerm.toString()} onValueChange={(value) => setLoanTerm(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                      <SelectItem value="15">15 Years</SelectItem>
                      <SelectItem value="20">20 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="moratoriumPeriod">Moratorium Period (Years)</Label>
                  <Select value={moratoriumPeriod.toString()} onValueChange={(value) => setMoratoriumPeriod(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">No Moratorium</SelectItem>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="4">4 Years</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <p className="text-sm text-muted-foreground">Monthly EMI</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    After moratorium period
                  </div>
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
                    {formatCurrency(calculations.accruedInterest)}
                  </div>
                  <p className="text-sm text-muted-foreground">Accrued Interest</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    During moratorium
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Payment Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={calculations.paymentSchedule.filter((_, index) => index % 6 === 0)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                    <Tooltip 
                      formatter={(value) => formatCurrency(Number(value))}
                      labelFormatter={(month) => `Month ${month}`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      name="Outstanding Balance"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="payment" 
                      stroke="#22c55e" 
                      strokeWidth={2}
                      name="Monthly Payment"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Loan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Original Loan Amount:</span>
                      <span className="font-semibold">{formatCurrency(loanAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest During Moratorium:</span>
                      <span className="font-semibold">{formatCurrency(calculations.accruedInterest)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Principal After Moratorium:</span>
                      <span className="font-semibold">{formatCurrency(calculations.principalAfterMoratorium)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly EMI:</span>
                      <span className="font-semibold">{formatCurrency(calculations.emi)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount Payable:</span>
                      <span className="font-semibold">{formatCurrency(calculations.totalPayment)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Interest:</span>
                      <span className="font-semibold">{formatCurrency(calculations.totalInterest)}</span>
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

export default EducationLoanCalculator;