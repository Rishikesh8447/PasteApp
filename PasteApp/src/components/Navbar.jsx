import { NavbarData } from "../data/Navbar";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full h-[60px] flex justify-center items-center bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-800 shadow-2xl">
      <div className="flex gap-x-12">
        {NavbarData.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={({ isActive }) =>
              isActive
                ? "text-indigo-400 font-bold text-lg tracking-wide transition-all duration-300 drop-shadow-[0_0_8px_rgba(129,140,248,0.5)]"
                : "text-slate-400 font-medium text-lg hover:text-slate-100 transition-all duration-300"
            }
          >
            {link.title}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;