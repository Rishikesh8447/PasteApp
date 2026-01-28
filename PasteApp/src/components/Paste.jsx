import { Calendar, Copy, Eye, PencilLine, Trash2, Search } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { removeFromPastes } from "../redux/pasteSlice";
import { FormatDate } from "../utlis/formatDate";
import toast from "react-hot-toast";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPastes = pastes.filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="w-full py-10 max-w-[1200px] mx-auto px-5">
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
        <input
          type="search"
          placeholder="Search your library..."
          className="w-full bg-[#1e293b] text-slate-100 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredPastes.map((paste) => (
          <div key={paste._id} className="bg-[#0f172a] border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all group shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors line-clamp-1">{paste.title}</h2>
              <div className="flex gap-2">
                <a href={`/?pasteId=${paste._id}`} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-700"><PencilLine size={18} /></a>
                <button onClick={() => dispatch(removeFromPastes(paste._id))} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700"><Trash2 size={18} /></button>
                <a href={`/pastes/${paste._id}`} className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-700"><Eye size={18} /></a>
              </div>
            </div>
            <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-mono leading-relaxed">{paste.content}</p>
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <Calendar size={14} />
                {FormatDate(paste.createdAt)}
              </div>
              <button onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("Copied!"); }} className="text-xs text-indigo-400 hover:underline">Copy Content</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paste;