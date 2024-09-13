import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserProvider";
import image from './logo.png';

const Header = () => {
  const { userInfo, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/profile", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.email);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        setUser(null);
      }
    };

    fetchUserProfile();
  }, [setUser]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/logout", {
        credentials: "include",
        method: "POST",
      });
      if (response.ok) {
        setUser(null);
        navigate("/"); // Redirect to home page
      } else {
        console.error("Error logging out");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="bg-sky-600 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src={image} 
            alt="Logo" 
            className="h-10 rounded-md	 bg-white px-2 py-1 radius w-auto" // Adjust height as needed
          />
        </Link>
        <div className="flex items-center space-x-4">
          {userInfo ? (
            <>
              <Link
                className="text-white px-4 py-2 rounded-md bg-sky-800 hover:bg-sky-700 transition duration-200"
                to="/create-post"
              >
                Create Post
              </Link>
              <button
                className="text-white px-4 py-2 rounded-md bg-sky-800 hover:bg-sky-700 transition duration-200"
                onClick={logout}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
<> <>
      
              <button
                className="text-white px-4 py-2 rounded-md bg-sky-800 hover:bg-sky-700 transition duration-200"
              onClick={()=>navigate('/login')}
                aria-label="Logout"
              >
                Login
              </button>
            </></>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
