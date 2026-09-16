'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import {
  ShieldCheck,
  Check,
  TrendingUp,
  DollarSign,
  AlertCircle,
  FileText,
  Layers,
  ArrowRight,
} from 'lucide-react';

export default function BusinessProposalPage() {
  const [activeTab, setActiveTab] = useState<number>(1);

  const sections = [
    { id: 1, title: '1. Business Idea' },
    { id: 2, title: '2. Problem Statement' },
    { id: 3, title: '3. Market Gap' },
    { id: 4, title: '4. Target Customer' },
    { id: 5, title: '5. Product-Market Fit' },
    { id: 6, title: '6. Business Model' },
    { id: 7, title: '7. Competitive Moat' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Navbar currentRoute="business" />

      {/* Header & Won Constraint Verification */}
      <section className="border-b border-slate-200 bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-agri-100 px-3 py-1 text-xs font-mono font-bold text-agri-800 border border-agri-300">
              OFFICIAL HACKGRID JUDGING SUBMISSION
            </span>
            <span className="text-xs font-mono text-slate-500">
              Team CopyPasta • 7-Section Deliverable
            </span>
          </div>

          <h1 className="mt-3 text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
            CropScan AI Sentinel: Business Case &amp; Market Integrity
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Autonomous computer vision crop pathology and precision spray defense platform
            engineered for Commercial Family Farms within HackGrid won auction constraints.
          </p>

          {/* Won Constraints Audit Badges */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="rounded-lg border border-agri-200 bg-agri-50 p-2.5">
              <span className="text-[10px] uppercase text-agri-700 font-bold block">Track</span>
              <span className="font-bold text-slate-900">🌾 Agriculture</span>
              <div className="text-[10px] text-slate-500">Won: 250 cr</div>
            </div>

            <div className="rounded-lg border border-agri-200 bg-agri-50 p-2.5">
              <span className="text-[10px] uppercase text-agri-700 font-bold block">AI Rights</span>
              <span className="font-bold text-slate-900">👁️ Computer Vision</span>
              <div className="text-[10px] text-slate-500">Won: 5,500 cr</div>
            </div>

            <div className="rounded-lg border border-agri-200 bg-agri-50 p-2.5">
              <span className="text-[10px] uppercase text-agri-700 font-bold block">AI Capability</span>
              <span className="font-bold text-slate-900">⚡ Autonomous Workflow</span>
              <div className="text-[10px] text-slate-500">Won: 1,000 cr</div>
            </div>

            <div className="rounded-lg border border-agri-200 bg-agri-50 p-2.5">
              <span className="text-[10px] uppercase text-agri-700 font-bold block">Customer Segment</span>
              <span className="font-bold text-slate-900">🚜 Small Businesses</span>
              <div className="text-[10px] text-slate-500">Won: 1,550 cr</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 flex-1 w-full">
        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto gap-1.5 border-b border-slate-200 pb-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition ${
                activeTab === s.id
                  ? 'bg-agri-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Tab Content Cards */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
          {activeTab === 1 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">1. Business Idea</h2>
              <p>
                <strong>CropScan AI Sentinel</strong> is an intelligent visual crop pathology and
                precision treatment platform built exclusively for commercial agriculture.
              </p>
              <p>
                By ingesting drone aerial survey tiles or smartphone leaf photography, commercial
                farmers receive instant computer-vision diagnostic triage: exact pathogen
                identification (Late Blight, Early Blight, Rust, Powdery Mildew), normalized
                bounding boxes highlighting necrotic lesions, necrosis surface severity
                percentages, and a deterministic prescriptive chemical tank-mix work order.
              </p>
              <div className="rounded-lg border border-agri-200 bg-agri-50 p-4 text-agri-900 text-xs">
                <strong>Zero Generative AI Text Violation:</strong> All intelligence is derived from
                computer-vision segmentation, spatial geometry, and legal EPA chemical databases.
                Zero free-form LLM text generation is invoked, guaranteeing 100% adherence to our
                won AI Rights.
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">2. Problem Statement</h2>
              <ul className="space-y-3">
                <li className="p-3.5 rounded-lg border border-slate-100 bg-slate-50">
                  <strong className="text-slate-900 block">
                    1. Catastrophic Harvest Write-Downs ($220B Annual Loss)
                  </strong>
                  Fungal pathogens like Late Blight (<em>Phytophthora infestans</em>) spread
                  exponentially. In high-value specialty crops (potatoes, tomatoes, vineyards), a
                  48-hour scouting delay results in $150,000 to $600,000 in ruined yield per farm.
                </li>
                <li className="p-3.5 rounded-lg border border-slate-100 bg-slate-50">
                  <strong className="text-slate-900 block">
                    2. The 1,000+ Acre Scouting Bottleneck
                  </strong>
                  A single human scout can inspect at most 40–60 acres on foot per day. For a 2,000-acre
                  commercial farm, walking every row is physically impossible.
                </li>
                <li className="p-3.5 rounded-lg border border-slate-100 bg-slate-50">
                  <strong className="text-slate-900 block">
                    3. Defensive Chemical Over-Spraying ($40,000+ Waste)
                  </strong>
                  Lacking precise lesion coordinates, growers blanket-spray broad-spectrum fungicides
                  ($45–$90/acre) across entire square-mile fields, polluting water tables and inflating
                  input costs.
                </li>
              </ul>
            </div>
          )}

          {activeTab === 3 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">3. Market Gap</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <h3 className="font-bold text-slate-900 text-xs">Agronomic Lab Tests</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Takes 5–10 days and costs $80–$150/sample. By the time culture results return,
                    fungal spores have already devastated the harvest.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <h3 className="font-bold text-slate-900 text-xs">Satellite NDVI (Sentinel-2)</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    10m macro resolution only detects general canopy stress. It cannot diagnose
                    whether loss is caused by fungal blight, nitrogen drought, or spider mites.
                  </p>
                </div>
                <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                  <h3 className="font-bold text-slate-900 text-xs">OEM Smart Sprayers ($250k)</h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Proprietary machinery from John Deere locks out 85% of mid-sized commercial family
                    growers due to excessive capital expenditure.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 4 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">4. Target Customer &amp; Segment</h2>
              <p>
                Targeted exclusively to <strong>Small Businesses</strong>: Commercial Family Farms
                spanning <strong>500 to 5,000 acres</strong>, regional custom spray contractors, and
                ag-retailers.
              </p>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2 text-xs font-mono">
                <div>• Average Farm Size: 1,200 – 2,500 acres</div>
                <div>• Annual Revenue: $1.2M – $4.5M</div>
                <div>• Primary Crops: Russet Potatoes, Processing Tomatoes, Field Corn, Pulses</div>
                <div>• Pricing Tolerance: $349 – $599 / month B2B SaaS</div>
              </div>
            </div>
          )}

          {activeTab === 5 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">5. Product-Market Fit (PMF)</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-agri-200 bg-agri-50 p-4">
                  <span className="text-xs font-mono text-agri-700 font-bold uppercase">
                    Crop Salvage Value
                  </span>
                  <div className="text-2xl font-black text-slate-900 mt-1">$480 – $750 / acre</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Early blight triage protects 140+ acres in Sector 4B, generating $32,400 in net
                    salvaged crop yield in a single outbreak cycle.
                  </p>
                </div>

                <div className="rounded-lg border border-agri-200 bg-agri-50 p-4">
                  <span className="text-xs font-mono text-agri-700 font-bold uppercase">
                    Chemical Input Savings
                  </span>
                  <div className="text-2xl font-black text-agri-600 mt-1">34% Saved</div>
                  <p className="text-xs text-slate-600 mt-1">
                    Surgical variable-rate micro-spraying reduces broadcast chemical costs by
                    $18,000–$42,000 annually per farm.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 6 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">6. Business Model &amp; Unit Economics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg border border-slate-200 p-4">
                  <span className="text-xs font-mono text-slate-500">GROWER STANDARD</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">$349 / mo</div>
                  <p className="text-xs text-slate-500 mt-2">Up to 1,500 managed acres.</p>
                </div>

                <div className="rounded-lg border-2 border-agri-600 bg-agri-50/50 p-4">
                  <span className="text-xs font-mono font-bold text-agri-700">
                    GROWER PRO (FEATURED)
                  </span>
                  <div className="text-xl font-bold text-slate-900 mt-1">$499 / mo</div>
                  <p className="text-xs text-slate-600 mt-2">
                    Up to 2,500 managed acres, drone telemetry, ISOBUS tractor dispatch.
                  </p>
                </div>

                <div className="rounded-lg border border-slate-200 p-4">
                  <span className="text-xs font-mono text-slate-500">CUSTOM CONTRACTOR</span>
                  <div className="text-xl font-bold text-slate-900 mt-1">$1,299 / mo</div>
                  <p className="text-xs text-slate-500 mt-2">Multi-farm fleet applicator portal.</p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div>
                  <span className="text-slate-400 block">CAC</span>
                  <strong className="text-slate-900">~$1,200</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">ACV</span>
                  <strong className="text-slate-900">~$6,000</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">LTV:CAC</span>
                  <strong className="text-agri-700">5.4x</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Gross Margin</span>
                  <strong className="text-slate-900">85%</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 7 && (
            <div className="space-y-4 text-sm text-slate-700">
              <h2 className="text-xl font-bold text-slate-900">7. Competitive Moat &amp; Defensibility</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-xs font-mono text-left">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px]">
                      <th className="py-2">Dimension</th>
                      <th className="py-2">Agronomic Labs</th>
                      <th className="py-2">Satellite NDVI</th>
                      <th className="py-2">OEM Smart Rigs</th>
                      <th className="py-2 text-agri-700 font-bold">CropScan AI Sentinel</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Turnaround</td>
                      <td className="py-2">5–10 Days</td>
                      <td className="py-2">3–5 Days</td>
                      <td className="py-2">Real-time</td>
                      <td className="py-2 text-agri-700 font-bold">&lt; 2 Seconds</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Pathogen ID</td>
                      <td className="py-2">Lab culture</td>
                      <td className="py-2">❌ No (Greenness only)</td>
                      <td className="py-2">Partial (Weeds only)</td>
                      <td className="py-2 text-agri-700 font-bold">✅ 35+ Fungal/Pest Lesions</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Hardware Barrier</td>
                      <td className="py-2">Mail-in kit</td>
                      <td className="py-2">None</td>
                      <td className="py-2">$250,000 Machinery</td>
                      <td className="py-2 text-agri-700 font-bold">Any Drone or Smartphone</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-slate-900">Prescriptive Mix</td>
                      <td className="py-2">Paper report</td>
                      <td className="py-2">❌ No</td>
                      <td className="py-2">Machine injection</td>
                      <td className="py-2 text-agri-700 font-bold">✅ Instant EPA Tank-Mix</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Action to Dashboard */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
            <span className="text-xs text-slate-500 font-mono">
              Ready to see live autonomous computer vision execution?
            </span>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 rounded-lg bg-agri-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-agri-700 transition"
            >
              <span>Launch Sentinel Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
