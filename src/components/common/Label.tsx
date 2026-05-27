import React from "react";

type LabelProps = {
  name: string;
  children: React.ReactNode;
  wide?: boolean;
};

export function Label({
  name,
  children,
  wide,
}: LabelProps) {
  return (
    <label
      className={wide ? "wide-label" : ""}
    >
      <span>{name}</span>

      {children}
    </label>
  );
}