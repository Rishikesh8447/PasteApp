import { Copy, PlusCircle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) dispatch(updatePastes(paste));
    else dispatch(addToPastes(paste));

    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-8">
        {/* Title Input Area */}
        <div className="flex flex-row gap-x-4">
          <input
            type="text"
            placeholder="Enter Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-grow bg-[#1e293b] text-slate-100 border border-slate-700 rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-inner"
          />
          <button
            onClick={createPaste}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl px-8 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] active:scale-95"
          >
            <Sparkles size={20} />
            {pasteId ? "Update" : "Create"}
          </button>
        </div>

        {/* Editor Container */}
        <div className="w-full bg-[#0f172a] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 bg-slate-900/50 border-b border-slate-800">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(value); toast.success("Copied!"); }}
              className="text-slate-400 hover:text-indigo-400 transition-colors"
            >
              <Copy size={22} />
            </button>
          </div>
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write your code or thoughts here..."
            className="w-full p-8 bg-transparent text-slate-300 font-mono text-sm leading-relaxed outline-none min-h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;