'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, ArrowUpRight, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  currentRoute?: 'landing' | 'dashboard' | 'business';
}

export default function Navbar({ currentRoute = 'landing' }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-agri-600 text-white transition group-hover:bg-agri-700 shadow-xs">
              <Leaf className="h-5 w-5 fill-current" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                Crop<span className="text-agri-600 font-semibold">Eye</span>
              </span>
            </div>
          </Link>
          <span className="hidden rounded border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-slate-600 sm:inline-block">
            COMMERCIAL FARM EDITION
          </span>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link
            href="/#autonomous-engine"
            className="transition hover:text-agri-600 hover:underline underline-offset-4"
          >
            Autonomous Engine
          </Link>
          <Link
            href="/#telemetry-standard"
            className="transition hover:text-agri-600 hover:underline underline-offset-4"
          >
            Field Telemetry
          </Link>
          <Link
            href="/#pricing"
            className="transition hover:text-agri-600 hover:underline underline-offset-4"
          >
            Agronomic ROI
          </Link>
          <Link
            href="/business"
            className={`transition hover:text-agri-600 ${
              currentRoute === 'business'
                ? 'font-semibold text-agri-600 underline underline-offset-4'
                : ''
            }`}
          >
            Business Model
          </Link>
        </nav>

        {/* Action Button & HackGrid Integrity Badge */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-agri-200 bg-agri-50 px-2.5 py-1 text-xs font-medium text-agri-800">
            <ShieldCheck className="h-3.5 w-3.5 text-agri-600" />
            <span>HackGrid Integrity Verified</span>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-lg bg-agri-600 px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-agri-700 active:scale-[0.98]"
          >
            <span>Open Command Center</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
