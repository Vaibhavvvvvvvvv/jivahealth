import React from "react";

type MetricProps = {
  title: string;
  value: string | number;
  green?: boolean;
  icon?: React.ReactNode;
};

export function Metric({
  title,
  value,
  green,
  icon,
}: MetricProps) {
  return (
    <article className="metric-card">
      <div>
        <span>{title}</span>

        <strong
          className={green ? "green" : ""}
        >
          {value}
        </strong>
      </div>

      {icon && (
        <div className="metric-icon">
          {icon}
        </div>
      )}
    </article>
  );
}