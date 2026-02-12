type SpinnerProps = {
  className?: string;
};

export function Spinner({ className = "" }: SpinnerProps) {
  return (
    <div
      className={`text-center size-5 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      aria-label="Loading"
      role="status"
    />
  );
}
