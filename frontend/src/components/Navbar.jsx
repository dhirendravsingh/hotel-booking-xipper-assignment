import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    return (
      <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <input
          type="text"
          placeholder="Search by location..."
          onChange={(e) => onSearch(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <div className="flex gap-4">
          
          <button onClick={() => navigate("/webcheckin")} className="bg-blue-500 px-4 py-2 rounded">
            Web Check-in
          </button>
          <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </nav>
    );
  };

  export default Navbar