interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-center">
        <p className="text-gray-500 text-lg">{message}</p>
      </div>
    </div>
  );
}
