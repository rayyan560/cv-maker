"use client";

import { Layout, Palette, Box } from "lucide-react";

interface CustomizationProps {
  primaryColor: string;
  setPrimaryColor: (color: string) => void;
  layoutStyle: "Sidebar" | "Minimalist";
  setLayoutStyle: (style: "Sidebar" | "Minimalist") => void;
  bgStyle: "Glassmorphism" | "Solid";
  setBgStyle: (style: "Glassmorphism" | "Solid") => void;
}

const colors = [
  { id: "yellow", name: "Yellow", class: "bg-yellow-500" },
  { id: "blue", name: "Blue", class: "bg-blue-600" },
  { id: "green", name: "Green", class: "bg-emerald-500" },
  { id: "indigo", name: "Indigo", class: "bg-indigo-600" },
];

export default function CustomizationBar({
  primaryColor,
  setPrimaryColor,
  layoutStyle,
  setLayoutStyle,
  bgStyle,
  setBgStyle,
}: CustomizationProps) {
  return (
    <div className="flex flex-col gap-6 p-4 glass rounded-2xl mb-6 border border-white/10 shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Palette className="w-5 h-5 text-primary" />
        <h3 className="font-bold text-sm uppercase tracking-wider">Customization Panel</h3>
      </div>

      {/* Primary Color Selection */}
      <div className="space-y-3">
        <label className="text-xs font-semibold opacity-70 block">Primary Color Accent</label>
        <div className="flex gap-3 h-10">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => setPrimaryColor(color.id)}
              className={`w-full h-full rounded-lg transition-all scale-hover overflow-hidden relative ${color.class} ${
                primaryColor === color.id ? "ring-2 ring-white/50 ring-offset-2 scale-110" : "opacity-70 hover:opacity-100"
              }`}
              title={color.name}
            >
              {primaryColor === color.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Layout Style Toggle */}
      <div className="space-y-3">
        <label className="text-xs font-semibold opacity-70 block flex items-center gap-1">
          <Layout className="w-3 h-3" /> Layout Design
        </label>
        <div className="flex p-1 bg-black/20 rounded-xl">
          <button
            onClick={() => setLayoutStyle("Sidebar")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition ${
              layoutStyle === "Sidebar" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
            }`}
          >
            Sidebar
          </button>
          <button
            onClick={() => setLayoutStyle("Minimalist")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition ${
              layoutStyle === "Minimalist" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
            }`}
          >
            Minimalist
          </button>
        </div>
      </div>

      {/* Background Style Toggle */}
      <div className="space-y-3">
        <label className="text-xs font-semibold opacity-70 block flex items-center gap-1">
          <Box className="w-3 h-3" /> Background Style
        </label>
        <div className="flex p-1 bg-black/20 rounded-xl">
          <button
            onClick={() => setBgStyle("Glassmorphism")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition ${
              bgStyle === "Glassmorphism" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
            }`}
          >
            Glass
          </button>
          <button
            onClick={() => setBgStyle("Solid")}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-medium transition ${
              bgStyle === "Solid" ? "bg-white text-black shadow-sm" : "text-white/60 hover:text-white"
            }`}
          >
            Solid
          </button>
        </div>
      </div>
    </div>
  );
}
