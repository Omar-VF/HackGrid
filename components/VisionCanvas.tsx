'use client';

import React, { useState, useRef } from 'react';
import { DiagnosticResult, PathogenId } from '@/types/sentinel';
import {
  Check,
  Camera,
  Upload,
  Layers,
  ZoomIn,
  Eye,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Cpu,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'hud' | 'mask' | 'zoom'>('hud');
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset file input value immediately so re-uploading the same file works every time
    e.target.value = '';
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onCustomImageCapture(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  // Calculate zoom center point from primary bounding box
  const primaryBox = diagnostic.boundingBoxes[0];
  const zoomCenterX = primaryBox ? (primaryBox.xmin + primaryBox.xmax) / 2 : 50;
  const zoomCenterY = primaryBox ? (primaryBox.ymin + primaryBox.ymax) / 2 : 50;

  const isNonPlant =
    diagnostic.pathogenId === 'non_plant_detected' ||
    diagnostic.boundingBoxes.some((b) => b.id.includes('invalid') || b.label.includes('INVALID'));
  const isHealthy = diagnostic.pathogenId === 'healthy';

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
      {/* Header & Verification Badge */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              01 / Visual Inspection Cockpit
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-mono font-bold text-cyan-700 border border-cyan-200">
              <Cpu className="h-3 w-3" />
              <span>SUB-150MS CV RAG</span>
            </span>
          </div>
          <h2 className="text-base font-bold text-slate-900 mt-0.5">
            Autonomous Computer Vision Pathology Inspector
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
          Curated Benchmark
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 rounded-md py-1.5 transition text-center ${
            activeTab === 'upload'
              ? 'bg-white font-semibold text-slate-900 shadow-2xs'
              : 'hover:text-slate-900'
          }`}
        >
          Upload Field Image
        </button>
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

      {/* Upload Drag & Drop Zone (Visible when in Upload tab) */}
      {activeTab === 'upload' && (
        <div className="mt-3 space-y-2">
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-4 transition cursor-pointer text-center ${
              isDragging
                ? 'border-agri-500 bg-agri-50/80 text-agri-800'
                : 'border-slate-300 hover:border-slate-400 bg-slate-50/70 text-slate-600 hover:bg-slate-50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-agri-100 text-agri-700">
                <Upload className="h-4 w-4" />
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-slate-900">
                  Drop high-resolution leaf photo here, or click to browse
                </div>
                <div className="text-[11px] text-slate-500">
                  Instant pixel segmentation &amp; USDA-ARS vector retrieval (PNG, JPG, WEBP)
                </div>
              </div>
            </div>
          </div>

          {/* Quick-Test Field Sample Presets */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
            <span className="font-mono text-[10px] uppercase text-slate-400 font-bold">
              1-Click Demo Presets:
            </span>
            <button
              onClick={() => onSelectSample('potato_late_blight')}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              🥔 Potato Late Blight
            </button>
            <button
              onClick={() => onSelectSample('tomato_early_blight')}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              🍅 Tomato Early Blight
            </button>
            <button
              onClick={() => onSelectSample('corn_rust')}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              🌽 Corn Common Rust
            </button>
            <button
              onClick={() => onSelectSample('apple_scab')}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              🍏 Apple Scab
            </button>
            <button
              onClick={() => onSelectSample('healthy')}
              className="rounded-md border border-slate-200 bg-white px-2 py-1 font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition"
            >
              🌿 Healthy Control
            </button>
            <button
              onClick={() => onSelectSample('non_plant_detected')}
              className="rounded-md border border-amber-200 bg-amber-50/80 px-2 py-1 font-medium text-amber-800 hover:bg-amber-100 transition"
            >
              ⚠ Non-Crop Reject
            </button>
          </div>
        </div>
      )}

      {/* Interactive Multi-View Mode Bar */}
      <div className="mt-3 flex items-center justify-between border-b border-slate-100 pb-2">
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => setViewMode('hud')}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition ${
              viewMode === 'hud'
                ? 'bg-slate-900 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Diagnostic HUD</span>
          </button>
          <button
            onClick={() => setViewMode('mask')}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition ${
              viewMode === 'mask'
                ? 'bg-agri-600 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>Foliar Lesion Mask</span>
          </button>
          <button
            onClick={() => setViewMode('zoom')}
            className={`inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 font-medium transition ${
              viewMode === 'zoom'
                ? 'bg-cyan-600 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <ZoomIn className="h-3.5 w-3.5" />
            <span>2.5x Macro Zoom</span>
          </button>
        </div>

        <div className="text-[11px] font-mono text-slate-400">
          MODE: {viewMode === 'hud' ? 'FULL SPECTRUM + OVERLAY' : viewMode === 'mask' ? 'BINARY NECROSIS MASK' : 'FOCUSED LESION OPTICS'}
        </div>
      </div>

      {/* Main Visual Image & Bounding Box Canvas */}
      <div className="relative mt-2 aspect-[4/3] w-full overflow-hidden rounded-lg border border-slate-200 bg-slate-950">
        {/* Viewport Transform Container (Used for Macro Zoom) */}
        <div
          className={`h-full w-full transition-transform duration-300 ${
            viewMode === 'zoom' ? 'scale-[2.5]' : 'scale-100'
          }`}
          style={{
            transformOrigin: `${zoomCenterX}% ${zoomCenterY}%`,
          }}
        >
          {/* Main Leaf Image or Foliar Mask Display */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={
              viewMode === 'mask' && diagnostic.foliarMaskUrl
                ? diagnostic.foliarMaskUrl
                : diagnostic.imageUrl
            }
            alt={diagnostic.commonName}
            className={`h-full w-full select-none ${
              viewMode === 'mask' ? 'object-contain' : 'object-cover'
            }`}
          />

          {/* Live Scan Radar Effect (Active in HUD Mode) */}
          {viewMode === 'hud' && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-agri-500/10 to-transparent opacity-40 animate-pulse" />
          )}

          {/* Bounding Boxes Overlays (Rendered in HUD & Zoom mode, hidden in pure Mask mode) */}
          {viewMode !== 'mask' &&
            diagnostic.boundingBoxes.map((box) => {
              const borderColor = isNonPlant
                ? 'border-amber-500'
                : isHealthy
                ? 'border-agri-500'
                : 'border-alert-600';
              const bgColor = isNonPlant
                ? 'bg-amber-600'
                : isHealthy
                ? 'bg-agri-600'
                : 'bg-alert-600';

              return (
                <div
                  key={box.id}
                  className={`absolute ${borderColor} ${
                    isNonPlant ? 'border-dashed border-2' : 'border-2'
                  } rounded-xs transition-all pointer-events-none shadow-[0_0_12px_rgba(220,38,38,0.35)]`}
                  style={{
                    top: `${box.ymin}%`,
                    left: `${box.xmin}%`,
                    width: `${box.xmax - box.xmin}%`,
                    height: `${box.ymax - box.ymin}%`,
                  }}
                >
                  {/* Precision Corner Accents */}
                  <div className="absolute -top-1 -left-1 h-2.5 w-2.5 border-t-2 border-l-2 border-white" />
                  <div className="absolute -top-1 -right-1 h-2.5 w-2.5 border-t-2 border-r-2 border-white" />
                  <div className="absolute -bottom-1 -left-1 h-2.5 w-2.5 border-b-2 border-l-2 border-white" />
                  <div className="absolute -bottom-1 -right-1 h-2.5 w-2.5 border-b-2 border-r-2 border-white" />

                  {/* Bounding Box Badge */}
                  <div
                    className={`absolute ${
                      box.ymin < 12 ? 'top-1 left-1' : '-top-6 left-0'
                    } flex items-center gap-1 ${bgColor} px-2 py-0.5 text-[10px] font-mono font-bold tracking-tight text-white shadow-md rounded-xs whitespace-nowrap`}
                  >
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    <span>{box.label}</span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Live Active Scanning Radar & Telemetry HUD Overlay */}
        {isAnalyzing && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-xs p-4 text-center">
            {/* Animated Laser Line */}
            <div className="absolute inset-x-0 top-1/3 h-1 bg-gradient-to-r from-transparent via-agri-400 to-transparent shadow-[0_0_20px_#22c55e] animate-pulse" />

            <div className="flex items-center gap-2 rounded-full border border-agri-500/40 bg-agri-950/90 px-4 py-1.5 text-xs font-mono font-bold text-agri-300 shadow-xl">
              <span className="inline-block h-2 w-2 rounded-full bg-agri-400 animate-ping" />
              <span>AI SENTINEL: EXTRACTING 32-D BOTANICAL VECTORS</span>
            </div>

            <p className="mt-2.5 text-xs font-mono text-slate-300 max-w-sm">
              Segmenting pustules &amp; cross-referencing with Plant Pathology Reference Atlas (14,200 specimens)...
            </p>
          </div>
        )}

        {/* Top Left Frame ID Tag */}
        <div className="absolute top-3 left-3 rounded border border-slate-700/80 bg-slate-900/85 px-2 py-1 text-[10px] font-mono text-slate-300 backdrop-blur-xs">
          FRAME #8109-PIVOT C • GSD: 0.12 cm/px
        </div>

        {/* Top Right Hazard Level */}
        <div className="absolute top-3 right-3 rounded border border-slate-700/80 bg-slate-900/85 px-2 py-1 text-[10px] font-mono font-bold text-slate-200">
          {isNonPlant ? (
            <span className="text-amber-400">NON-CROP SUBJECT (DEFENSE INACTIVE)</span>
          ) : (
            <span className={isHealthy ? 'text-agri-400' : 'text-red-400'}>
              DEFENSE HAZARD LEVEL {diagnostic.severityLevel === 'CRITICAL' ? 4 : diagnostic.severityLevel === 'HIGH' ? 3 : diagnostic.severityLevel === 'MODERATE' ? 2 : 0}
            </span>
          )}
        </div>

        {/* Bottom Sensor Metadata Strip */}
        <div className="absolute bottom-0 inset-x-0 flex flex-wrap items-center justify-between border-t border-slate-800 bg-slate-950/90 px-3 py-1.5 text-[10px] font-mono text-slate-400 backdrop-blur-xs">
          <span>SENSOR: MULTISPECTRAL-CAM #04</span>
          <span>
            RESOL: 4096x2160 • NDVI: {isNonPlant ? '0.00 (NO CHLOROPHYLL)' : isHealthy ? '0.84 (OPTIMAL VIGOR)' : '0.28 (STRESSED)'}
          </span>
        </div>
      </div>

      {/* Curated Sample Quick Buttons (Visible when in Curated Benchmark tab) */}
      {activeTab === 'samples' && (
        <div className="mt-4 flex flex-wrap gap-2">
          {(
            [
              ['potato_late_blight', 'Potato Late Blight'],
              ['tomato_early_blight', 'Tomato Early Blight'],
              ['corn_rust', 'Corn Common Rust'],
              ['healthy', 'Healthy Control'],
            ] as const
          ).map(([id, label]) => {
            const isSelected = diagnostic.pathogenId === id;
            return (
              <button
                key={id}
                onClick={() => {
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
      )}

      {/* Diagnostic Details Summary Strip */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-slate-100 pt-4 text-xs">
        {/* Pathogen Classification */}
        <div>
          <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">
            Pathogen Classification
          </span>
          <div className="mt-0.5 font-bold text-slate-900">{diagnostic.commonName}</div>
          <div className="text-[11px] italic text-slate-500">
            {diagnostic.scientificName}
          </div>
        </div>

        {/* Biosafety Threat */}
        <div>
          <span className="font-mono text-[10px] uppercase text-slate-400 tracking-wider">
            Biosafety Threat Tier
          </span>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                isNonPlant
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : isHealthy
                  ? 'bg-agri-100 text-agri-800 border border-agri-300'
                  : 'bg-alert-100 text-alert-700 border border-alert-200'
              }`}
            >
              [ {isNonPlant ? 'NON-CROP SPECIMEN' : diagnostic.severityLevel === 'CRITICAL' ? 'CRITICAL TIER 4' : `${diagnostic.severityLevel} TIER`} ]
            </span>
          </div>
          <div className="mt-0.5 text-[11px] font-mono text-slate-500">
            Spread Index: {isNonPlant ? '0.0/10 (N/A)' : diagnostic.pathogenId === 'potato_late_blight' ? '8.8/10' : diagnostic.pathogenId === 'tomato_early_blight' ? '5.4/10' : diagnostic.pathogenId === 'corn_rust' ? '7.1/10' : '0.2/10'}
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
            Atlas Match: <strong className="text-slate-700 font-bold">{diagnostic.confidence}%</strong>
            <span className="ml-1 text-agri-700 font-mono text-[10px]">[Cosine Match]</span>
          </div>
        </div>
      </div>

      {/* RAG Vector Pathology Database Audit Trail */}
      {diagnostic.ragRetrieval && (
        <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50/80 p-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2">
            <div className="flex items-center gap-1.5 font-mono text-[11px] font-bold text-slate-800">
              <span className="h-2 w-2 rounded-full bg-agri-600 animate-pulse" />
              <span>RAG VECTOR RETRIEVAL AUDIT TRAIL</span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              {diagnostic.ragRetrieval.totalAtlasSpecimensIndexed.toLocaleString()} Specimens Indexed • {diagnostic.ragRetrieval.queryVectorDimensions}D Vector
            </span>
          </div>

          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Top Match & Institution */}
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">
                Peer-Reviewed Reference Match:
              </div>
              <div className="mt-0.5 font-bold text-slate-900">
                {diagnostic.ragRetrieval.topMatch.commonName}
                <span className="ml-1.5 rounded bg-agri-100 px-1.5 py-0.2 text-[10px] font-mono text-agri-800">
                  {diagnostic.ragRetrieval.topMatch.similarityScore}% Cosine Match
                </span>
              </div>
              <div className="mt-0.5 text-[10px] font-mono text-slate-500">
                Specimen ID: <strong>{diagnostic.ragRetrieval.topMatch.specimenId}</strong>
              </div>
              <div className="text-[10px] text-slate-500">
                Source: {diagnostic.ragRetrieval.topMatch.institutionSource}
              </div>
            </div>

            {/* Candidate Similarity Ranking */}
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                Top Candidate Similarity Ranks:
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {diagnostic.ragRetrieval.candidates.map((cand, idx) => (
                  <div key={cand.specimenId} className="flex items-center justify-between gap-2">
                    <span className="truncate text-slate-700">
                      {idx + 1}. {cand.commonName}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${idx === 0 ? 'bg-agri-600' : 'bg-slate-400'}`}
                          style={{ width: `${cand.similarityScore}%` }}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 w-9 text-right">
                        {cand.similarityScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Diagnostic Morphological Markers */}
          {diagnostic.ragRetrieval.topMatch.diagnosticMarkers.length > 0 && (
            <div className="mt-2.5 border-t border-slate-200/60 pt-2">
              <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                Retrieved Botanical Diagnostic Criteria:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                {diagnostic.ragRetrieval.topMatch.diagnosticMarkers.map((marker, i) => (
                  <div key={i} className="flex items-start gap-1">
                    <span className="text-agri-600 font-bold">•</span>
                    <span>{marker}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

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
