import { Link, useNavigate } from 'react-router-dom';
import { FaCog, FaHome, FaSignOutAlt } from 'react-icons/fa';
import logo from '../assets/logo.png';

function SideBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication data, example:
    localStorage.removeItem('token'); // or whichever key you use
    // Clear any other user data as needed

    // Redirect to login or home page
    navigate('/login');
  };

  return (
    <div className="h-screen w-64 p-6 bg-[rgb(98,131,122)] flex flex-col items-center py-6 z-50">
      {/* Logo */}
      <div className="mb-10">
        <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
      </div>
      {/* Nav links */}
      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center px-8 py-2 rounded-full bg-white text-black font-medium">
              <FaHome className="mr-3" />
              <p>Home</p>
            </Link>
          </li>
          <li>
            <Link to="#" className="flex items-center px-8 py-2 text-white hover:bg-neutral-700 rounded-full">
              <FaCog className="mr-3" /> Settings
            </Link>
          </li>
        </ul>
      </nav>
      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-auto mb-6 px-8 py-2 w-4/5 border border-white rounded-full text-white flex items-center justify-center hover:bg-white hover:text-[#23236B] transition"
      >
        <FaSignOutAlt className="mr-2" /> Logout
      </button>
    </div>
  );
}

export default SideBar;
