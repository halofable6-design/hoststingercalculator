import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Index from "./pages/Index";
import CalculatorsPage from "./pages/CalculatorsPage";
import ScrollToTop from "./components/ScrollToTop";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import EMICalculator from "./pages/calculators/EMICalculator";
import SIPCalculator from "./pages/calculators/SIPCalculator";
import CompoundInterestCalculator from "./pages/calculators/CompoundInterestCalculator";
import TaxCalculator from "./pages/calculators/TaxCalculator";
import BudgetCalculator from "./pages/calculators/BudgetCalculator";
import RetirementCalculator from "./pages/calculators/RetirementCalculator";
import HomeLoanCalculator from "./pages/calculators/HomeLoanCalculator";
import CarLoanCalculator from "./pages/calculators/CarLoanCalculator";
import PersonalLoanCalculator from "./pages/calculators/PersonalLoanCalculator";
import SimpleInterestCalculator from "./pages/calculators/SimpleInterestCalculator";
import FDCalculator from "./pages/calculators/FDCalculator";
import GSTCalculator from "./pages/calculators/GSTCalculator";
import SalaryCalculator from "./pages/calculators/SalaryCalculator";
import LumpsumCalculator from "./pages/calculators/LumpsumCalculator";
import DebtPayoffCalculator from "./pages/calculators/DebtPayoffCalculator";
import EmergencyFundCalculator from "./pages/calculators/EmergencyFundCalculator";
import BikeLoanCalculator from "./pages/calculators/BikeLoanCalculator";
import EducationLoanCalculator from "./pages/calculators/EducationLoanCalculator";
import BusinessLoanCalculator from "./pages/calculators/BusinessLoanCalculator";
import SavingsGoalCalculator from "./pages/calculators/SavingsGoalCalculator";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="calculators" element={<CalculatorsPage />} />
            <Route path="calculators/emi-calculator" element={<EMICalculator />} />
            <Route path="calculators/sip-calculator" element={<SIPCalculator />} />
            <Route path="calculators/compound-interest-calculator" element={<CompoundInterestCalculator />} />
            <Route path="calculators/income-tax-calculator" element={<TaxCalculator />} />
            <Route path="calculators/budget-planner-calculator" element={<BudgetCalculator />} />
            <Route path="calculators/retirement-calculator" element={<RetirementCalculator />} />
            <Route path="calculators/home-loan-calculator" element={<HomeLoanCalculator />} />
            <Route path="calculators/car-loan-calculator" element={<CarLoanCalculator />} />
            <Route path="calculators/personal-loan-calculator" element={<PersonalLoanCalculator />} />
            <Route path="calculators/simple-interest-calculator" element={<SimpleInterestCalculator />} />
            <Route path="calculators/fd-calculator" element={<FDCalculator />} />
            <Route path="calculators/gst-calculator" element={<GSTCalculator />} />
            <Route path="calculators/salary-calculator" element={<SalaryCalculator />} />
            <Route path="calculators/lumpsum-calculator" element={<LumpsumCalculator />} />
            <Route path="calculators/debt-payoff-calculator" element={<DebtPayoffCalculator />} />
            <Route path="calculators/emergency-fund-calculator" element={<EmergencyFundCalculator />} />
            <Route path="calculators/bike-loan-calculator" element={<BikeLoanCalculator />} />
            <Route path="calculators/education-loan-calculator" element={<EducationLoanCalculator />} />
            <Route path="calculators/business-loan-calculator" element={<BusinessLoanCalculator />} />
            <Route path="calculators/savings-goal-calculator" element={<SavingsGoalCalculator />} />
            <Route path="blog" element={<BlogPage />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="privacy" element={<PrivacyPage />} />
            <Route path="terms" element={<TermsPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
