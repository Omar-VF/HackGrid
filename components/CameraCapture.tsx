"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { Camera, RefreshCw, X, AlertCircle, UploadCloud } from "lucide-react";

export interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [facingMode, setFacingMode] = useState<"environment" | "user">("environment");

  const stopStream = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  }, [stream]);

  const startStream = useCallback(async () => {
    setIsLoading(true);
    setCameraError(null);
    stopStream();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera API is not supported in this browser. Please use file upload.");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        await videoRef.current.play();
      }
      setIsLoading(false);
    } catch (err) {
      console.warn("Camera stream initialization notice:", err);
      setCameraError(
        err instanceof Error
          ? err.message
          : "Could not access camera device. Please check camera permissions or upload an image file."
      );
      setIsLoading(false);
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    if (isOpen) {
      startStream();
    } else {
      stopStream();
    }

    return () => {
      stopStream();
    };
  }, [isOpen, startStream, stopStream]);

  const handleCaptureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth || 800;
    canvas.height = video.videoHeight || 600;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    stopStream();
    onCapture(dataUrl);
    onClose();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        stopStream();
        onCapture(dataUrl);
        onClose();
      }
    };
    reader.readAsDataURL(file);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === "environment" ? "user" : "environment"));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-none">
      <div className="w-full max-w-xl rounded-xl border border-slate-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-agri-100 text-agri-700">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900">Live Crop Telemetry Camera</h3>
              <p className="text-xs text-slate-500">Capture field leaf photography for instant CV inference</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopStream();
              onClose();
            }}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Viewport Area */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
          {cameraError ? (
            <div className="flex flex-col items-center justify-center p-6 text-center text-white">
              <div className="mb-3 rounded-full bg-alert-600/20 p-3 text-alert-500">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h4 className="font-semibold text-white">Webcam Not Available</h4>
              <p className="mt-1 max-w-sm text-xs text-slate-400">{cameraError}</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-4 flex items-center gap-2 rounded-lg bg-agri-600 px-4 py-2 text-sm font-semibold text-white hover:bg-agri-700 transition-colors"
              >
                <UploadCloud className="h-4 w-4" />
                Upload Photo from Device
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />

              {/* Viewfinder Target Reticle */}
              <div className="pointer-events-none absolute inset-8 border border-white/30 rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 border-t-2 border-l-2 border-agri-500 absolute top-0 left-0" />
                <div className="h-6 w-6 border-t-2 border-r-2 border-agri-500 absolute top-0 right-0" />
                <div className="h-6 w-6 border-b-2 border-l-2 border-agri-500 absolute bottom-0 left-0" />
                <div className="h-6 w-6 border-b-2 border-r-2 border-agri-500 absolute bottom-0 right-0" />
                <span className="text-[11px] font-medium tracking-wide text-white/80 bg-slate-900/70 px-2 py-0.5 rounded">
                  ALIGN TARGET LEAF IN RETICLE
                </span>
              </div>

              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 text-white">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <RefreshCw className="h-4 w-4 animate-spin text-agri-500" />
                    Initializing Camera Stream...
                  </div>
                </div>
              )}
            </>
          )}

          {/* Hidden Canvas for capture rendering */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Hidden native input for mobile fallback */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>

        {/* Controls Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <UploadCloud className="h-3.5 w-3.5 text-slate-500" />
            Upload File
          </button>

          <div className="flex items-center gap-3">
            {!cameraError && (
              <button
                type="button"
                onClick={toggleFacingMode}
                className="flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white p-2 text-slate-700 hover:bg-slate-50 transition-colors"
                title="Switch Camera"
              >
                <RefreshCw className="h-4 w-4 text-slate-500" />
              </button>
            )}

            <button
              type="button"
              disabled={isLoading || !!cameraError}
              onClick={handleCaptureFrame}
              className="flex items-center gap-2 rounded-lg bg-agri-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-agri-700 disabled:opacity-50 transition-colors"
            >
              <Camera className="h-4 w-4" />
              Capture & Ingest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
