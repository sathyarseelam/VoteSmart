
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Home, 
  Users, 
  Calendar, 
  FileText, 
  MapPin, 
  BarChart3,
  ArrowRight, 
  TrendingUp, 
  Clock, 
  ThumbsUp, 
  ThumbsDown 
} from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Dashboard = () => {
  const [feedFilter, setFeedFilter] = useState("All");
  const userName = "Alex";
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-gray-200 py-4 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Logo />
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md">
              <Home size={18} />
              <span>Home</span>
            </Link>
            <Link to="/candidates" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <Users size={18} />
              <span>Candidates</span>
            </Link>
            <Link to="/policies" className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
              <FileText size={18} />
              <span>My Policies</span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 p-2 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sun">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
            </button>
            <button className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center">
              <span>A</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-10 px-6 md:py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome back, {userName}!</h1>
          <p className="text-xl mb-6">Here's your personalized feed to help you prepare.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button className="bg-white text-blue-600 hover:bg-gray-100">
              Find My Polling Place
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-blue-700">
              View Sample Ballot
            </Button>
          </div>
        </div>
      </section>

      {/* Election Timeline */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-600">Your Election Timeline</h2>
            {/*
            <Link to="/timeline" className="text-gray-700 flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
            */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-4 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                    Urgent
                  </span>
                  {/*<Calendar size={20} className="text-gray-500" />*/}
                </div>
                <h3 className="text-xl font-bold mb-1">Voter Registration Deadline</h3>
                <p className="text-gray-600 mb-4">For General Election</p>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>Monday, October 21, 2024 (6 days away)</span>
                </div>
                <div className="flex items-center text-red-600">
                  <ArrowRight size={16} className="mr-2" />
                  <span>Action Required</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Card 2 */}
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                    Upcoming
                  </span>
                  {/*<Calendar size={20} className="text-gray-500" />*/}
                </div>
                <h3 className="text-xl font-bold mb-1">General Election</h3>
                <p className="text-gray-600 mb-4">Federal, State and Local</p>
                
                <div className="flex items-center text-gray-600 mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>Tuesday, November 5, 2025 (21 days away)</span>
                </div>
                <div className="flex items-center text-gray-600">
                  {/*<MapPin size={16} className="mr-2" />*/}
                  {/*<span>Central High School, 123 Main St</span>*/}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Personalized Feed */}
      <section className="py-8 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-blue-700">Your Personalized Feed</h2>
            
            <div className="flex space-x-2 bg-white rounded-full p-1 border">
              {["All", "Legislation", "Candidates", "Polls"].map((filter) => (
                <button
                  key={filter}
                  className={`px-4 py-1 rounded-full text-sm ${
                    feedFilter === filter
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setFeedFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feed Item 1 */}
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <FileText size={24} className="text-blue-600" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Legislation
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">Infrastructure Bill H.R. 3684</h3>
                <p className="text-gray-600 mb-4">Recently passed in the House</p>
                <p className="text-gray-700 mb-4">
                  This bill authorizes funds for highways, public transportation, and other infrastructure projects.
                </p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-1">Bias Analysis</p>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 via-gray-300 to-red-400"
                      style={{ width: '100%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Left-leaning</span>
                    <span>Neutral</span>
                    <span>Right-leaning</span>
                  </div>
                </div>
                
                <div className="flex items-center text-yellow-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <span>2 misinformation flags</span>
                </div>
                
                <Button variant="outline" className="w-full">
                  View AI Summary
                </Button>
              </CardContent>
            </Card>
            
            {/* Feed Item 2 */}
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <Users size={24} className="text-blue-600" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Candidates
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">Sarah Johnson vs. Michael Chen</h3>
                <p className="text-gray-600 mb-4">Senate Race Comparison</p>
                
                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <div className="inline-block w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                      <span className="text-blue-600 font-bold">65%</span>
                    </div>
                    <p className="text-gray-700">Johnson</p>
                  </div>
                  <div className="text-center">
                    <div className="inline-block w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-1">
                      <span className="text-gray-600 font-bold">35%</span>
                    </div>
                    <p className="text-gray-700">Chen</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Key Policy Differences</p>
                  <p className="text-gray-700">Healthcare, Climate Change, Education</p>
                </div>
                
                <div className="flex items-center text-gray-700 mb-4">
                  <TrendingUp size={16} className="mr-2 text-blue-600" />
                  <span>Johnson leading in recent polls</span>
                </div>
                
                <Button variant="outline" className="w-full">
                  Compare Candidates
                </Button>
              </CardContent>
            </Card>
            
            {/* Feed Item 3 */}
            <Card className="border rounded-lg overflow-hidden">
              <CardContent className="p-6">
                <div className="flex justify-between mb-4">
                  <div className="bg-blue-100 rounded-lg p-3">
                    <BarChart3 size={24} className="text-blue-600" />
                  </div>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                    Polls
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-1">Downtown Polling Station</h3>
                <p className="text-gray-600 mb-4">Live Turnout Data</p>
                
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-3xl font-bold">42%</p>
                    <p className="text-gray-600 text-sm">Current Turnout</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-bold">+12%</p>
                    <p className="text-gray-600 text-sm">vs. Last Election</p>
                  </div>
                </div>
                
                <div className="mb-2">
                  <p className="text-sm text-gray-600 mb-1">Wait Time</p>
                  <p className="text-gray-700">Approximately 15 minutes</p>
                </div>
                
                <div className="flex items-center text-gray-700 mb-4">
                  <Clock size={16} className="mr-2" />
                  <span>Busiest between 5-7pm</span>
                </div>
                
                <Button variant="outline" className="w-full">
                  View Live Map
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" className="flex items-center">
              Load More <ArrowRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-red-500 mb-6">Quick Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border rounded-lg hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>
                <h3 className="font-medium">Verify Registration</h3>
              </CardContent>
            </Card>
            
            <Card className="border rounded-lg hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-red-500">
                  <MapPin size={24} />
                </div>
                <h3 className="font-medium">Find Polling Place</h3>
              </CardContent>
            </Card>
            
            <Card className="border rounded-lg hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-blue-600">
                  <Users size={24} />
                </div>
                <h3 className="font-medium">Compare Candidates</h3>
              </CardContent>
            </Card>
            
            <Card className="border rounded-lg hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="mb-4 text-blue-400">
                  <FileText size={24} />
                </div>
                <h3 className="font-medium">View Sample Ballot</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* Chat/Help Button */}
      <div className="fixed bottom-4 right-4">
        <Button className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;