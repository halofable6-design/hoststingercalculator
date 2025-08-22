import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AdSlot from '@/components/AdSlot';
import { ArrowLeft, Calendar, Clock, Share2, BookOpen } from 'lucide-react';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Sample blog post data - in real app, this would come from API/CMS
  const post = {
    title: 'Complete Guide to SIP Investment in 2024',
    content: `
      <h2>What is SIP Investment?</h2>
      <p>Systematic Investment Plan (SIP) is a method of investing in mutual funds where you invest a fixed amount at regular intervals. This disciplined approach to investing helps you build wealth over time through the power of compounding and rupee cost averaging.</p>

      <h3>Benefits of SIP Investment</h3>
      <ul>
        <li><strong>Rupee Cost Averaging:</strong> When markets are high, you buy fewer units, and when markets are low, you buy more units.</li>
        <li><strong>Power of Compounding:</strong> Your returns generate returns, leading to exponential growth over time.</li>
        <li><strong>Disciplined Investing:</strong> Regular investments help build a disciplined investment habit.</li>
        <li><strong>Flexibility:</strong> You can start with as little as ₹500 per month and increase gradually.</li>
      </ul>

      <h3>How to Choose the Right SIP</h3>
      <p>Selecting the right SIP depends on various factors:</p>
      <ol>
        <li><strong>Investment Goal:</strong> Define whether you're investing for retirement, child's education, or wealth creation.</li>
        <li><strong>Risk Appetite:</strong> Choose equity funds for high growth potential or debt funds for stability.</li>
        <li><strong>Investment Horizon:</strong> Longer investment periods generally yield better results in equity funds.</li>
        <li><strong>Fund Performance:</strong> Research the fund's past performance and fund manager's track record.</li>
      </ol>

      <h3>SIP vs Lump Sum Investment</h3>
      <p>While lump sum investments can potentially generate higher returns in a rising market, SIPs offer better risk management and are ideal for regular income earners. The key advantage of SIP is that it removes the need to time the market.</p>

      <h3>Tax Benefits of SIP</h3>
      <p>SIP investments in ELSS (Equity Linked Savings Scheme) mutual funds offer tax deduction under Section 80C of the Income Tax Act, up to ₹1.5 lakhs per financial year. These investments have a lock-in period of 3 years.</p>

      <h3>Getting Started with SIP</h3>
      <p>To start your SIP journey:</p>
      <ol>
        <li>Complete your KYC (Know Your Customer) process</li>
        <li>Choose the right mutual fund based on your goals</li>
        <li>Set up an automated SIP instruction</li>
        <li>Monitor and review your investments annually</li>
      </ol>

      <p>Remember, the key to successful SIP investing is to stay invested for the long term and not to stop SIPs during market volatility. Use our SIP Calculator to estimate potential returns based on different investment amounts and time periods.</p>
    `,
    category: 'Investment',
    readTime: '8 min read',
    date: '2024-01-15',
    author: 'Financial Expert Team'
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button asChild variant="outline" className="mb-6">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          {/* Article Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
              <div className="flex items-center text-muted-foreground text-sm">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-muted-foreground text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              By {post.author}
            </p>

            <Button variant="outline" className="mb-6">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
          </div>

          {/* Ad Slot */}
          <div className="flex justify-center mb-8">
            <AdSlot type="banner" />
          </div>

          {/* Article Content */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </CardContent>
          </Card>

          {/* Ad Slot */}
          <div className="flex justify-center mb-8">
            <AdSlot type="inline" />
          </div>

          {/* Related Articles */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/blog/home-loan-emi-tips-reduce-interest" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <h4 className="font-semibold mb-2">Home Loan EMI Tips</h4>
                  <p className="text-sm text-muted-foreground">Strategies to reduce your home loan interest burden</p>
                </Link>
                <Link to="/blog/compound-interest-eighth-wonder" className="p-4 rounded-lg border hover:bg-muted transition-colors">
                  <h4 className="font-semibold mb-2">Power of Compound Interest</h4>
                  <p className="text-sm text-muted-foreground">Why compound interest is the eighth wonder of the world</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;