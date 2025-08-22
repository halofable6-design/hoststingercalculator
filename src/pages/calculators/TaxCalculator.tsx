import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdSlot from '@/components/AdSlot';
import { Receipt, Calculator, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const TaxCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Tax Calculator | Income Tax Calculator India",
    description: "Calculate your income tax liability under old and new tax regimes. Compare tax slabs and optimize your tax planning.",
    keywords: "tax calculator, income tax calculator, tax calculator india, income tax calculation, tax calculator online, tax calculator with deductions, tax calculator with exemptions, tax calculator with rebates",
    ogTitle: "Tax Calculator - Calculate Income Tax Liability",
    ogDescription: "Calculate your income tax liability under old and new tax regimes. Compare tax slabs and optimize your tax planning.",
    ogUrl: "https://money-math-hub.com/calculators/tax",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/tax"
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
  const [annualIncome, setAnnualIncome] = useState(1200000);
  const [age, setAge] = useState('below60');
  const [regime, setRegime] = useState('new2025');
  const [section80C, setSection80C] = useState(150000);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const taxCalculations = useMemo(() => {
    const income = annualIncome;
    let taxableIncome = income;
    let deductions = 0;

    // Standard deduction based on regime
    let standardDeduction = 50000; // Default for old and new regime
    if (regime === 'new2025') {
      standardDeduction = 75000; // Updated for 2025-26
    }
    
    if (regime === 'old') {
      // Old regime deductions
      deductions = standardDeduction + section80C + otherDeductions;
      taxableIncome = Math.max(0, income - deductions);
    } else {
      // New regime - limited deductions
      deductions = standardDeduction;
      taxableIncome = Math.max(0, income - deductions);
    }

    let tax = 0;
    let cess = 0;
    const taxSlabs = [];

    if (regime === 'new' || regime === 'new2025') {
      // New Tax Regime slabs
      let slabs;
      if (regime === 'new2025') {
        // New Tax Regime 2025-26 (Updated slabs)
        slabs = [
          { min: 0, max: 400000, rate: 0 },
          { min: 400001, max: 800000, rate: 5 },
          { min: 800001, max: 1200000, rate: 10 },
          { min: 1200001, max: 1600000, rate: 15 },
          { min: 1600001, max: 2000000, rate: 20 },
          { min: 2000001, max: 2400000, rate: 25 },
          { min: 2400001, max: Infinity, rate: 30 }
        ];
      } else {
        // New Tax Regime 2023-24
        slabs = [
          { min: 0, max: 300000, rate: 0 },
          { min: 300001, max: 600000, rate: 5 },
          { min: 600001, max: 900000, rate: 10 },
          { min: 900001, max: 1200000, rate: 15 },
          { min: 1200001, max: 1500000, rate: 20 },
          { min: 1500001, max: Infinity, rate: 30 }
        ];
      }

      slabs.forEach(slab => {
        const slabIncome = Math.min(Math.max(0, taxableIncome - slab.min + 1), slab.max - slab.min + 1);
        if (slabIncome > 0) {
          const slabTax = (slabIncome * slab.rate) / 100;
          tax += slabTax;
          
          if (slab.rate > 0) {
            taxSlabs.push({
              range: `₹${(slab.min/100000).toFixed(1)}L - ${slab.max === Infinity ? '∞' : '₹' + (slab.max/100000).toFixed(1) + 'L'}`,
              rate: `${slab.rate}%`,
              taxableAmount: Math.round(slabIncome),
              tax: Math.round(slabTax)
            });
          }
        }
      });
    } else {
      // Old Tax Regime
      const exemptionLimit = age === 'above80' ? 500000 : age === 'above60' ? 300000 : 250000;
      const effectiveTaxableIncome = Math.max(0, taxableIncome - exemptionLimit);
      
      const slabs = [
        { min: 0, max: 250000, rate: 0 },
        { min: 250001, max: 500000, rate: 5 },
        { min: 500001, max: 1000000, rate: 20 },
        { min: 1000001, max: Infinity, rate: 30 }
      ];

      slabs.forEach(slab => {
        const adjustedMin = Math.max(0, slab.min - exemptionLimit);
        const adjustedMax = slab.max === Infinity ? Infinity : slab.max - exemptionLimit;
        const slabIncome = Math.min(Math.max(0, effectiveTaxableIncome - adjustedMin), adjustedMax - adjustedMin);
        
        if (slabIncome > 0) {
          const slabTax = (slabIncome * slab.rate) / 100;
          tax += slabTax;
          
          if (slab.rate > 0) {
            taxSlabs.push({
              range: `₹${(slab.min/100000).toFixed(1)}L - ${slab.max === Infinity ? '∞' : '₹' + (slab.max/100000).toFixed(1) + 'L'}`,
              rate: `${slab.rate}%`,
              taxableAmount: Math.round(slabIncome),
              tax: Math.round(slabTax)
            });
          }
        }
      });
    }

    // Health & Education Cess (4% of income tax)
    cess = tax * 0.04;
    let totalTax = tax + cess;
    
    // Apply Section 87A Rebate for 2025-26 regime
    if (regime === 'new2025' && taxableIncome <= 1200000) {
      totalTax = 0; // Full rebate as per Section 87A
    }
    
    const netIncome = income - totalTax;

    return {
      grossIncome: income,
      totalDeductions: Math.round(deductions),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(tax),
      cess: Math.round(cess),
      totalTax: Math.round(totalTax),
      netIncome: Math.round(netIncome),
      effectiveRate: ((totalTax / income) * 100).toFixed(2),
      taxSlabs
    };
  }, [annualIncome, age, regime, section80C, otherDeductions]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const pieData = [
    { name: 'Net Income', value: taxCalculations.netIncome, color: '#22c55e' },
    { name: 'Income Tax', value: taxCalculations.incomeTax, color: '#ef4444' },
    { name: 'Cess', value: taxCalculations.cess, color: '#f97316' }
  ];

  return (
    <>
      {renderSEOTags()}
      <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-3">
            <Receipt className="h-10 w-10 text-primary" />
            Income Tax Calculator 2024-25
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your income tax liability under both old and new tax regimes. Plan your investments for maximum tax savings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Income Details</CardTitle>
                <CardDescription>Enter your income and deduction information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="annualIncome">Annual Gross Income (₹)</Label>
                  <Input
                    id="annualIncome"
                    type="number"
                    value={annualIncome}
                    onChange={(e) => setAnnualIncome(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Monthly: {formatCurrency(annualIncome / 12)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Age Category</Label>
                  <Select value={age} onValueChange={setAge}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below60">Below 60 years</SelectItem>
                      <SelectItem value="above60">60-80 years (Senior Citizen)</SelectItem>
                      <SelectItem value="above80">Above 80 years (Super Senior)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tax Regime</Label>
                  <Select value={regime} onValueChange={setRegime}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new2025">New Tax Regime 2025-26 (Recommended)</SelectItem>
                      <SelectItem value="new">New Tax Regime 2023-24</SelectItem>
                      <SelectItem value="old">Old Tax Regime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {regime === 'old' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="section80C">Section 80C Deductions (₹)</Label>
                      <Input
                        id="section80C"
                        type="number"
                        value={section80C}
                        onChange={(e) => setSection80C(Number(e.target.value) || 0)}
                        className="text-right"
                      />
                      <div className="text-xs text-muted-foreground">
                        Max limit: ₹1,50,000
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="otherDeductions">Other Deductions (₹)</Label>
                      <Input
                        id="otherDeductions"
                        type="number"
                        value={otherDeductions}
                        onChange={(e) => setOtherDeductions(Number(e.target.value) || 0)}
                        className="text-right"
                      />
                      <div className="text-xs text-muted-foreground">
                        80D, 80G, HRA etc.
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Ad Slot */}
            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tax Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-destructive mb-1">
                    {formatCurrency(taxCalculations.totalTax)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Tax</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {taxCalculations.effectiveRate}% effective rate
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-success mb-1">
                    {formatCurrency(taxCalculations.netIncome)}
                  </div>
                  <p className="text-sm text-muted-foreground">Net Income</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    Monthly: {formatCurrency(taxCalculations.netIncome / 12)}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(taxCalculations.taxableIncome)}
                  </div>
                  <p className="text-sm text-muted-foreground">Taxable Income</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    After deductions
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="breakdown" className="space-y-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="breakdown">Tax Breakdown</TabsTrigger>
                <TabsTrigger value="calculation">Calculation Details</TabsTrigger>
                <TabsTrigger value="visualization">Visualization</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calculator className="h-5 w-5" />
                      Tax Slab Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={taxCalculations.taxSlabs}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="rate" />
                        <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                        <Tooltip
                          formatter={(value, name) => [formatCurrency(Number(value)), name]}
                        />
                        <Bar dataKey="tax" fill="#3b82f6" name="Tax Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calculation" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="h-5 w-5" />
                      Detailed Calculation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm text-muted-foreground">Gross Income</p>
                          <p className="font-semibold">{formatCurrency(taxCalculations.grossIncome)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Deductions</p>
                          <p className="font-semibold text-green-600">{formatCurrency(taxCalculations.totalDeductions)}</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Taxable Income</p>
                        <p className="text-xl font-bold text-primary mb-4">{formatCurrency(taxCalculations.taxableIncome)}</p>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Tax Calculation Breakdown:</h4>
                          {taxCalculations.taxSlabs.map((slab, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                              <div>
                                <span className="font-medium">{slab.range}</span>
                                <span className="text-sm text-muted-foreground ml-2">@ {slab.rate}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{formatCurrency(slab.taxableAmount)}</div>
                                <div className="text-sm text-muted-foreground">Tax: {formatCurrency(slab.tax)}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t mt-4 pt-4 space-y-2">
                          <div className="flex justify-between">
                            <span>Income Tax</span>
                            <span className="font-medium">{formatCurrency(taxCalculations.incomeTax)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Health & Education Cess (4%)</span>
                            <span className="font-medium">{formatCurrency(taxCalculations.cess)}</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span>Total Tax</span>
                            <span className="text-destructive">{formatCurrency(taxCalculations.totalTax)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-sm text-muted-foreground mb-2">Net Income</p>
                        <p className="text-2xl font-bold text-success">{formatCurrency(taxCalculations.netIncome)}</p>
                        <p className="text-sm text-muted-foreground">
                          Monthly: {formatCurrency(taxCalculations.netIncome / 12)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="visualization" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5" />
                      Income Distribution
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
              </TabsContent>
            </Tabs>
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

export default TaxCalculator;