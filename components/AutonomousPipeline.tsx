'use client';

import React from 'react';
import { Check, Loader2, Play } from 'lucide-react';
import { PipelineStageInfo } from '@/types/sentinel';

interface AutonomousPipelineProps {
  stages: PipelineStageInfo[];
  isRunning: boolean;
  onTriggerRun: () => void;
  cycleTime?: string;
}

export default function AutonomousPipeline({
  stages,
  isRunning,
  onTriggerRun,
  cycleTime = '2.4S',
}: AutonomousPipelineProps) {
  // Map stage subtitles matching design/page2.pdf
  const stageSubtitles: Record<number, string> = {
    1: 'Tile #4410 • Orthomosaic Sync',
    2: 'Late Blight Confirmed (96.4%)',
    3: '72h Spore Velocity High',
    4: 'Chlorothalonil 720 SC @ 1.5 pt/ac',
    5: 'Work-Order #WO-0941 Compiled',
  };

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        {/* Stages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 flex-1">
          {stages.map((stage) => {
            const isDone = stage.status === 'completed';
            const isActive = stage.status === 'running';

            return (
              <div
                key={stage.stage}
                className={`flex items-start gap-2.5 rounded-lg border p-2.5 transition-all ${
                  isActive
                    ? 'border-agri-500 bg-agri-50/60 shadow-xs'
                    : isDone
                    ? 'border-slate-200 bg-slate-50/70 hover:bg-slate-50'
                    : 'border-slate-100 bg-white opacity-60'
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-agri-600 text-white'
                      : isActive
                      ? 'bg-agri-500 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {isActive ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : isDone ? (
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  ) : (
                    stage.stage
                  )}
                </div>

                {/* Step Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {stage.stage}. {stage.name}
                    </span>
                    {isDone && <span className="text-[10px] text-agri-600 font-bold">✓</span>}
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 truncate leading-tight mt-0.5" title={stage.detail}>
                    {stage.detail || stageSubtitles[stage.stage]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Tag & Re-run Trigger */}
        <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 lg:pl-3 lg:border-l lg:border-slate-200">
          <div className="rounded-lg border border-agri-300 bg-agri-50 px-3 py-2 text-xs font-mono font-bold text-agri-800 shadow-2xs">
            {isRunning ? (
              <span className="flex items-center gap-1.5 text-agri-700">
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>EXECUTING 5-STAGE LOOP...</span>
              </span>
            ) : (
              <span>[ AUTONOMOUS CYCLE COMPLETED ({cycleTime}) ]</span>
            )}
          </div>

          <button
            onClick={onTriggerRun}
            disabled={isRunning}
            title="Re-run Autonomous 5-Stage Agent Loop"
            className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition disabled:opacity-50"
          >
            <Play className="h-3 w-3 fill-current text-agri-600" />
            <span className="hidden sm:inline">Run Cycle</span>
          </button>
        </div>
      </div>
    </div>
  );
}
