"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const themes = [
  { id: "default", name: "Default Light" },
  { id: "theme-modern", name: "Modern" },
  { id: "theme-executive", name: "Executive" },
  { id: "theme-creative", name: "Creative" },
  { id: "theme-minimal", name: "Minimal" },
  { id: "theme-ats", name: "ATS-Optimized" },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState("default");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Remove all previous theme classes from body
    themes.forEach((t) => document.body.classList.remove(t.id));
    if (currentTheme !== "default") {
      document.body.classList.add(currentTheme);
    }
  }, [currentTheme]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-2 rounded-full hover:bg-white/20 transition cursor-pointer"
        aria-label="Toggle themes"
      >
        <Palette className="w-5 h-5 text-current" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 glass rounded-xl shadow-lg p-2 z-50">
          <div className="text-xs uppercase tracking-wider mb-2 px-2 text-current opacity-70">
            Select Theme
          </div>
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                setCurrentTheme(theme.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                currentTheme === theme.id ? "bg-primary text-white" : "hover:bg-white/10 text-current"
              }`}
            >
              {theme.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
