
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Users, MapPin, MessageSquare, User, Bell, CheckCircle, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Index = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="border-b border-gray-200 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="mr-2 bg-blue-600 rounded-lg p-1.5">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z" fill="white"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold">VoteSmart</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Log In</Link>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-5 py-2">Sign Up</Button>
            <button onClick={toggleDarkMode} className="text-gray-500 p-2 rounded-full">
              {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-blue-500">Welcome to </span>
              <span className="text-purple-500">VoteSmart</span>
            </h1>
            <p className="text-gray-600 text-xl mb-8">
              Make voting easier. Get personalized updates, track legislation, and compare candidates — all in one place.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 rounded-full py-6 px-8 flex items-center">
                Create Account <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 rounded-full py-6 px-8">
                Log In
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/033f8c18-16a0-457d-a97a-4ba2c32c4d12.png" 
              alt="Voting ballot illustration" 
              className="max-w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 md:px-12 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">Everything You Need to Vote Confidently</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            VoteSmart provides the tools and information you need to understand the issues, compare candidates, and make confident choices at the ballot box.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {/* Feature 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Personalized Policy Updates</h3>
            <p className="text-gray-600 mb-6">
              Get updates on legislation and policies that matter most to you, tailored to your interests.
            </p>
            <div className="mt-4">
              <img 
                src="/lovable-uploads/d09a2161-f037-4025-9192-553464432601.png" 
                alt="Policy updates illustration" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="bg-red-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <Users className="text-red-500" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Compare Candidates</h3>
            <p className="text-gray-600 mb-6">
              Side-by-side comparisons of candidates' positions, voting records, and backgrounds.
            </p>
            <div className="mt-4">
              <img 
                src="/lovable-uploads/cad9eb8d-4ccd-4937-88f8-6028e14739ad.png" 
                alt="Compare candidates illustration" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="bg-blue-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <MapPin className="text-white" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Polling Locations Map</h3>
            <p className="text-gray-600 mb-6">
              Find your nearest polling location, check wait times, and get directions.
            </p>
            <div className="mt-4">
              <img 
                src="/lovable-uploads/8c03b22e-8d38-4db6-bb35-be17a2e9e454.png" 
                alt="Polling locations map" 
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="bg-blue-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
              <MessageSquare className="text-blue-600" size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2">Civic Chatbot</h3>
            <p className="text-gray-600 mb-6">
              Get quick, reliable answers to your voting questions on registration, ballot measures, and more—anytime.
            </p>
            <div className="mt-4 flex justify-center">
              <div className="w-full">
                <div className="flex justify-between mb-2">
                  <div className="bg-red-100 text-red-600 rounded-2xl p-2 px-4 text-sm">How do I register to vote?</div>
                </div>
                <div className="flex justify-between mb-2">
                  <div className="bg-blue-100 text-blue-600 rounded-2xl p-2 px-4 text-sm ml-auto">I can help! To register you need to...</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-600 mb-6">How VoteSmart Works</h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto">
            Our platform makes it easy to stay informed and engaged in the democratic process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-center mb-6 relative">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center">
                <User className="text-blue-600" size={28} />
              </div>
              <div className="absolute top-0 right-1/3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Create Your Profile</h3>
            <p className="text-gray-600 text-center">
              Tell us about your interests, location, and preferences to personalize your experience.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-center mb-6 relative">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center">
                <Bell className="text-red-500" size={28} />
              </div>
              <div className="absolute top-0 right-1/3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Get Personalized Updates</h3>
            <p className="text-gray-600 text-center">
              Receive tailored information about candidates, legislation, and elections in your area.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex justify-center mb-6 relative">
              <div className="bg-gray-100 w-24 h-24 rounded-full flex items-center justify-center">
                <CheckCircle className="text-blue-600" size={28} />
              </div>
              <div className="absolute top-0 right-1/3 bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-bold mb-2 text-center">Vote with Confidence</h3>
            <p className="text-gray-600 text-center">
              Make informed decisions at the ballot box based on unbiased, comprehensive information.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 px-6 md:px-12 mb-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl py-16 px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to become an informed voter?</h2>
          <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full py-6 px-8 flex items-center mx-auto">
            Get Started Now <ArrowRight className="ml-2" size={18} />
          </Button>
        </div>
      </section>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6">
        <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 flex items-center justify-center">
          <MessageSquare className="text-white" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default Index;
