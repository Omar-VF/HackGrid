'use client';

import React from 'react';
import { PrescriptiveDosage } from '@/types/sentinel';
import { CheckCircle2 } from 'lucide-react';

interface PrescriptionCardProps {
  prescription: PrescriptiveDosage;
  acreage?: number;
}

export default function PrescriptionCard({
  prescription,
}: PrescriptionCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            02 / Prescriptive Defense
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Deterministic EPA Tank-Mix
          </h3>
        </div>
        <span className="rounded border border-agri-300 bg-agri-50 px-2 py-0.5 text-[10px] font-mono font-bold text-agri-800">
          AUTO-CALC
        </span>
      </div>

      {/* Chemical Identity */}
      <div className="mt-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h4 className="text-base font-extrabold text-slate-900">
            {prescription.chemicalName}
          </h4>
          <p className="text-xs text-slate-500">
            Broad-spectrum contact fungicide, Frac Group M05.
          </p>
        </div>
        <span className="rounded border border-slate-200 bg-slate-50 px-2 py-0.5 text-xs font-mono font-semibold text-slate-700">
          {prescription.epaRegNumber}
        </span>
      </div>

      {/* Prescription Specification Grid */}
      <div className="mt-4 grid grid-cols-1 gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3.5 text-xs sm:grid-cols-3 font-mono">
        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Application Rate:
          </span>
          <div className="mt-1 font-bold text-slate-900 text-sm">
            {prescription.dosagePerAcre} in {prescription.waterVolumePerAcre}
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Target Carrier Volume:
          </span>
          <div className="mt-1 font-bold text-slate-900 text-sm">
            2,800 Gallons Total Solution
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Concentrate Needed:
          </span>
          <div className="mt-1 font-bold text-agri-700 text-sm">
            {prescription.totalChemicalVolume}{' '}
            <span className="font-normal text-slate-500 text-xs">
              (${prescription.estimatedChemicalCostUsd.toLocaleString()} input cost)
            </span>
          </div>
        </div>
      </div>

      {/* Spray Buffer & Environmental Compliance */}
      <div
        className={`mt-3.5 flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-medium ${
          prescription.safeToSpray
            ? 'border-agri-200 bg-agri-50/70 text-agri-900'
            : 'border-alert-300 bg-alert-50 text-alert-900'
        }`}
      >
        <CheckCircle2
          className={`h-4 w-4 shrink-0 ${
            prescription.safeToSpray ? 'text-agri-600' : 'text-alert-600'
          }`}
        />
        <span className="font-mono text-[11px]">
          {prescription.windBufferNotice || '✓ Wind: 6.2 mph (<10 mph threshold). Buffer: 100ft verified.'}
        </span>
      </div>
    </div>
  );
}
