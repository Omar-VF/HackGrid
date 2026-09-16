import Link from "next/link";
import { ShieldCheck, Cpu, ArrowRight, Activity, CloudSun, FileText } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        {/* Won Constraints Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
            🌾 Track: Agriculture
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
            👁️ Rights: Computer Vision
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
            ⚡ Capability: Autonomous Workflow
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-agri-100 text-agri-800 border border-agri-200">
            🚜 Segment: Small Businesses ($499/mo)
          </span>
        </div>

        {/* Title & Tagline */}
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          CropScan <span className="text-agri-600">AI Sentinel</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
          Autonomous computer vision crop pathology and precision spray defense platform for commercial family farms. Sub-2-second background execution loop from leaf photography to EPA tractor work-order dispatch.
        </p>

        {/* Core Subsystem Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-left">
          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-agri-100 text-agri-700 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">CV Geometry Engine</h3>
            <p className="text-xs text-slate-500">
              Normalized percentage bounding boxes &amp; in-browser necrosis color-space segmentation.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-agri-100 text-agri-700 flex items-center justify-center mb-3">
              <CloudSun className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">Open-Meteo &amp; Wallin</h3>
            <p className="text-xs text-slate-500">
              Live microclimate telemetry with Wallin spore germination risk index modeling.
            </p>
          </div>

          <div className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="w-9 h-9 rounded-lg bg-agri-100 text-agri-700 flex items-center justify-center mb-3">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">EPA Prescription Engine</h3>
            <p className="text-xs text-slate-500">
              Deterministic Chlorothalonil tank-mix ratios and &lt;10 mph wind drift compliance.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/api/health"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-agri-600 text-white font-semibold text-sm hover:bg-agri-700 transition-colors shadow-sm"
          >
            <Activity className="w-4 h-4" />
            Check Engine Health API
          </a>
          <a
            href="/api/weather"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            <CloudSun className="w-4 h-4" />
            Test Live Weather API
          </a>
        </div>
      </div>
    </main>
  );
}
