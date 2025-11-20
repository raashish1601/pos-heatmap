interface EmptyStateOverlayProps {
  message: string;
}

export default function EmptyStateOverlay({ message }: EmptyStateOverlayProps) {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-[var(--skill-column-width)] flex items-center justify-center bg-white/50 z-50">
      <button className="px-6 py-3 bg-green-800 text-white rounded-md font-medium hover:bg-green-900 transition-colors shadow-lg cursor-pointer text-base">
        {message}
      </button>
    </div>
  );
}
