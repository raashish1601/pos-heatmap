interface GridCellProps {
  value: number | string;
  isNumeric: boolean;
  cellColor: string;
}

export default function GridCell({ value, isNumeric, cellColor }: GridCellProps) {
  return (
    <div
      className={`shrink-0 h-6 flex items-center justify-center ${cellColor}`}
      style={{ width: "var(--candidate-column-width)" }}
    >
      {isNumeric ? (
        <span className="text-sm font-medium text-gray-900">{value}</span>
      ) : (
        <div className={`w-full h-full ${cellColor}`}></div>
      )}
    </div>
  );
}
