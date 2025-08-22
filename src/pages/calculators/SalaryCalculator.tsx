import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdSlot from '@/components/AdSlot';
import { Users, TrendingUp, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell } from 'recharts';

const SalaryCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "Salary Calculator | Take Home Salary Calculator India",
    description: "Calculate your take-home salary after tax deductions. Compare old vs new tax regime and plan your finances with our comprehensive salary calculator.",
    keywords: "salary calculator, take home salary calculator, salary calculator india, salary breakup calculator, salary calculator with tax, salary calculator online, salary calculator with pf, salary calculator with hra",
    ogTitle: "Salary Calculator - Calculate Take Home Salary After Tax",
    ogDescription: "Calculate your take-home salary after tax deductions. Compare old vs new tax regime and plan your finances with our comprehensive salary calculator.",
    ogUrl: "https://money-math-hub.com/calculators/salary",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/salary"
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
  const [grossSalary, setGrossSalary] = useState(1200000);
  const [basicPercent, setBasicPercent] = useState(40);
  const [hraPercent, setHraPercent] = useState(50);
  const [taxRegime, setTaxRegime] = useState('new');
  const [pfContribution, setPfContribution] = useState(1800);
  const [professionalTax, setProfessionalTax] = useState(2400);

  const calculations = useMemo(() => {
    const basic = (grossSalary * basicPercent) / 100;
    const hra = (basic * hraPercent) / 100;
    const allowances = grossSalary - basic - hra;
    
    // Annual calculations
    const annualBasic = basic * 12;
    const annualHRA = hra * 12;
    const annualAllowances = allowances * 12;
    const annualGross = grossSalary * 12;
    
    // Deductions
    const annualPF = pfContribution * 12;
    const annualProfTax = professionalTax;
    
    // Standard deduction
    const standardDeduction = taxRegime === 'new' ? 50000 : 50000;
    
    // Taxable income
    const taxableIncome = annualGross - annualPF - standardDeduction;
    
    // Income tax calculation (simplified)
    let incomeTax = 0;
    if (taxRegime === 'new') {
      // New tax regime rates
      if (taxableIncome > 300000) incomeTax += Math.min(taxableIncome - 300000, 300000) * 0.05;
      if (taxableIncome > 600000) incomeTax += Math.min(taxableIncome - 600000, 300000) * 0.10;
      if (taxableIncome > 900000) incomeTax += Math.min(taxableIncome - 900000, 300000) * 0.15;
      if (taxableIncome > 1200000) incomeTax += Math.min(taxableIncome - 1200000, 300000) * 0.20;
      if (taxableIncome > 1500000) incomeTax += (taxableIncome - 1500000) * 0.30;
    } else {
      // Old tax regime rates
      if (taxableIncome > 250000) incomeTax += Math.min(taxableIncome - 250000, 250000) * 0.05;
      if (taxableIncome > 500000) incomeTax += Math.min(taxableIncome - 500000, 500000) * 0.20;
      if (taxableIncome > 1000000) incomeTax += (taxableIncome - 1000000) * 0.30;
    }
    
    // Cess
    const cess = incomeTax * 0.04;
    const totalTax = incomeTax + cess;
    
    // Monthly deductions
    const monthlyTax = totalTax / 12;
    const monthlyPF = pfContribution;
    const monthlyProfTax = professionalTax / 12;
    
    const totalMonthlyDeductions = monthlyTax + monthlyPF + monthlyProfTax;
    const netSalary = grossSalary - totalMonthlyDeductions;
    
    // Annual figures
    const annualNetSalary = netSalary * 12;
    const totalAnnualDeductions = totalTax + annualPF + annualProfTax;
    
    return {
      basic: Math.round(basic),
      hra: Math.round(hra),
      allowances: Math.round(allowances),
      grossSalary: Math.round(grossSalary),
      netSalary: Math.round(netSalary),
      annualGross: Math.round(annualGross),
      annualNetSalary: Math.round(annualNetSalary),
      taxableIncome: Math.round(taxableIncome),
      incomeTax: Math.round(totalTax),
      monthlyTax: Math.round(monthlyTax),
      monthlyPF,
      monthlyProfTax: Math.round(monthlyProfTax),
      totalMonthlyDeductions: Math.round(totalMonthlyDeductions),
      totalAnnualDeductions: Math.round(totalAnnualDeductions),
      takeHomePercent: Math.round((netSalary / grossSalary) * 100)
    };
  }, [grossSalary, basicPercent, hraPercent, taxRegime, pfContribution, professionalTax]);

  const salaryBreakdownData = [
    { name: 'Basic', value: calculations.basic, color: '#22c55e' },
    { name: 'HRA', value: calculations.hra, color: '#3b82f6' },
    { name: 'Allowances', value: calculations.allowances, color: '#f59e0b' }
  ];

  const deductionsData = [
    { name: 'Income Tax', value: calculations.monthlyTax, color: '#ef4444' },
    { name: 'PF', value: calculations.monthlyPF, color: '#8b5cf6' },
    { name: 'Professional Tax', value: calculations.monthlyProfTax, color: '#f97316' }
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
            <Users className="h-10 w-10 text-primary" />
            Salary Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate your take-home salary after tax deductions. Compare old vs new tax regime and plan your finances.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Salary Details</CardTitle>
                <CardDescription>Enter your salary breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="grossSalary">Monthly Gross Salary (₹)</Label>
                  <Input
                    id="grossSalary"
                    type="number"
                    value={grossSalary}
                    onChange={(e) => setGrossSalary(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Annual: {formatCurrency(grossSalary * 12)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="basicPercent">Basic Salary (%)</Label>
                  <Input
                    id="basicPercent"
                    type="number"
                    value={basicPercent}
                    onChange={(e) => setBasicPercent(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Amount: {formatCurrency((grossSalary * basicPercent) / 100)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hraPercent">HRA (% of Basic)</Label>
                  <Input
                    id="hraPercent"
                    type="number"
                    value={hraPercent}
                    onChange={(e) => setHraPercent(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    Amount: {formatCurrency(((grossSalary * basicPercent) / 100 * hraPercent) / 100)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Tax Regime</Label>
                  <Select value={taxRegime} onValueChange={setTaxRegime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax regime" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New Tax Regime</SelectItem>
                      <SelectItem value="old">Old Tax Regime</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pfContribution">Monthly PF Contribution (₹)</Label>
                  <Input
                    id="pfContribution"
                    type="number"
                    value={pfContribution}
                    onChange={(e) => setPfContribution(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="professionalTax">Annual Professional Tax (₹)</Label>
                  <Input
                    id="professionalTax"
                    type="number"
                    value={professionalTax}
                    onChange={(e) => setProfessionalTax(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">💡 Tax Saving Tips</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Invest in ELSS funds</li>
                      <li>• Use HRA exemption</li>
                      <li>• Maximize PF contribution</li>
                      <li>• Compare tax regimes</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <AdSlot type="sidebar" />
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Results */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {formatCurrency(calculations.netSalary)}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Take-home</p>
                  <div className="text-xs text-muted-foreground mt-1">
                    {calculations.takeHomePercent}% of gross
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.annualNetSalary)}
                  </div>
                  <p className="text-sm text-muted-foreground">Annual Take-home</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency(calculations.totalMonthlyDeductions)}
                  </div>
                  <p className="text-sm text-muted-foreground">Monthly Deductions</p>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Breakdown */}
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="breakdown">Salary Breakdown</TabsTrigger>
                <TabsTrigger value="deductions">Deductions</TabsTrigger>
                <TabsTrigger value="charts">Visualizations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Salary Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Basic Salary:</span>
                          <span className="font-semibold">{formatCurrency(calculations.basic)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>HRA:</span>
                          <span className="font-semibold">{formatCurrency(calculations.hra)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Other Allowances:</span>
                          <span className="font-semibold">{formatCurrency(calculations.allowances)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold">
                          <span>Gross Salary:</span>
                          <span>{formatCurrency(calculations.grossSalary)}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Income Tax:</span>
                          <span className="font-semibold text-destructive">{formatCurrency(calculations.monthlyTax)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>PF Contribution:</span>
                          <span className="font-semibold text-destructive">{formatCurrency(calculations.monthlyPF)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Professional Tax:</span>
                          <span className="font-semibold text-destructive">{formatCurrency(calculations.monthlyProfTax)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-bold">
                          <span>Net Salary:</span>
                          <span className="text-success">{formatCurrency(calculations.netSalary)}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="deductions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Tax Calculation Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <h4 className="font-semibold mb-2">Annual Figures</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span>Annual Gross:</span>
                              <span>{formatCurrency(calculations.annualGross)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>PF Deduction:</span>
                              <span>- {formatCurrency(calculations.monthlyPF * 12)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Standard Deduction:</span>
                              <span>- ₹50,000</span>
                            </div>
                            <div className="flex justify-between border-t pt-2 font-semibold">
                              <span>Taxable Income:</span>
                              <span>{formatCurrency(calculations.taxableIncome)}</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Tax Regime: {taxRegime === 'new' ? 'New' : 'Old'}</h4>
                          <div className="space-y-2 text-xs">
                            {taxRegime === 'new' ? (
                              <>
                                <div>₹0 - ₹3L: 0%</div>
                                <div>₹3L - ₹6L: 5%</div>
                                <div>₹6L - ₹9L: 10%</div>
                                <div>₹9L - ₹12L: 15%</div>
                                <div>₹12L - ₹15L: 20%</div>
                                <div>Above ₹15L: 30%</div>
                              </>
                            ) : (
                              <>
                                <div>₹0 - ₹2.5L: 0%</div>
                                <div>₹2.5L - ₹5L: 5%</div>
                                <div>₹5L - ₹10L: 20%</div>
                                <div>Above ₹10L: 30%</div>
                              </>
                            )}
                            <div className="border-t pt-2 font-semibold">
                              <div>Annual Tax: {formatCurrency(calculations.incomeTax)}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="charts" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Salary Breakdown Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <PieChart className="h-5 w-5" />
                        Salary Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <RechartsPieChart>
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <RechartsPieChart data={salaryBreakdownData} cx="50%" cy="50%" innerRadius={60} outerRadius={120}>
                            {salaryBreakdownData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </RechartsPieChart>
                        </RechartsPieChart>
                      </ResponsiveContainer>
                      <div className="flex justify-center gap-4 mt-4 text-xs flex-wrap">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Basic</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span>HRA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-amber-500 rounded"></div>
                          <span>Allowances</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Deductions Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Monthly Deductions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={deductionsData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`} />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Bar dataKey="value" fill="#ef4444" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
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

export default SalaryCalculator;