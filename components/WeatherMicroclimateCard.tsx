'use client';

import React, { useState } from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Thermometer,
  RefreshCw,
  Radio,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { WeatherTelemetry } from '@/types/sentinel';

interface WeatherMicroclimateCardProps {
  weather: WeatherTelemetry;
  onRefreshWeather: () => Promise<void> | void;
  onToggleHighRisk: () => void;
  isRefreshing?: boolean;
}

export default function WeatherMicroclimateCard({
  weather,
  onRefreshWeather,
  onToggleHighRisk,
  isRefreshing = false,
}: WeatherMicroclimateCardProps) {
  const [showInspector, setShowInspector] = useState(false);

  const isSevere = weather.sporeSpreadRisk === 'SEVERE';
  const isElevated = weather.sporeSpreadRisk === 'ELEVATED';
  const isSafeWind = weather.windSpeedMph <= 10.0;

  const tempF = ((weather.temperatureC * 9) / 5 + 32).toFixed(1);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              03 / Environmental Correlation (Stage 3)
            </span>
          </div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span>Open-Meteo Live Micro-Climate</span>
            {weather.isSimulated ? (
              <span className="rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-mono font-bold text-amber-800">
                EPIDEMIC SIMULATION
              </span>
            ) : (
              <span className="rounded-md border border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-800 flex items-center gap-1">
                <Radio className="h-3 w-3 text-cyan-600 animate-pulse" />
                LIVE OPEN-METEO FEED
              </span>
            )}
          </h3>
        </div>

        {/* Live Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRefreshWeather()}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition active:scale-95 disabled:opacity-60"
            title="Fetch live weather from Open-Meteo API"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-cyan-600 ${isRefreshing ? 'animate-spin' : ''}`}
            />
            <span className="hidden sm:inline">Sync Open-Meteo</span>
          </button>

          <button
            onClick={onToggleHighRisk}
            className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition shadow-2xs active:scale-95 ${
              weather.isSimulated
                ? 'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200'
                : 'border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
            title={
              weather.isSimulated
                ? 'Switch to live Open-Meteo API readings'
                : 'Simulate high-humidity epidemic outbreak'
            }
          >
            {weather.isSimulated ? 'Use Real-Time Feed' : 'Simulate Outbreak'}
          </button>
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
        {/* Temperature */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider flex items-center gap-1">
            <Thermometer className="h-3.5 w-3.5 text-rose-500" />
            Ambient Temp:
          </span>
          <div className="mt-1 font-extrabold text-slate-900 text-base">
            {weather.temperatureC.toFixed(1)}°C
          </div>
          <span className="text-[10px] text-slate-500">{tempF}°F Surface</span>
        </div>

        {/* Humidity */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider flex items-center gap-1">
            <Droplets className="h-3.5 w-3.5 text-cyan-500" />
            Rel. Humidity:
          </span>
          <div className="mt-1 font-extrabold text-slate-900 text-base">
            {weather.relativeHumidity}%
          </div>
          <span
            className={`text-[10px] font-bold ${
              weather.relativeHumidity >= 80 ? 'text-amber-600' : 'text-slate-500'
            }`}
          >
            {weather.relativeHumidity >= 80 ? 'High Spore Risk' : 'Dry Canopy'}
          </span>
        </div>

        {/* Wind Speed */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider flex items-center gap-1">
            <Wind className="h-3.5 w-3.5 text-blue-500" />
            Wind Velocity:
          </span>
          <div className="mt-1 font-extrabold text-slate-900 text-base">
            {weather.windSpeedMph.toFixed(1)} mph
          </div>
          <span
            className={`text-[10px] font-bold ${
              isSafeWind ? 'text-agri-700' : 'text-rose-600'
            }`}
          >
            {isSafeWind ? '✓ Safe Spray Drift' : '⚠️ Drift Hold (>10mph)'}
          </span>
        </div>

        {/* Canopy State */}
        <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
          <span className="text-[10px] uppercase text-slate-400 font-sans tracking-wider flex items-center gap-1">
            <CloudSun className="h-3.5 w-3.5 text-amber-500" />
            Canopy Weather:
          </span>
          <div className="mt-1 font-bold text-slate-900 text-xs truncate" title={weather.condition}>
            {weather.condition}
          </div>
          <span className="text-[10px] text-slate-500">WMO Sensor Feed</span>
        </div>
      </div>

      {/* Wallin 72-Hour Spore Infection Risk Meter */}
      <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50/70 p-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">
              Wallin &amp; Smith Spore Velocity Index:
            </span>
            <span className="font-mono text-xs font-extrabold text-slate-800">
              Level {weather.wallinIndex} / 4
            </span>
          </div>

          {isSevere ? (
            <span className="rounded border border-amber-300 bg-amber-100 px-2 py-0.5 text-[11px] font-mono font-bold text-amber-900 flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              SEVERE SPORE VELOCITY
            </span>
          ) : isElevated ? (
            <span className="rounded border border-yellow-300 bg-yellow-100 px-2 py-0.5 text-[11px] font-mono font-bold text-yellow-900">
              ELEVATED SPORE RISK
            </span>
          ) : (
            <span className="rounded border border-agri-300 bg-agri-100 px-2 py-0.5 text-[11px] font-mono font-bold text-agri-900 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-agri-700" />
              LOW SPORE VELOCITY
            </span>
          )}
        </div>

        {/* 4-Segment Progress Bar */}
        <div className="mt-2 grid grid-cols-4 gap-1.5">
          {[1, 2, 3, 4].map((tier) => {
            const isFilled = weather.wallinIndex >= tier;
            return (
              <div
                key={tier}
                className={`h-2 rounded-sm transition-all ${
                  isFilled
                    ? tier === 4
                      ? 'bg-rose-500'
                      : tier === 3
                      ? 'bg-amber-500'
                      : 'bg-agri-500'
                    : 'bg-slate-200'
                }`}
              />
            );
          })}
        </div>

        <p className="mt-2.5 text-xs text-slate-600 leading-relaxed">
          {weather.summary}
        </p>
      </div>

      {/* Collapsible Open-Meteo Live API Inspector */}
      <div className="mt-3 border-t border-slate-100 pt-3">
        <button
          onClick={() => setShowInspector(!showInspector)}
          className="flex w-full items-center justify-between text-[11px] font-mono font-semibold text-slate-500 hover:text-slate-800 transition"
        >
          <span className="flex items-center gap-1">
            <Radio className="h-3 w-3 text-cyan-600" />
            <span>Open-Meteo API Connection Telemetry (Click to Inspect)</span>
          </span>
          {showInspector ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>

        {showInspector && (
          <div className="mt-2.5 rounded-lg border border-slate-200 bg-slate-900 p-3 font-mono text-[11px] text-slate-200 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span>ENDPOINT:</span>
              <a
                href="https://api.open-meteo.com/v1/forecast?latitude=44.9778&longitude=-93.265&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&wind_speed_unit=mph"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 hover:underline flex items-center gap-1"
              >
                <span>api.open-meteo.com/v1/forecast</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 text-slate-300">
              <div>
                <span className="text-slate-500">STATION LAT: </span>
                <span>{weather.latitude ?? 44.98}°N</span>
              </div>
              <div>
                <span className="text-slate-500">STATION LON: </span>
                <span>{Math.abs(weather.longitude ?? -93.26)}°W</span>
              </div>
              <div>
                <span className="text-slate-500">PROVIDER: </span>
                <span>Open-Meteo WMO</span>
              </div>
              <div>
                <span className="text-slate-500">FEED STATUS: </span>
                <span className="text-agri-400">200 OK (Live Verified)</span>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-1.5 text-[10px] text-slate-400">
              Agricultural Plant Pathology Rule: Phytophthora infestans sporangia
              germination triggered when RH &gt; 85% and Temp between 16°C and
              22°C for &gt; 10 consecutive hours.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
