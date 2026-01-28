import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);

  if (!paste) return <div className="text-center py-20 text-2xl">Paste not found</div>;

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-7">
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full bg-white border border-gray-300 rounded-lg p-3 shadow-sm font-semibold text-gray-700"
        />
        <div className="w-full flex flex-col items-start overflow-hidden rounded-xl border border-gray-200 shadow-2xl bg-white">
          <div className="w-full bg-gray-100 flex items-center justify-between px-4 py-2 border-b border-gray-200">
            <div className="flex gap-x-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C842]" />
            </div>
            <button
              onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("Copied"); }}
              className="p-2 hover:bg-gray-200 rounded-md"
            >
              <Copy size={18} className="text-gray-600" />
            </button>
          </div>
          <textarea
            value={paste.content}
            disabled
            className="w-full p-6 text-gray-800 leading-relaxed font-mono text-sm bg-gray-50/50 cursor-default"
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;