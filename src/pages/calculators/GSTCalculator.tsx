import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdSlot from '@/components/AdSlot';
import { Receipt, Calculator, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Cell } from 'recharts';

const GSTCalculator = () => {
  // SEO metadata
  const SEO = {
    title: "GST Calculator | Goods and Services Tax Calculator India",
    description: "Calculate GST (Goods and Services Tax) for your business transactions. Supports both inclusive and exclusive GST calculations with CGST, SGST, and IGST breakdown.",
    keywords: "gst calculator, goods and services tax calculator, gst calculator india, gst calculation, cgst calculator, sgst calculator, igst calculator, gst inclusive calculator, gst exclusive calculator, gst tax calculator",
    ogTitle: "GST Calculator - Calculate GST for Business Transactions",
    ogDescription: "Calculate GST (Goods and Services Tax) for your business transactions. Supports both inclusive and exclusive GST calculations with detailed breakdown.",
    ogUrl: "https://money-math-hub.com/calculators/gst",
    ogType: "website",
    canonical: "https://money-math-hub.com/calculators/gst"
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
  const [amount, setAmount] = useState(10000);
  const [gstRate, setGstRate] = useState(18);
  const [calculationType, setCalculationType] = useState('exclusive'); // exclusive or inclusive

  const calculations = useMemo(() => {
    let baseAmount: number;
    let gstAmount: number;
    let totalAmount: number;

    if (calculationType === 'exclusive') {
      // GST is added to the base amount
      baseAmount = amount;
      gstAmount = (amount * gstRate) / 100;
      totalAmount = amount + gstAmount;
    } else {
      // GST is included in the total amount
      totalAmount = amount;
      baseAmount = (amount * 100) / (100 + gstRate);
      gstAmount = totalAmount - baseAmount;
    }

    // CGST and SGST calculation (for intra-state transactions)
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    
    // IGST calculation (for inter-state transactions)
    const igst = gstAmount;

    return {
      baseAmount: Math.round(baseAmount * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalAmount: Math.round(totalAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100
    };
  }, [amount, gstRate, calculationType]);

  const pieData = [
    { name: 'Base Amount', value: calculations.baseAmount, color: '#22c55e' },
    { name: 'GST Amount', value: calculations.gstAmount, color: '#3b82f6' }
  ];

  const gstBreakdownData = [
    { name: 'CGST', value: calculations.cgst, color: '#22c55e' },
    { name: 'SGST', value: calculations.sgst, color: '#3b82f6' },
    { name: 'IGST', value: calculations.igst, color: '#f59e0b' }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const gstRates = [
    { value: '0', label: '0% - Essential goods' },
    { value: '5', label: '5% - Daily necessities' },
    { value: '12', label: '12% - Standard goods' },
    { value: '18', label: '18% - Most goods & services' },
    { value: '28', label: '28% - Luxury goods' }
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
            GST Calculator
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Calculate GST (Goods and Services Tax) for your business transactions. Supports both inclusive and exclusive GST calculations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>GST Calculation</CardTitle>
                <CardDescription>Enter your transaction details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Calculation Type</Label>
                  <Select value={calculationType} onValueChange={setCalculationType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select calculation type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exclusive">GST Exclusive (Add GST)</SelectItem>
                      <SelectItem value="inclusive">GST Inclusive (Remove GST)</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    {calculationType === 'exclusive' 
                      ? 'GST will be added to the amount' 
                      : 'GST is included in the amount'
                    }
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">
                    {calculationType === 'exclusive' ? 'Base Amount (₹)' : 'Total Amount (₹)'}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value) || 0)}
                    className="text-right"
                  />
                  <div className="text-sm text-muted-foreground">
                    {formatCurrency(amount)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>GST Rate (%)</Label>
                  <Select value={gstRate.toString()} onValueChange={(value) => setGstRate(Number(value))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select GST rate" />
                    </SelectTrigger>
                    <SelectContent>
                      {gstRates.map((rate) => (
                        <SelectItem key={rate.value} value={rate.value}>
                          {rate.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="text-sm text-muted-foreground">
                    Current rate: {gstRate}%
                  </div>
                </div>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4">
                    <h4 className="font-semibold text-primary mb-2">📋 GST Info</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• CGST: Central GST</li>
                      <li>• SGST: State GST</li>
                      <li>• IGST: Integrated GST</li>
                      <li>• Use IGST for inter-state</li>
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
                    {formatCurrency(calculations.baseAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Base Amount</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-secondary mb-1">
                    {formatCurrency(calculations.gstAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">GST Amount</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency(calculations.totalAmount)}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                </CardContent>
              </Card>
            </div>

            {/* GST Breakdown Tabs */}
            <Tabs defaultValue="breakdown" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="breakdown">GST Breakdown</TabsTrigger>
                <TabsTrigger value="visualization">Charts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="breakdown" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Intra-State Transaction */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Intra-State Transaction</CardTitle>
                      <CardDescription>Within same state (CGST + SGST)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Base Amount:</span>
                        <span className="font-semibold">{formatCurrency(calculations.baseAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CGST ({gstRate/2}%):</span>
                        <span className="font-semibold">{formatCurrency(calculations.cgst)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SGST ({gstRate/2}%):</span>
                        <span className="font-semibold">{formatCurrency(calculations.sgst)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{formatCurrency(calculations.totalAmount)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Inter-State Transaction */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Inter-State Transaction</CardTitle>
                      <CardDescription>Between different states (IGST)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Base Amount:</span>
                        <span className="font-semibold">{formatCurrency(calculations.baseAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IGST ({gstRate}%):</span>
                        <span className="font-semibold">{formatCurrency(calculations.igst)}</span>
                      </div>
                      <hr />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>{formatCurrency(calculations.totalAmount)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="visualization" className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Amount Breakdown Pie Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calculator className="h-5 w-5" />
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
                      <div className="flex justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-sm">Base Amount</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded"></div>
                          <span className="text-sm">GST Amount</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* GST Components */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        GST Components
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={[
                          { name: 'CGST', amount: calculations.cgst },
                          { name: 'SGST', amount: calculations.sgst },
                          { name: 'IGST', amount: calculations.igst }
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `₹${value}`} />
                          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                          <Bar dataKey="amount" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>

            {/* Invoice Template */}
            <Card>
              <CardHeader>
                <CardTitle>Sample Invoice Format</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-lg font-mono text-sm">
                  <div className="border-b pb-2 mb-2 font-bold">INVOICE</div>
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>Description</span>
                      <span>Amount</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Goods/Services</span>
                      <span>{formatCurrency(calculations.baseAmount)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>CGST @ {gstRate/2}%</span>
                      <span>{formatCurrency(calculations.cgst)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>SGST @ {gstRate/2}%</span>
                      <span>{formatCurrency(calculations.sgst)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>TOTAL</span>
                      <span>{formatCurrency(calculations.totalAmount)}</span>
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

export default GSTCalculator;