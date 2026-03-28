"use client";
import { useState } from "react";
import { Loader2, Sparkles, User, GraduationCap, BookOpen, Quote, Mail, Phone, MapPin } from "lucide-react";

export default function CVBuilder({ setPreviewData, customization }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    education: "",
    publications: "",
    experience: "",
    skills: "",
  });

  const generateWithAI = async () => {
    if (!formData.name) return alert("Please enter your name");
    setLoading(true);
    try {
      const { primaryColor, layoutStyle, bgStyle } = customization;
      
      const prompt = `AI Instruction: Generate a high-end professional document based on user input.
Selection selected: Academic CV

Structure & Theme Logic:
- Primary Color Selected: ${primaryColor}
- Layout Style: ${layoutStyle}
- Background Style: ${bgStyle}

Design Rules:
1. If '${layoutStyle}' is 'Sidebar': Create a two-column layout. Left Sidebar: bg-${primaryColor}-900, white text, circular profile border. Right Column: White background, bold headers, and section icons matching the ${primaryColor} color.
2. If '${bgStyle}' is 'Glassmorphism': Use a background gradient bg-gradient-to-br from-${primaryColor}-50 to-white. Sections should be inside cards with bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl.

Smart Content Generation (Academic CV):
- Include detailed academic and publication sections.
- For CV: Transform raw education into formal academic credentials.
- Publications should be formatted in standard academic style (e.g., APA/MLA) if possible.

Strictly use Tailwind CSS classes. No broken symbols. Ensure the ${primaryColor} color is applied to all accents, icons, and progress bars. 
Return ONLY clean, responsive HTML contained within a single <div>. No markdown code blocks.

User Data:
- Name: ${formData.name}
- Academic Title: ${formData.title}
- Contact: ${formData.email} | ${formData.phone} | ${formData.location}
- Professional Profile: ${formData.summary}
- Education History: ${formData.education}
- Publications & Research: ${formData.publications}
- Teaching/Work Experience: ${formData.experience}
- Core Skills: ${formData.skills}`;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.result) {
        const cleanHTML = data.result.replace(/```html|```/g, "").trim();
        setPreviewData(cleanHTML);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Dr. Jane Smith" className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none text-white transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Academic Title</label>
            <div className="relative group">
              <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input type="text" placeholder="Professor of Quantum Physics" className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none text-white transition-all" onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input type="email" placeholder="Email" className="w-full bg-slate-800/50 border border-white/5 p-2.5 rounded-lg text-sm text-white focus:outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="text" placeholder="Phone" className="w-full bg-slate-800/50 border border-white/5 p-2.5 rounded-lg text-sm text-white focus:outline-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          <input type="text" placeholder="Location" className="w-full bg-slate-800/50 border border-white/5 p-2.5 rounded-lg text-sm text-white focus:outline-none" onChange={(e) => setFormData({...formData, location: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Academic Summary</label>
          <textarea placeholder="Research interests, fellowships, and academic mission..." className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[80px] text-white transition-all resize-none" onChange={(e) => setFormData({...formData, summary: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Education Background</label>
          <textarea placeholder="PhD in ..., Master of Science in ..., etc." className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[100px] text-white transition-all resize-none" onChange={(e) => setFormData({...formData, education: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Publications & Research</label>
          <textarea placeholder="Journal articles, conference papers, books, and working papers..." className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[140px] text-white transition-all resize-none" onChange={(e) => setFormData({...formData, publications: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Teaching & Experience</label>
          <textarea placeholder="Academic positions, teaching assistantships, industry consulting..." className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[100px] text-white transition-all resize-none" onChange={(e) => setFormData({...formData, experience: e.target.value})} />
        </div>
      </div>

      <button onClick={generateWithAI} disabled={loading} className="w-full mt-2 group relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-600 to-primary bg-[length:200%_100%] animate-shimmer" />
        <div className="relative p-4 flex items-center justify-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
          <span>Generate Academic CV</span>
        </div>
      </button>
    </div>
  );
}
