export default function Loading({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
        <div className="absolute inset-0 border-2 border-transparent border-t-accent rounded-full animate-spin" />
      </div>
      <p className="text-sm text-gray-400 tracking-wide">{message}</p>
    </div>
  );
}
