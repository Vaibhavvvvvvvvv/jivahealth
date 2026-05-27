type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({
  status,
}: StatusBadgeProps) {
  return (
    <span
      className={`status ${status.toLowerCase()}`}
    >
      {status}
    </span>
  );
}