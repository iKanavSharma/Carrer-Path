import {Link,useNavigate} from "react-router-dom";
import {useState} from "react";

const Navbar=()=>{
    const navigate=useNavigate();
    const [menuOpen,setMenuOpen]=useState(false);

    //onClick on logout button
    const handleLogout=()=>{
        localStorage.removeItem("token");
        navigate("/signin");
    }
    //creating a nav bar having button and all
    return <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
                <Link to="/dashboard" className="text-xl font-bold text-blue-600">
                    CareerPath
                </Link>
                {/*Desktop */}
                <div className="hidden md:flex space-x-6 ">
                    <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 m-2 transition">DashBoard</Link>
                    <Link to="/saved-paths" className="text-gray-700 hover:text-blue-600 m-2 transition">Saved Paths</Link>
                    <button onClick={handleLogout} className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
                        Logout
                    </button>
                </div>
                {/*Mobile menu->if opeening in mobil  */}
                <button className="md:hidden p-2 rounded-md hover:bg-gray-100" onClick={()=>setMenuOpen(!menuOpen)}>
                    <svg 
                       xmlns="http://www.w3.org/2000/svg"
                       className="h-6 w-6 text-gray-700"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor">
                        {menuOpen?(
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ):(
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>
            </div>
        </div>
        {/*Mobile dropdown menu */}

        {menuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200 shadow-sm">
                <div className="px-4 py-2 space-y-2">
                    <Link
                        to="/dashboard"
                        className="block text-gray-700 hover:text-blue-600"
                        onClick={()=>setMenuOpen(false)}>
                            Dashboard
                    </Link>
                    <Link 
                        to="/saved-paths"
                        className="block text-gray-700 hover:text-blue-600"
                        onClick={()=>setMenuOpen(false)}>
                            Saved Paths
                    </Link>
                    <button onClick={()=>{
                        setMenuOpen(false);
                        handleLogout();
                    }} className="w-full text-left text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition">
                        Logout
                    </button>
                </div>
            </div>
        )}
    </nav>
}

export default Navbar;