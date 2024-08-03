import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
  return (
    <>
      <nav className="sticky bg-orange-100 rounded-xl p-4 flex justify-between items-center shadow ">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-700 rounded-full mr-2"></div>
          <Link to="/">
            <h1 className="text-lg text-black font-bold">HOME</h1>
          </Link>
        </div>
        <h1 className="text-center font-mono text-black font-bold text-2xl">
          Mangko News
        </h1>
        <div className="hidden w-full md:block md:w-auto">
          <Link to="/add">
            <button className="font-bold text-black mr-4 px-4">
              Add Article
            </button>
          </Link>
          <Link to="/login">
            <button className="font-bold text-black mr-4 py-2 px-4">
              Login
            </button>
          </Link>
          <a onClick={handleLogout} className="btn btn-error btn-sm mx-1">
            Logout
          </a>
        </div>
      </nav>
    </>
  );
}
