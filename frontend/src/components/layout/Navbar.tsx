import { useNavigate } from "react-router-dom";
import { logout } from "../../utils/auth";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white px-6 py-3">
      <h2 className="text-lg font-semibold">Policy Lens</h2>
      <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600" onClick={handleLogout}>
        Logout
      </button>
    </div>

    
  );
}

export default Navbar;