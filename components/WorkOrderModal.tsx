'use client';

import React from 'react';
import { WorkOrderTicket } from '@/types/sentinel';
import { X, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface WorkOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: WorkOrderTicket;
}

export default function WorkOrderModal({
  isOpen,
  onClose,
  ticket,
}: WorkOrderModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl border border-slate-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2">
            <span className="rounded bg-agri-100 px-2 py-0.5 text-[10px] font-mono font-bold text-agri-800">
              ISO 11783-10 TASKCONTROLLER XML
            </span>
            <span className="text-xs font-mono text-slate-500">
              {ticket.timestamp}
            </span>
          </div>
          <h3 className="mt-1 text-xl font-bold text-slate-900">
            Official Tractor Spray Work-Order Ticket
          </h3>
          <p className="text-xs text-slate-500 font-mono">
            Ticket ID: {ticket.ticketId} • Target Sector: Sector 4B (140 Acres)
          </p>
        </div>

        {/* Ticket Details Grid */}
        <div className="mt-4 space-y-4 text-xs font-mono">
          {/* Farm & Machine Specs */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-[10px] uppercase font-sans text-slate-400">Farm:</span>
              <div className="font-bold text-slate-900">{ticket.farmName}</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans text-slate-400">Assigned Unit:</span>
              <div className="font-bold text-slate-900">John Deere R4045 #02</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans text-slate-400">Boom Width:</span>
              <div className="font-bold text-slate-900">120 ft (PWM)</div>
            </div>
            <div>
              <span className="text-[10px] uppercase font-sans text-slate-400">Nozzle Pressure:</span>
              <div className="font-bold text-slate-900">42 PSI Coarse</div>
            </div>
          </div>

          {/* Diagnostic Evidence */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5">
            <span className="text-[10px] uppercase font-sans text-slate-400">
              Diagnostic Computer Vision Proof:
            </span>
            <div className="mt-1 flex flex-wrap items-center justify-between gap-2">
              <span className="font-bold text-slate-900">
                {ticket.diagnostic.commonName} ({ticket.diagnostic.scientificName})
              </span>
              <span className="rounded bg-alert-100 text-alert-700 px-2 py-0.5 font-bold text-[10px]">
                Confidence: {ticket.diagnostic.confidence}% • Necrosis: {ticket.diagnostic.necrosisPercentage}%
              </span>
            </div>
          </div>

          {/* EPA Chemical Formulation */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 space-y-1.5">
            <span className="text-[10px] uppercase font-sans text-slate-400">
              EPA Registered Formulation:
            </span>
            <div className="flex justify-between font-bold text-slate-900">
              <span>{ticket.prescription.chemicalName}</span>
              <span>{ticket.prescription.epaRegNumber}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Application Rate: {ticket.prescription.dosagePerAcre}</span>
              <span>Total Concentrate: {ticket.prescription.totalChemicalVolume}</span>
            </div>
            <div className="flex justify-between text-slate-600 text-[11px]">
              <span>Carrier Water: {ticket.prescription.waterVolumePerAcre} (2,800 gal total)</span>
              <span>Chemical Cost: ${ticket.prescription.estimatedChemicalCostUsd.toLocaleString()}</span>
            </div>
          </div>

          {/* Compliance & Savings */}
          <div className="flex items-center justify-between rounded-lg border border-agri-200 bg-agri-50 p-3 text-agri-900">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-agri-600" />
              <span>EPA Wind Buffer Verified (&lt;10 mph threshold)</span>
            </div>
            <div className="font-bold">
              ${ticket.estimatedCropSavedUsd.toLocaleString()} Crop Value Protected
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-lg bg-agri-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-agri-700 transition"
          >
            <Printer className="h-3.5 w-3.5" />
            <span>Print Work Order</span>
          </button>
        </div>
      </div>
    </div>
  );
}
