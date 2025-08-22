import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import AdSlot from '@/components/AdSlot';
import { BookOpen, Search, Calendar, ArrowRight } from 'lucide-react';
import sipInvestmentImage from '@/assets/blog-sip-investment.jpg';
import homeLoanEmiImage from '@/assets/blog-home-loan-emi.jpg';
import taxPlanningImage from '@/assets/blog-tax-planning.jpg';
import emergencyFundImage from '@/assets/blog-emergency-fund.jpg';
import compoundInterestImage from '@/assets/blog-compound-interest.jpg';
import carLoanComparisonImage from '@/assets/blog-car-loan-comparison.jpg';

const BlogPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Investment', 'Loans', 'Tax Planning', 'Personal Finance', 'Insurance'];

  const blogPosts = [
    {
      id: 1,
      title: 'Complete Guide to SIP Investment in 2024',
      excerpt: 'Learn everything about Systematic Investment Plans, their benefits, and how to choose the right SIP for your financial goals.',
      category: 'Investment',
      readTime: '8 min read',
      date: '2024-01-15',
      slug: 'complete-guide-sip-investment-2024',
      image: sipInvestmentImage
    },
    {
      id: 2,
      title: 'Home Loan EMI Calculation: Tips to Reduce Interest Burden',
      excerpt: 'Discover proven strategies to minimize your home loan EMI and save thousands in interest payments over the loan tenure.',
      category: 'Loans',
      readTime: '6 min read',
      date: '2024-01-12',
      slug: 'home-loan-emi-tips-reduce-interest',
      image: homeLoanEmiImage
    },
    {
      id: 3,
      title: 'Income Tax Planning: Maximize Your Savings Under Section 80C',
      excerpt: 'Comprehensive guide to tax-saving investments under Section 80C and how to optimize your tax liability legally.',
      category: 'Tax Planning',
      readTime: '10 min read',
      date: '2024-01-10',
      slug: 'income-tax-planning-section-80c',
      image: taxPlanningImage
    },
    {
      id: 4,
      title: 'Emergency Fund Calculator: How Much Should You Save?',
      excerpt: 'Learn to calculate the ideal emergency fund size based on your monthly expenses and financial obligations.',
      category: 'Personal Finance',
      readTime: '5 min read',
      date: '2024-01-08',
      slug: 'emergency-fund-calculator-guide',
      image: emergencyFundImage
    },
    {
      id: 5,
      title: 'Compound Interest: The Eighth Wonder of the World',
      excerpt: 'Understanding how compound interest works and why Einstein called it the most powerful force in the universe.',
      category: 'Investment',
      readTime: '7 min read',
      date: '2024-01-05',
      slug: 'compound-interest-eighth-wonder',
      image: compoundInterestImage
    },
    {
      id: 6,
      title: 'Car Loan vs Personal Loan: Which is Better for Vehicle Purchase?',
      excerpt: 'Compare car loans and personal loans to make an informed decision for your vehicle financing needs.',
      category: 'Loans',
      readTime: '6 min read',
      date: '2024-01-03',
      slug: 'car-loan-vs-personal-loan-comparison',
      image: carLoanComparisonImage
    },
    {
      id: 7,
      title: 'Retirement Planning in Your 30s: A Complete Guide',
      excerpt: 'Start your retirement planning early with our comprehensive guide for 30-somethings. Secure your future today.',
      category: 'Investment',
      readTime: '12 min read',
      date: '2024-01-20',
      slug: 'retirement-planning-guide-30s',
      image: sipInvestmentImage
    },
    {
      id: 8,
      title: 'Understanding GST: Impact on Personal Finances',
      excerpt: 'Learn how GST affects your personal finances and discover strategies to optimize your tax planning.',
      category: 'Tax Planning',
      readTime: '9 min read',
      date: '2024-01-18',
      slug: 'gst-impact-personal-finances',
      image: taxPlanningImage
    },
    {
      id: 9,
      title: 'Fixed Deposits vs Mutual Funds: Where to Invest?',
      excerpt: 'Compare traditional FDs with mutual funds to make informed investment decisions based on your risk profile.',
      category: 'Investment',
      readTime: '8 min read',
      date: '2024-01-16',
      slug: 'fd-vs-mutual-funds-comparison',
      image: compoundInterestImage
    },
    {
      id: 10,
      title: 'Building Credit Score: Essential Tips for Indians',
      excerpt: 'Practical strategies to build and maintain a healthy credit score for better loan approvals and interest rates.',
      category: 'Personal Finance',
      readTime: '7 min read',
      date: '2024-01-14',
      slug: 'building-credit-score-tips',
      image: emergencyFundImage
    }
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            Financial Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert articles, guides, and tips to help you make smarter financial decisions and grow your wealth.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Ad Slot */}
        <div className="flex justify-center mb-12">
          <AdSlot type="banner" />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredPosts.map((post, index) => (
            <Link key={post.id} to={`/blog/${post.slug}`}>
              <Card className="h-full hover:shadow-hover transition-all duration-300 group animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-video bg-muted rounded-t-lg mb-4 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}

        {/* Ad Slot */}
        <div className="flex justify-center">
          <AdSlot type="inline" />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;