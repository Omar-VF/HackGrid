'use client';

import React, { useState, useEffect } from 'react';
import {
  WorkOrderTicket,
  PathogenId,
  PipelineStageInfo,
} from '@/types/sentinel';
import {
  MOCK_WORK_ORDER,
  INITIAL_PIPELINE_STAGES,
  SAMPLE_DIAGNOSTICS,
  executeAutonomousWorkflow,
  getLiveWeather,
  getSimulatedHighRiskWeather,
} from '@/lib';
import TelemetryBar from '@/components/TelemetryBar';
import AutonomousPipeline from '@/components/AutonomousPipeline';
import VisionCanvas from '@/components/VisionCanvas';
import WeatherMicroclimateCard from '@/components/WeatherMicroclimateCard';
import PrescriptionCard from '@/components/PrescriptionCard';
import WorkOrderDispatch from '@/components/WorkOrderDispatch';
import ROICounter from '@/components/ROICounter';
import WorkOrderModal from '@/components/WorkOrderModal';

export default function DashboardPage() {
  const [ticket, setTicket] = useState<WorkOrderTicket>(MOCK_WORK_ORDER);
  const [stages, setStages] = useState<PipelineStageInfo[]>(
    INITIAL_PIPELINE_STAGES.map((s) => ({ ...s, status: 'completed' }))
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [cycleTime, setCycleTime] = useState<string>('2.4S');
  const [isWeatherRefreshing, setIsWeatherRefreshing] = useState<boolean>(false);

  // Fetch live Open-Meteo microclimate telemetry on mount
  useEffect(() => {
    handleRefreshWeather();
  }, []);

  const handleRefreshWeather = async () => {
    setIsWeatherRefreshing(true);
    try {
      const liveWeather = await getLiveWeather();
      setTicket((prev) => ({
        ...prev,
        weather: liveWeather,
      }));
    } catch (err) {
      console.warn('Initial live weather fetch notice:', err);
    } finally {
      setIsWeatherRefreshing(false);
    }
  };

  const handleToggleHighRisk = () => {
    if (ticket.weather.isSimulated) {
      handleRefreshWeather();
    } else {
      const sim = getSimulatedHighRiskWeather();
      setTicket((prev) => ({
        ...prev,
        weather: sim,
      }));
    }
  };

  const runAutonomousScan = async (sampleId: PathogenId, customData?: string) => {
    if (isRunning) return;
    setIsRunning(true);

    const start = Date.now();
    try {
      const response = await executeAutonomousWorkflow({
        request: {
          sampleId,
          customImageData: customData || null,
          sectorId: 'Sector 4B - North Quadrant',
          acreage: 140,
          farmName: 'Oak Ridge Commercial Farm',
        },
        stepDelayMs: 380, // Visual delay per stage for demo visualization
        onStageUpdate: (updatedStage) => {
          setStages((prev) =>
            prev.map((s) => (s.stage === updatedStage.stage ? updatedStage : s))
          );
        },
      });

      if (response.success) {
        setTicket(response.ticket);
        setStages(response.stages);
      }
    } catch (err) {
      console.error('Autonomous workflow execution error:', err);
    } finally {
      const durationSeconds = ((Date.now() - start) / 1000).toFixed(1);
      setCycleTime(`${durationSeconds}S`);
      setIsRunning(false);
    }
  };

  const handleSelectSample = (sampleId: PathogenId) => {
    if (sampleId in SAMPLE_DIAGNOSTICS) {
      setTicket((prev) => ({
        ...prev,
        diagnostic: SAMPLE_DIAGNOSTICS[sampleId],
      }));
    }
    runAutonomousScan(sampleId);
  };

  const handleCustomImageCapture = (imageDataUrl: string) => {
    setTicket((prev) => ({
      ...prev,
      diagnostic: {
        ...prev.diagnostic,
        imageUrl: imageDataUrl,
        boundingBoxes: [],
        foliarMaskUrl: undefined,
      },
    }));
    runAutonomousScan('potato_late_blight', imageDataUrl);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Telemetry Header Bar */}
      <TelemetryBar
        farmName="Oak Ridge Commercial Farm"
        totalAcreage={1850}
        activeSector="4B (140 Acres Russet Potatoes)"
        weather={ticket.weather}
        isAgentActive={!isRunning}
        onRefreshWeather={handleRefreshWeather}
        isWeatherRefreshing={isWeatherRefreshing}
      />

      {/* Main Command Center Cockpit Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* 5-Stage Autonomous Progress Stepper */}
        <AutonomousPipeline
          stages={stages}
          isRunning={isRunning}
          onTriggerRun={() => runAutonomousScan(ticket.diagnostic.pathogenId)}
          cycleTime={cycleTime}
        />

        {/* Two-Column Cockpit Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Computer Vision Leaf Inspector (7 cols) */}
          <div className="lg:col-span-7">
            <VisionCanvas
              diagnostic={ticket.diagnostic}
              onSelectSample={handleSelectSample}
              onCustomImageCapture={handleCustomImageCapture}
              isAnalyzing={isRunning}
            />
          </div>

          {/* Right Column: Prescriptive Defense, Work Order & ROI (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 02: Open-Meteo Micro-Climate Telemetry (Stage 3) */}
            <WeatherMicroclimateCard
              weather={ticket.weather}
              onRefreshWeather={handleRefreshWeather}
              onToggleHighRisk={handleToggleHighRisk}
              isRefreshing={isWeatherRefreshing}
            />

            {/* Card 03: Deterministic EPA Tank-Mix */}
            <PrescriptionCard
              prescription={ticket.prescription}
              acreage={ticket.acreage}
            />

            {/* Card 03: Tractor Work-Order Dispatch */}
            <WorkOrderDispatch
              ticket={ticket}
              onOpenPdfModal={() => setIsModalOpen(true)}
            />

            {/* Card 04: Financial & Environmental ROI */}
            <ROICounter
              cropSavedUsd={ticket.estimatedCropSavedUsd}
              chemicalSavingsPct={ticket.chemicalSavingsPct}
              carbonOffsetKg={142}
              groundwaterStatus="GROUNDWATER BUFFER: COMPLIANT"
            />
          </div>
        </div>
      </main>

      {/* Printable Work-Order Ticket Modal */}
      <WorkOrderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        ticket={ticket}
      />
    </div>
  );
}
