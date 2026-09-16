'use client';

import React, { useState } from 'react';
import { WorkOrderTicket } from '@/types/sentinel';
import { Printer, Radio, Check, Loader2 } from 'lucide-react';

interface WorkOrderDispatchProps {
  ticket: WorkOrderTicket;
  onOpenPdfModal: () => void;
}

export default function WorkOrderDispatch({
  ticket,
  onOpenPdfModal,
}: WorkOrderDispatchProps) {
  const [isDispatching, setIsDispatching] = useState(false);
  const [dispatchedSuccess, setDispatchedSuccess] = useState(false);

  const handleDispatch = () => {
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setDispatchedSuccess(true);
      setTimeout(() => setDispatchedSuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            03 / Work Order
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Tractor Work-Order Dispatch
          </h3>
        </div>
        <span
          className={`rounded border px-2 py-0.5 text-[10px] font-mono font-bold ${
            ticket.diagnostic.pathogenId === 'non_plant_detected'
              ? 'border-amber-300 bg-amber-50 text-amber-800'
              : 'border-agri-300 bg-agri-50 text-agri-800'
          }`}
        >
          {ticket.diagnostic.pathogenId === 'non_plant_detected' ? 'DISPATCH SUPPRESSED' : 'STATION DISPATCHED'}
        </span>
      </div>

      {/* Ticket & Sector Context */}
      <div className="mt-3.5 flex flex-wrap items-center justify-between text-xs font-mono text-slate-600">
        <div>
          Ticket: <strong className="text-slate-900">{ticket.ticketId}</strong>
        </div>
        <div>
          Target: <strong className="text-slate-900">{ticket.diagnostic.pathogenId === 'non_plant_detected' ? 'No Treatment Zone' : 'Sector 4B (140 Acres)'}</strong>
        </div>
      </div>

      {/* Telemetry Machine Grid */}
      <div className="mt-3.5 grid grid-cols-2 gap-3 rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-xs font-mono">
        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Assigned Unit
          </span>
          <div className="mt-0.5 font-bold text-slate-900">
            {ticket.diagnostic.pathogenId === 'non_plant_detected' ? 'Unit Standby (No Target)' : 'John Deere R4045 #02'}
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Boom Width
          </span>
          <div className="mt-0.5 font-bold text-slate-900">
            120 ft (Pulse-Width Mod)
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Operator
          </span>
          <div className="mt-0.5 font-bold text-slate-900">
            Telemetry Autonav #12
          </div>
        </div>

        <div>
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider">
            Nozzle PSI
          </span>
          <div className="mt-0.5 font-bold text-slate-900">
            {ticket.diagnostic.pathogenId === 'non_plant_detected' ? '0 PSI • Spray Closed' : '42 PSI • Coarse Droplets'}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex flex-wrap items-center gap-2.5">
        <button
          onClick={onOpenPdfModal}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg bg-agri-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-agri-700 active:scale-[0.99]"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Export Work-Order PDF</span>
        </button>

        <button
          onClick={handleDispatch}
          disabled={isDispatching || ticket.diagnostic.pathogenId === 'non_plant_detected'}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900 active:scale-[0.99] disabled:opacity-50"
        >
          {isDispatching ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin text-agri-600" />
              <span>Transmitting...</span>
            </>
          ) : dispatchedSuccess ? (
            <>
              <Check className="h-3.5 w-3.5 text-agri-600 stroke-[2.5]" />
              <span className="text-agri-700 font-medium">Dispatched to Cab #02</span>
            </>
          ) : ticket.diagnostic.pathogenId === 'non_plant_detected' ? (
            <>
              <Radio className="h-3.5 w-3.5 text-slate-400" />
              <span>Dispatch Suppressed</span>
            </>
          ) : (
            <>
              <Radio className="h-3.5 w-3.5 text-agri-600" />
              <span>Dispatch to Tractor</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
