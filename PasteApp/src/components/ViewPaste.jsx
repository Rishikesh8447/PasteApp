import { Copy, Share2 } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ViewPaste = () => {
  const { id } = useParams();
  const pastes = useSelector((state) => state.paste.pastes);
  const paste = pastes.find((p) => p._id === id);
  const shareUrl = `${window.location.origin}/pastes/${id}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: paste.title || "Paste",
          text: paste.content,
          url: shareUrl,
        });
        return;
      }
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Share link copied");
    } catch {
      toast.error("Unable to share right now");
    }
  };

  if (!paste) return <div className="text-center py-20 text-2xl">Paste not found</div>;

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-7">
        <input
          type="text"
          value={paste.title}
          disabled
          className="w-full bg-[#1e293b] border border-slate-700 rounded-xl p-4 shadow-inner font-semibold text-slate-100"
        />
        <div className="w-full flex flex-col items-start overflow-hidden rounded-2xl border border-slate-800 shadow-2xl bg-[#0f172a]">
          <div className="w-full bg-slate-900/50 flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <div className="flex gap-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleShare}
                className="p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-md"
                title="Share"
              >
                <Share2 size={20} />
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(paste.content); toast.success("Copied"); }}
                className="p-2 text-slate-400 hover:text-indigo-400 transition-colors rounded-md"
                title="Copy"
              >
                <Copy size={20} />
              </button>
            </div>
          </div>
          <textarea
            value={paste.content}
            disabled
            className="w-full p-8 bg-transparent text-slate-300 font-mono text-sm leading-relaxed outline-none min-h-[500px] cursor-default"
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
