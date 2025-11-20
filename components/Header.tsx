interface HeaderProps {
  jobTitle: string;
  onBack: () => void;
}

export default function Header({ jobTitle, onBack }: HeaderProps) {
  return (
    <div className="w-full bg-white">
      <div className="px-6 py-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-3">
            <button
              onClick={onBack}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors self-start leading-5 cursor-pointer"
            >
              ← Back to My Jobs
            </button>
            <h1 className="text-2xl font-semibold text-gray-900 leading-tight">{jobTitle}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
