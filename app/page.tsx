'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Cpu,
  ArrowRight,
  Activity,
  Check,
  Zap,
  PhoneCall,
  Flame,
  Clock,
  Compass,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import { POTATO_LATE_BLIGHT_IMAGE } from '@/lib/sample-data';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="w-full bg-agri-50 border-b border-agri-200 py-1.5 px-4 text-center">
        <span className="text-[11px] sm:text-xs font-mono font-bold text-agri-800 tracking-wide inline-flex items-center gap-1.5">
          <Zap className="h-3.5 w-3.5 fill-current text-agri-600" />
          <span>⚡ 5-STAGE AUTONOMOUS AGENT WORKFLOW • 500–5,000 ACRES</span>
        </span>
      </div>

      {/* Main Navbar */}
      <Navbar currentRoute="landing" />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-8 text-center">
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
          Autonomous Visual Crop Defense for{' '}
          <span className="text-agri-600">Commercial Farms.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-3xl mx-auto font-normal">
          Sub-2-second computer vision pathology detection, live weather spore
          modeling, and automated EPA spray work orders with zero human clicks.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg bg-agri-600 px-6 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-agri-700 active:scale-[0.98]"
          >
            <span>Launch Sentinel Dashboard</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <a
            href="#telemetry-standard"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-2xs transition hover:bg-slate-50 hover:text-slate-900"
          >
            <span>View Agronomy Specs</span>
          </a>
        </div>

        {/* ========================================================================= */}
        {/* Hero Preview Card: Live Telemetry Frame & Diagnostic Cockpit              */}
        {/* ========================================================================= */}
        <div className="mt-14 mx-auto max-w-5xl rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-md text-left">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-3 text-xs font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">STAGE PIPELINE TELEMETRY:</span>
              <span>Drone Ingestion • CV Pathology • Weather Risk • EPA Formulation • Tractor Dispatch</span>
            </div>
            <span className="rounded bg-agri-100 px-2 py-0.5 text-[10px] font-bold text-agri-800">
              READY FOR RUN
            </span>
          </div>

          {/* Split Cockpit Grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
            {/* Left: Simulated Visual Leaf Telemetry */}
            <div className="md:col-span-7 relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
              {/* Leaf Visual */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={POTATO_LATE_BLIGHT_IMAGE}
                alt="Late Blight Detection Preview"
                className="h-full w-full object-cover select-none"
              />

              {/* Bounding Box 1 */}
              <div
                className="absolute border-2 border-alert-600 rounded-xs pointer-events-none"
                style={{ top: '24%', left: '30%', width: '38%', height: '36%' }}
              >
                <div className="absolute -top-5 left-0 bg-alert-600 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap shadow-xs">
                  PHYTOPHTHORA INFESTANS (LATE BLIGHT) • 96.4%
                </div>
              </div>

              {/* Bounding Box 2 */}
              <div
                className="absolute border-2 border-alert-600 rounded-xs pointer-events-none"
                style={{ top: '60%', left: '52%', width: '28%', height: '24%' }}
              >
                <div className="absolute -top-5 left-0 bg-alert-600 text-white text-[9px] font-mono font-bold px-1.5 py-0.5 whitespace-nowrap shadow-xs">
                  SECONDARY NECROSIS • 18.5% AREA
                </div>
                <div className="absolute -bottom-4 right-0 bg-slate-900/90 text-slate-300 text-[8px] font-mono px-1 py-0.2">
                  Lesion Area: 44.2 cm²
                </div>
              </div>

              {/* Top Frame Tag */}
              <div className="absolute top-2.5 left-2.5 rounded bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono text-slate-300">
                FRAME #8109-PIVOT C • GSD: 0.12 cm/px
              </div>

              {/* Top Hazard Tag */}
              <div className="absolute top-2.5 right-2.5 rounded bg-alert-700 px-2 py-0.5 text-[9px] font-mono font-bold text-white">
                DEFENSE HAZARD LEVEL 4
              </div>

              {/* Bottom Sensor Telemetry */}
              <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 px-3 py-1.5 text-[9px] font-mono text-slate-400 border-t border-slate-800 flex justify-between">
                <span>SENSOR: SONY ILX-LR1 61MP F/5.6 • ISO 200 • 1/1600s</span>
                <span>SPECTRAL INDICES: NDVI 0.41 (STRESSED) • NDRE 0.22</span>
              </div>
            </div>

            {/* Right: Pathology Verdict & Prescription Card */}
            <div className="md:col-span-5 flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-4 font-mono text-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <span className="font-bold text-slate-900 uppercase">Pathology Verdict</span>
                  <span className="rounded bg-alert-100 text-alert-700 px-2 py-0.5 font-bold text-[10px]">
                    CRITICAL
                  </span>
                </div>

                <div className="mt-3 space-y-2 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>Detected Pathogen:</span>
                    <strong className="text-slate-900">Late Blight (P. infestans)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Model Confidence:</span>
                    <strong className="text-slate-900">96.4%</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Field Sector:</span>
                    <strong className="text-slate-900">Pivot 03 • Sub-Quadrant B</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Infected Perimeter:</span>
                    <strong className="text-slate-900">4.8 ACRES BUFFERED</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Spore Risk Index (DSI):</span>
                    <strong className="text-amber-700 font-bold">74/100 (HIGH HUMIDITY)</strong>
                  </div>
                </div>

                {/* EPA Prescription Box */}
                <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3 space-y-1 text-[11px]">
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>EPA PRESCRIPTION SPEC</span>
                    <span className="font-mono text-slate-600">EPA REG. #50534-188</span>
                  </div>
                  <div className="font-bold text-slate-900 text-xs">Chlorothalonil 720 SC</div>
                  <div className="text-slate-600">Rate: 1.5 pt / acre in 20.0 gal water</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                <Link
                  href="/dashboard"
                  className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-agri-600 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-agri-700 transition"
                >
                  <span>Send Work Order to Tractor #12</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <p className="mt-1.5 text-[10px] text-center text-slate-400">
                  ISOBUS TaskController XML generated • 0 clicks required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4-Metric Throughput & Fleet Compatibility Bar                             */}
      {/* ========================================================================= */}
      <section className="w-full border-y border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                1,200 ac/hr
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-700">ANALYSIS THROUGHPUT</div>
              <div className="text-[11px] text-slate-500">Real-time drone RTK streaming</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-agri-600 font-mono">
                42.8% Average
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-700">INPUT REDUCTION</div>
              <div className="text-[11px] text-slate-500">Surgically targeted nozzle control</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                0.8 mm/px
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-700">PATHOGEN RESOLUTION</div>
              <div className="text-[11px] text-slate-500">Pre-symptomatic spore detection</div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                ISOBUS 11783
              </div>
              <div className="mt-1 text-xs font-semibold text-slate-700">FLEET COMPATIBILITY</div>
              <div className="text-[11px] text-slate-500">John Deere, Case IH, Rogator</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3-Card Sentinel Advantage Feature Grid                                    */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center" id="autonomous-engine">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-agri-700">
          ENGINEERED FOR HIGH-VALUE PRODUCE &amp; GRAINS
        </span>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Built to Eliminate Manual Field Scouting.
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Card 1 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-agri-100 text-agri-700 mb-4">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Sub-Millimeter Computer Vision
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Instant leaf pathology segmentation and necrotic lesion calculation.
                Identifies early-stage Late Blight, Early Blight (Alternaria), and Black Scurf
                before visual field emergence.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-3 flex justify-between items-center text-[11px] font-mono text-slate-500">
              <span>INFERENCE SPEED</span>
              <strong className="text-slate-900">&lt; 1.4 SECONDS</strong>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-agri-100 text-agri-700 mb-4">
                <Zap className="h-5 w-5 fill-current" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Zero-Click Autonomous Workflow
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                End-to-end background execution from drone tile upload to tractor work-order
                dispatch. Live API hooks sync weather micro-climates, compute EPA chemical rates,
                and transmit VRA prescriptions directly to rig terminals.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-3 flex justify-between items-center text-[11px] font-mono text-slate-500">
              <span>OPERATOR CLICKS</span>
              <strong className="text-agri-600 font-bold">0</strong>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-agri-100 text-agri-700 mb-4">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                10x Input ROI
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Eliminates defensive blanket-spraying, saving $30,000+ in chemical inputs per
                season on a standard 2,500-acre rotation. Prevents pathogen-driven field rot
                and secondary potato storage decay.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-100 pt-3 flex justify-between items-center text-[11px] font-mono text-slate-500">
              <span>AVERAGE NET SAVINGS</span>
              <strong className="text-slate-900">$34,200 / SEASON</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Autonomous Telemetry Protocol Standard Table                              */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8" id="telemetry-standard">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Autonomous Telemetry Protocol Standard
              </h3>
              <p className="text-xs text-slate-500">
                End-to-end SLA parameters for autonomous execution loop.
              </p>
            </div>
            <span className="rounded bg-agri-100 px-2.5 py-1 text-xs font-mono font-bold text-agri-800">
              ISO 11783-10 COMPLIANT
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-400">
                  <th className="py-2.5 pr-4">Stage Phase</th>
                  <th className="py-2.5 px-4">Data Input Source</th>
                  <th className="py-2.5 px-4">Algorithmic Engine</th>
                  <th className="py-2.5 px-4">Output Artifact</th>
                  <th className="py-2.5 pl-4 text-right">Execution SLA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr>
                  <td className="py-3 pr-4 font-bold text-slate-900">01. CAPTURE</td>
                  <td className="py-3 px-4">Mavic 3M / Wingtra Gen IV Multispectral</td>
                  <td className="py-3 px-4">Photogrammetry Radiometric Rectification</td>
                  <td className="py-3 px-4">Calibrated GeoTIFF Orthomosaics</td>
                  <td className="py-3 pl-4 text-right text-agri-700 font-bold">&lt; 3.0 min</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-slate-900">02. SEGMENT</td>
                  <td className="py-3 px-4">High-Res RGB + RedEdge Tile Vectors</td>
                  <td className="py-3 px-4">Sentinel-YOLO Agro v5 (Leaf Lesion Focus)</td>
                  <td className="py-3 px-4">Polygon Centroids &amp; Pathogen ID</td>
                  <td className="py-3 pl-4 text-right text-agri-700 font-bold">&lt; 1.8 sec/tile</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-slate-900">03. WEATHER</td>
                  <td className="py-3 px-4">On-Farm Davis In-Canopy Weather Probe</td>
                  <td className="py-3 px-4">Wallin Late Blight Disease Severity Index (DSI)</td>
                  <td className="py-3 px-4">Sporulation Micro-Zone Vectors</td>
                  <td className="py-3 pl-4 text-right text-agri-700 font-bold">Continuous</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-slate-900">04. FORMULATE</td>
                  <td className="py-3 px-4">EPA Registration DB + Farm Inventory ERP</td>
                  <td className="py-3 px-4">Deterministic Efficacy &amp; Resistance Solver</td>
                  <td className="py-3 px-4">Batch Tank Mix + Adjuvant Specs</td>
                  <td className="py-3 pl-4 text-right text-agri-700 font-bold">&lt; 400 ms</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold text-slate-900">05. EXECUTE</td>
                  <td className="py-3 px-4">Precision Ag Telematics Modem</td>
                  <td className="py-3 px-4">ISOBUS TaskController Auto-Dispatcher</td>
                  <td className="py-3 px-4">VRA Prescription to Tractor Cab</td>
                  <td className="py-3 pl-4 text-right text-agri-700 font-bold">&lt; 5.0 sec</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SaaS Pricing Section: Commercial Grower Standard Card                     */}
      {/* ========================================================================= */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center" id="pricing">
        <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-md text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-agri-700">
              COMMERCIAL GROWER PLAN
            </span>
            <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono text-slate-500">
              SAAS LICENSE
            </span>
          </div>

          <h3 className="mt-3 text-xl font-black text-slate-900">
            Commercial Grower Standard
          </h3>

          <div className="mt-4 flex items-baseline gap-1">
            <span className="text-4xl font-black text-slate-900">$499</span>
            <span className="text-sm text-slate-500 font-medium">/ month</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Billed annually for commercial farms ($5,988/yr).
          </p>

          {/* Features List */}
          <ul className="mt-6 space-y-3 text-xs text-slate-700">
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-agri-600 stroke-[3] shrink-0" />
              <span>Up to 2,500 managed acres</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-agri-600 stroke-[3] shrink-0" />
              <span>Unlimited automated CV scans</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-agri-600 stroke-[3] shrink-0" />
              <span>Deterministic EPA tank-mix engine</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-agri-600 stroke-[3] shrink-0" />
              <span>Tractor work-order dispatch</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-4 w-4 text-agri-600 stroke-[3] shrink-0" />
              <span>Full ISOBUS &amp; Raven Slingshot telematic bridge</span>
            </li>
          </ul>

          {/* Action */}
          <div className="mt-8">
            <Link
              href="/dashboard"
              className="w-full inline-flex items-center justify-center gap-1.5 rounded-lg bg-agri-600 py-3 text-xs font-bold text-white shadow-xs hover:bg-agri-700 transition"
            >
              <span>Launch Sentinel Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <p className="mt-2 text-center text-[10px] text-slate-400">
              Requires zero hardware installation • Compatible with standard farm drones
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* Emergency Field Outbreak Support Strip                                    */}
      {/* ========================================================================= */}
      <section className="w-full bg-slate-900 text-white py-5 px-4">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-alert-600 text-white">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-white">
                Emergency Field Outbreak Support
              </div>
              <div className="text-[11px] text-slate-400">
                Active agronomists on duty 24/7 during potato &amp; pulse emergence periods.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="text-slate-300 font-bold">1-800-CROPEYE-OPS</span>
            <Link
              href="/dashboard"
              className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs text-slate-200 hover:bg-slate-700 transition"
            >
              Inquire Agronomist Support
            </Link>
          </div>
        </div>
      </section>

      {/* Standard Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-6 px-4 text-center text-xs text-slate-500 font-mono">
        <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-2">
          <span>CropEye v4.2.0-COMMERCIAL</span>
          <span>© 2024 CropEye Systems Inc. All agronomic protocols certified.</span>
          <span className="text-agri-700 font-bold">TELEMETRY LINK ACTIVE</span>
        </div>
      </footer>
    </div>
  );
}
