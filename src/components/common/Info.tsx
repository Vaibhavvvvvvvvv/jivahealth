import React from "react";

type InfoProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

export function Info({
  icon,
  label,
  value,
}: InfoProps) {
  return (
    <p className="info-line">
      {icon}

      <span>{label}:</span>

      <strong>{value}</strong>
    </p>
  );
}