import { Link } from "react-router-dom";
import { FileCheck } from "lucide-react";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <div className="bg-blue-600 rounded-lg p-1.5 mr-2">
          <FileCheck className="text-white" size={24} />
        </div>
        <h1 className="text-2xl font-bold">VoteSmart</h1>
      </div>
    </Link>
  );
};

export default Logo;