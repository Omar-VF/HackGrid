'use client';

import React, { useState } from 'react';
import { DiagnosticResult, PathogenId } from '@/types/sentinel';
import { SAMPLE_DIAGNOSTICS } from '@/lib/sample-data';
import { Check, Camera, Upload } from 'lucide-react';
import { CameraCapture } from './CameraCapture';

interface VisionCanvasProps {
  diagnostic: DiagnosticResult;
  onSelectSample: (sampleId: PathogenId) => void;
  onCustomImageCapture: (imageDataUrl: string) => void;
  isAnalyzing?: boolean;
}

export default function VisionCanvas({
  diagnostic,
  onSelectSample,
  onCustomImageCapture,
  isAnalyzing = false,
}: VisionCanvasProps) {
  const [activeTab, setActiveTab] = useState<'samples' | 'upload' | 'camera'>('samples');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onCustomImageCapture(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header & Verification Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            01 / Visual Inspection
          </span>
          <h2 className="text-base font-bold text-slate-900">
            Computer Vision Leaf Inspector
          </h2>
        </div>
        <div className="flex items-center gap-1 text-xs font-semibold text-agri-700">
          <Check className="h-4 w-4 text-agri-600 stroke-[2.5]" />
          <span>Capture verified</span>
        </div>
      </div>

      {/* Segmented Mode Control */}
      <div className="mt-4 flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-100/70 p-1 text-xs font-medium text-slate-600">
        <button
          onClick={() => setActiveTab('samples')}
          className={`flex-1 rounded-md py-1.5 transition text-center ${
            activeTab === 'samples'
              ? 'bg-white font-semibold text-slate-900 shadow-2xs'
              : 'hover:text-slate-900'
          }`}
        >
          Curated Samples
        </button>
        <label
          onClick={() => setActiveTab('upload')}
          className={`flex-1 cursor-pointer rounded-md py-1.5 transition text-center ${
            activeTab === 'upload'
              ? 'bg-white font-semibold text-slate-900 shadow-2xs'
              : 'hover:text-slate-900'
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          Upload Field Image
        </label>
        <button
          onClick={() => {
            setActiveTab('camera');
            setIsCameraOpen(true);
          }}
          className={`flex-1 rounded-md py-1.5 transition text-center ${
            activeTab === 'camera'
              ? 'bg-white font-semibold text-slate-900 shadow-2xs'
              : 'hover:text-slate-900'
          }`}
        >
          Live Drone Stream
        </button>
      </div>

      {/* Main Visual Image & Bounding Box Canvas */}
      <div className="relative mt-4 aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-900">
        {/* Leaf Image / SVG Display */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={diagnostic.imageUrl}
          alt={diagnostic.commonName}
          className="h-full w-full object-cover select-none"
        />

        {/* Live Scan Radar Effect */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-agri-500/10 to-transparent opacity-40 animate-pulse" />

        {/* Live Active Scanning Radar & Telemetry HUD */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 text-center">
            {/* Laser Line */}
            <div className="absolute inset-x-0 top-1/3 h-1 bg-gradient-to-r from-transparent via-agri-400 to-transparent shadow-[0_0_15px_#22c55e] animate-pulse" />
            
            <div className="flex items-center gap-2 rounded-full border border-agri-500/40 bg-agri-950/80 px-4 py-1.5 text-xs font-mono font-bold text-agri-300 shadow-lg">
              <span className="inline-block h-2 w-2 rounded-full bg-agri-400 animate-ping" />
              <span>AI SENTINEL: MATCHING MORPHOLOGY VS PLANT DATASET</span>
            </div>

            <p className="mt-2.5 text-xs font-mono text-slate-300 max-w-sm">
              Extracting leaf geometry, segmenting pustules &amp; cross-referencing with Plant Pathology Reference Atlas...
            </p>
          </div>
        )}

        {/* Bounding Boxes Overlays */}
        {diagnostic.boundingBoxes.map((box) => {
          const isHealthy = diagnostic.pathogenId === 'healthy';
          const borderColor = isHealthy ? 'border-agri-500' : 'border-alert-600';
          const bgColor = isHealthy ? 'bg-agri-600' : 'bg-alert-600';

          return (
            <div
              key={box.id}
              className={`absolute ${borderColor} border-2 rounded-xs transition-all pointer-events-none`}
              style={{
                top: `${box.ymin}%`,
                left: `${box.xmin}%`,
                width: `${box.xmax - box.xmin}%`,
                height: `${box.ymax - box.ymin}%`,
              }}
            >
              {/* Bounding Box Badge */}
              <div
                className={`absolute ${
                  box.ymin < 12 ? "top-1 left-1" : "-top-6 left-0"
                } flex items-center gap-1 ${bgColor} px-2 py-0.5 text-[10px] font-mono font-bold tracking-tight text-white shadow-md rounded-xs whitespace-nowrap`}
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                <span>{box.label}</span>
              </div>
            </div>
          );
        })}

        {/* Top Left Frame ID Tag */}
        <div className="absolute top-3 left-3 rounded border border-slate-700/80 bg-slate-900/85 px-2 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-xs">
          FRAME #8109-PIVOT C • GSD: 0.12 cm/px
        </div>

        {/* Top Right Hazard Level */}
        <div className="absolute top-3 right-3 rounded border border-red-700/80 bg-red-950/80 px-2 py-1 text-[10px] font-mono font-bold text-red-300">
          DEFENSE HAZARD LEVEL {diagnostic.severityLevel === 'CRITICAL' ? 4 : diagnostic.severityLevel === 'HIGH' ? 3 : diagnostic.severityLevel === 'MODERATE' ? 2 : 0}
        </div>

        {/* Bottom Sensor Metadata Strip */}
        <div className="absolute bottom-0 inset-x-0 flex flex-wrap items-center justify-between border-t border-slate-800 bg-slate-950/90 px-3 py-1.5 text-[10px] font-mono text-slate-400 backdrop-blur-xs">
          <span>SENSOR: MULTISPECTRAL-CAM #04</span>
          <span>RESOL: 4096x2160 • NDVI: {diagnostic.pathogenId === 'healthy' ? '0.82 (OPTIMAL VIGOR)' : '0.28 (STRESSED)'}</span>
        </div>
      </div>

      {/* Curated Sample Selection Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(
          [
            ['potato_late_blight', 'Potato Late Blight'],
            ['tomato_early_blight', 'Tomato Early Blight'],
            ['corn_rust', 'Corn Common Rust'],
            ['healthy', 'Healthy Control'],
          ] as const
        ).map(([id, label]) => {
          const isSelected = diagnostic.pathogenId === id && activeTab === 'samples';
          return (
            <button
              key={id}
              onClick={() => {
                setActiveTab('samples');
                onSelectSample(id);
              }}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                isSelected
                  ? 'border-agri-600 bg-agri-50 text-agri-800 shadow-2xs'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isSelected ? 'bg-agri-600' : 'bg-slate-300'
                }`}
              />
              <span>{label}</span>
              {isSelected && <span className="text-[10px] font-normal text-agri-700">(Selected)</span>}
            </button>
          );
        })}
      </div>

      {/* Diagnostic Details Summary Strip */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs">
        {/* Pathogen Classification */}
        <div>
          <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">
            Pathogen Classification
          </span>
          <div className="mt-0.5 font-bold text-slate-900">{diagnostic.commonName}</div>
          <div className="text-[11px] italic text-slate-500">{diagnostic.scientificName}</div>
        </div>

        {/* Biosafety Threat */}
        <div>
          <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">
            Biosafety Threat
          </span>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                diagnostic.pathogenId === 'healthy'
                  ? 'bg-agri-100 text-agri-800 border border-agri-300'
                  : 'bg-alert-100 text-alert-700 border border-alert-200'
              }`}
            >
              [ {diagnostic.severityLevel === 'CRITICAL' ? 'CRITICAL TIER 3' : diagnostic.severityLevel} ]
            </span>
          </div>
          <div className="mt-0.5 text-[11px] font-mono text-slate-500">
            Spread Index: {diagnostic.pathogenId === 'potato_late_blight' ? '8.8/10' : diagnostic.pathogenId === 'tomato_early_blight' ? '5.4/10' : diagnostic.pathogenId === 'corn_rust' ? '7.1/10' : '0.2/10'}
          </div>
        </div>

        {/* Canopy Degradation */}
        <div>
          <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">
            Canopy Degradation
          </span>
          <div className="mt-0.5 text-sm font-bold text-slate-900">
            {diagnostic.necrosisPercentage}% Affected Surface Area
          </div>
          <div className="text-[11px] text-slate-500">
            Model Confidence: <strong className="text-slate-700">{diagnostic.confidence}%</strong>
          </div>
        </div>
      </div>

      {/* Camera Capture Modal Integration */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={(dataUrl) => {
          onCustomImageCapture(dataUrl);
          setIsCameraOpen(false);
        }}
      />
    </div>
  );
}
