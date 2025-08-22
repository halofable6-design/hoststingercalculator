import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <p className="text-gray-700 mb-8 leading-relaxed">
          We respect your privacy. This Privacy Policy explains how we handle your information when you use our website and calculators.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Calculator Inputs</h3>
              <p className="text-gray-700 leading-relaxed">
                Any data you enter (such as income, tax details, loan amounts, etc.) is processed only in your browser and is not stored or shared by us.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Cookies</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may use cookies through third-party services like Google Analytics and Google AdSense to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Understand site traffic and usage.</li>
                <li>Display personalized or non-personalized ads.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>To improve our website and user experience.</li>
              <li>To display ads and measure their effectiveness.</li>
              <li>To analyze website traffic and trends.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Third-Party Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use trusted third-party services:
            </p>
            
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Google Analytics</h3>
              <p className="text-gray-700 leading-relaxed">
                Helps us understand how visitors use the site.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Google AdSense</h3>
              <p className="text-gray-700 leading-relaxed">
                Displays ads and may use cookies to serve relevant ads.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              These third parties may collect data in line with their own privacy policies.
            </p>
            
            <div className="space-y-2">
              <Link 
                to="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Privacy & Terms
              </Link>
              <br />
              <Link 
                to="https://support.google.com/analytics/answer/6004245" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                How Google uses information from sites
              </Link>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Cookies & Your Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cookies are small files stored in your browser to improve your experience.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              You can disable cookies in your browser settings at any time.
            </p>
            <p className="text-gray-700 leading-relaxed">
              If you disable cookies, some features (like personalized ads) may not work as intended.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              Since we don't collect or store calculator inputs, your data remains private to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our site is not intended for children under 13. We do not knowingly collect data from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Updates to This Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Effective Date."
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="text-blue-600 font-medium">
              halofable6@gmail.com
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

export default PrivacyPage;