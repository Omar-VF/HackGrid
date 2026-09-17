'use client';

import React from 'react';

interface ROICounterProps {
  cropSavedUsd: number;
  chemicalSavingsPct: number;
  carbonOffsetKg?: number;
  groundwaterStatus?: string;
}

export default function ROICounter({
  cropSavedUsd,
  chemicalSavingsPct,
  carbonOffsetKg = 142,
  groundwaterStatus = 'GROUNDWATER BUFFER: COMPLIANT',
}: ROICounterProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            04 / Financial Impact
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Financial &amp; Environmental ROI
          </h3>
        </div>
        <span className="rounded border border-agri-300 bg-agri-50 px-2 py-0.5 text-[10px] font-mono font-bold text-agri-800">
          REAL-TIME VALUATION
        </span>
      </div>

      {/* Main Metric Cards */}
      <div className="mt-4 grid grid-cols-2 gap-4">
        {/* Protected Yield */}
        <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 tracking-wider">
            Protected Yield
          </span>
          <div className="mt-1 text-2xl font-black tracking-tight text-slate-900">
            ₹{Math.round(cropSavedUsd * 83).toLocaleString()}
          </div>
          <p className="mt-0.5 text-[11px] font-mono text-slate-500">
            (${cropSavedUsd.toLocaleString()} USD • ₹1,200/quintal)
          </p>
        </div>

        {/* Micro-Targeting Savings */}
        <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5">
          <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 tracking-wider">
            Micro-Targeting
          </span>
          <div className="mt-1 text-2xl font-black tracking-tight text-agri-600">
            {chemicalSavingsPct}% Saved
          </div>
          <p className="mt-0.5 text-[11px] font-mono text-slate-500">
            vs. Blanket Broadcast Spray
          </p>
        </div>
      </div>

      {/* Environmental Tags Footer */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[11px] font-mono text-slate-500">
        <div>
          CARBON OFFSET: <strong className="text-slate-700">{carbonOffsetKg} kg CO2e</strong>
        </div>
        <div className="text-agri-700 font-semibold">{groundwaterStatus}</div>
      </div>
    </div>
  );
}
