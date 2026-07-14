"use client";

import { ReactNode } from "react";

interface AdminTableProps {
  headers: string[];
  children: ReactNode;
}

export function AdminTable({ headers, children }: AdminTableProps) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-white/5">
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
}

export function TableRow({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <tr
      className={`hover:bg-white/5 transition-colors ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } } : undefined}
    >
      {children}
    </tr>
  );
}

export function TableCell({ children, className = "", onClick }: { children: ReactNode; className?: string; onClick?: (e: React.MouseEvent) => void }) {
  return <td onClick={onClick} className={`px-4 py-3 text-sm text-gray-300 whitespace-nowrap ${className}`}>{children}</td>;
}
