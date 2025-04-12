import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";

const CompletionStep = () => {
  return (
    <div className="text-center border border-blue-200 rounded-3xl p-10">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="text-blue-600" size={30} />
      </div>
      
      <h2 className="text-3xl font-bold mb-4 text-purple-600">You're all set!</h2>
      <p className="text-gray-600 mb-4">Your VoteSmart account has been created</p>
      
      <div className="mb-8 max-w-md mx-auto">
        <p className="text-center text-gray-800">
          Your dashboard is now customized to match your interests. Explore personalized policy updates, candidate comparisons, and election updates.
        </p>
      </div>
      
      <Link to="/dashboard">
        <Button className="bg-blue-600 hover:bg-blue-700 px-6 py-6 mx-auto flex items-center gap-2">
          Go to Dashboard
          <ArrowRight size={18} />
        </Button>
      </Link>
    </div>
  );
};

export default CompletionStep;