interface GridCellProps {
  value: number | string;
  isNumeric: boolean;
  cellColor: string;
}

export default function GridCell({ value, isNumeric, cellColor }: GridCellProps) {
  return (
    <div
      className={`shrink-0 h-6 flex items-center justify-center w-[var(--candidate-column-width)] ${cellColor}`}
    >
      {isNumeric ? (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ) : (
        <div className={`w-full h-full ${cellColor}`}></div>
      )}
    </div>
  );
}
