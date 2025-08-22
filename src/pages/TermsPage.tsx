import { Link } from 'react-router-dom';

const TermsPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <p className="text-gray-700 mb-8 leading-relaxed">
          Welcome to WealthWiseCalculator. By accessing or using our website and calculators, you agree to the following Terms of Service. Please read them carefully.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Use of Our Calculators</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our calculators (including tax, EMI, SIP, and others) are provided for informational and educational purposes only.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not guarantee 100% accuracy of results. Calculations may vary depending on inputs, tax rules, or financial policies.
            </p>
            <p className="text-gray-700 leading-relaxed">
              You are responsible for verifying results with official government sources or professional advice before making financial decisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. No Professional Advice</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The content and calculators on this site do not constitute financial, legal, or tax advice.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Always consult with a qualified professional for advice tailored to your situation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              WealthWiseCalculator shall not be held responsible for any loss, damage, or consequences arising from the use of our calculators or website.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Use of our site is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services & Ads</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may display ads (e.g., Google AdSense) or use analytics services. These third parties may use cookies and collect data according to their own privacy policies.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We are not responsible for the content or practices of third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              When using our site, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Not use the calculators for unlawful purposes.</li>
              <li>Not attempt to hack, disrupt, or misuse the website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update these Terms of Service from time to time. The updated version will always be posted on this page with a new "Effective Date."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These Terms are governed by the laws of India. Any disputes will be handled under the jurisdiction of Indian courts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have questions about these Terms, you can contact us at:
            </p>
            <p className="text-blue-600 font-medium">
              📧 halofable6@gmail.com
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-gray-500">
            © {currentYear} WealthWiseCalculator. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;