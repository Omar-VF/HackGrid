'use client';

import React from 'react';
import Link from 'next/link';
import { Leaf, Wind, Droplets, Thermometer, Compass, Home } from 'lucide-react';
import { WeatherTelemetry } from '@/types/sentinel';

interface TelemetryBarProps {
  farmName: string;
  totalAcreage: number;
  activeSector: string;
  weather: WeatherTelemetry;
  isAgentActive: boolean;
}

export default function TelemetryBar({
  farmName,
  totalAcreage,
  activeSector,
  weather,
  isAgentActive,
}: TelemetryBarProps) {
  return (
    <div className="w-full border-b border-slate-200 bg-white shadow-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Farm Identification */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 group text-slate-900">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-agri-600 text-white group-hover:bg-agri-700 transition">
              <Leaf className="h-4 w-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-slate-900 text-sm sm:text-base">
                  CropScan <span className="text-agri-600">AI Sentinel</span>
                </span>
                <span className="rounded border border-slate-200 bg-slate-100 px-1.5 py-0.2 text-[10px] font-mono font-medium text-slate-600">
                  CAB V4.2
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {farmName} •{' '}
                <span className="font-semibold text-slate-700">
                  {totalAcreage.toLocaleString()} Total Acres
                </span>
              </p>
            </div>
          </Link>
        </div>

        {/* Center: Live Micro-climate Telemetry & Agent Status */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-1.5 text-slate-700">
            <span className="flex items-center gap-1 text-slate-600">
              <Thermometer className="h-3.5 w-3.5 text-slate-500" />
              <strong className="text-slate-900 font-semibold">
                {weather.temperatureC.toFixed(1)}°C
              </strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Droplets className="h-3.5 w-3.5 text-slate-500" />
              <strong className="text-slate-900 font-semibold">
                {weather.relativeHumidity}% Humidity
              </strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 text-slate-600">
              <Wind className="h-3.5 w-3.5 text-slate-500" />
              <strong className="text-slate-900 font-semibold">
                Wind: {weather.windSpeedMph.toFixed(1)} mph NW
              </strong>
            </span>
          </div>

          {/* Severe Spore Velocity Badge */}
          <div className="rounded-md border border-amber-300 bg-amber-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-amber-800 shadow-2xs">
            [ SEVERE SPORE VELOCITY ]
          </div>

          {/* Autonomous Agent Status */}
          <div className="flex items-center gap-1.5 rounded-md border border-agri-200 bg-agri-50 px-2.5 py-1 text-[11px] font-bold text-agri-800">
            <span
              className={`inline-block h-2 w-2 rounded-full ${
                isAgentActive ? 'bg-agri-500 animate-pulse' : 'bg-slate-400'
              }`}
            />
            <span>[ ● AGENT ACTIVE ]</span>
          </div>
        </div>

        {/* Right: Active Field Sector Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-700">
            <Compass className="h-3.5 w-3.5 text-agri-600" />
            <span>
              Active Sector: <strong className="text-slate-900">{activeSector}</strong>
            </span>
          </div>

          <Link
            href="/"
            title="Return to Public Landing Page"
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition"
          >
            <Home className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
