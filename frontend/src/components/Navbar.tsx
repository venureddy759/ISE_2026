import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (

    <div className="fixed top-0 left-0 w-full h-14 bg-gray-800 text-white flex items-center px-6 z-50 justify-between">
      <h2 className="text-lg font-semibold">Policy Lens</h2>
      <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600" onClick={handleLogout}>
        Logout
      </button>
    </div>

    
  );
}

export default Navbar;