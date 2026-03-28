"use client";
import { useState } from "react";
import { Loader2, Sparkles, User, Briefcase, Mail, Send, Building } from "lucide-react";

export default function CoverLetterBuilder({ setPreviewData, customization }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    hiringManager: "",
    experience: "",
    motivation: "",
    email: "",
    phone: "",
  });

  const generateWithAI = async () => {
    if (!formData.name || !formData.company) return alert("Please enter your name and target company");
    setLoading(true);
    try {
      const { primaryColor, layoutStyle, bgStyle } = customization;
      
      const prompt = `AI Instruction: Generate a high-end professional document based on user input.
Selection selected: Cover Letter

Structure & Theme Logic:
- Primary Color Selected: ${primaryColor}
- Layout Style: ${layoutStyle}
- Background Style: ${bgStyle}

Design Rules:
1. If '${layoutStyle}' is 'Sidebar': Create a two-column layout. Left Sidebar: bg-${primaryColor}-900, white text. Right Column: White background, formal letter formatting, and section icons matching the ${primaryColor} color.
2. If '${bgStyle}' is 'Glassmorphism': Use a background gradient bg-gradient-to-br from-${primaryColor}-50 to-white. Sections should be inside cards with bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl.

Smart Content Generation (Cover Letter):
- Write exactly a 3-paragraph persuasive letter using a professional yet enthusiastic tone.
- Paragraph 1: Introduction and interest in the role at ${formData.company}.
- Paragraph 2: Core achievements and why they are a perfect fit based on: ${formData.experience}.
- Paragraph 3: Closing call to action and enthusiasm.

Strictly use Tailwind CSS classes. No broken symbols. Ensure the ${primaryColor} color is applied to all accents, icons, and buttons. 
Return ONLY clean, responsive HTML contained within a single <div>. No markdown code blocks.

User Data:
- Name: ${formData.name}
- Job Title: ${formData.title}
- Target Company: ${formData.company}
- Hiring Manager: ${formData.hiringManager}
- Experience Highlight: ${formData.experience}
- Motivation Statement: ${formData.motivation}
- Contact: ${formData.email} | ${formData.phone}`;

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
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Your Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary" />
              <input type="text" placeholder="Alex Rivera" className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none text-white" onChange={(e) => setFormData({...formData, name: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Applying For</label>
            <div className="relative group">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary" />
              <input type="text" placeholder="Creative Director" className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none text-white" onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Target Company</label>
            <div className="relative group">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Design Studio Inc." className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none text-white" onChange={(e) => setFormData({...formData, company: e.target.value})} />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Hiring Manager</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input type="text" placeholder="Marcus Wong (Optional)" className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none text-white" onChange={(e) => setFormData({...formData, hiringManager: e.target.value})} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Key Experience to Highlight</label>
          <textarea placeholder="e.g., Led the 2023 design system rollout that saved 400+ engineering hours..." className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[100px] text-white resize-none" onChange={(e) => setFormData({...formData, experience: e.target.value})} />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Why this Role? (Motivation)</label>
          <textarea placeholder="I have always admired your company culture and specifically the impact your last project had on..." className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[100px] text-white resize-none" onChange={(e) => setFormData({...formData, motivation: e.target.value})} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input type="email" placeholder="Contact Email" className="w-full bg-slate-800/50 border border-white/5 p-2.5 rounded-lg text-sm text-white focus:outline-none" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <input type="text" placeholder="Phone Number" className="w-full bg-slate-800/50 border border-white/5 p-2.5 rounded-lg text-sm text-white focus:outline-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        </div>
      </div>

      <button onClick={generateWithAI} disabled={loading} className="w-full mt-2 group relative overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-600 to-primary animate-shimmer" />
        <div className="relative p-4 flex items-center justify-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
          {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Send className="w-4 h-4" />}
          <span>Generate Cover Letter</span>
        </div>
      </button>
    </div>
  );
}
