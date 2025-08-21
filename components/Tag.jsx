export default function Tag({ children }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 mr-1">
      {children}
    </span>
  );
}