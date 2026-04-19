export default function Divider() {
  return (
    <div className="max-w-6xl mx-auto px-6 flex items-center gap-4">
      <div className="flex-1 h-px bg-neutral-800" />
      <span className="text-neutral-700 text-xs tracking-widest select-none">
        ✦ ✦ ✦
      </span>
      <div className="flex-1 h-px bg-neutral-800" />
    </div>
  );
}
