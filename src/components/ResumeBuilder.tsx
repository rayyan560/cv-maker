"use client";
import { useState } from "react";
import { Loader2, Sparkles, User, Briefcase, Mail, Phone, MapPin, Camera, X } from "lucide-react";

export default function ResumeBuilder({ setPreviewData, setIsGenerating, customization }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: "",
    skills: "",
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImage(url);
    }
  };

  const removeImage = () => {
    if (profileImage) URL.revokeObjectURL(profileImage);
    setProfileImage(null);
  };

  const generateWithAI = async () => {
    if (!formData.name) return alert("Please enter your name");
    setLoading(true);
    if (setIsGenerating) setIsGenerating(true);
    try {
      const { primaryColor, layoutStyle, bgStyle } = customization;
      
      const prompt = `AI Instruction: Generate a high-end professional document based on user input.
Selection selected: Resume

Structure & Theme Logic:
- Primary Color Selected: ${primaryColor}
- Layout Style: ${layoutStyle}
- Background Style: ${bgStyle}

Design Rules:
1. If '${layoutStyle}' is 'Sidebar': Create a two-column layout. Left Sidebar: bg-${primaryColor}-900, white text, circular profile border. Right Column: White background, bold headers, and section icons matching the ${primaryColor} color.
2. If '${bgStyle}' is 'Glassmorphism': Use a background gradient bg-gradient-to-br from-${primaryColor}-50 to-white. Sections should be inside cards with bg-white/70 backdrop-blur-lg border border-white/30 shadow-xl.

Smart Content Generation (Resume):
- Convert bullet points into 'Action-Oriented' achievements (e.g., 'Managed team' -> 'Spearheaded a 10-member cross-functional team').
- Transform raw experience into high-impact professional narratives.

Strictly use Tailwind CSS with EXPLICIT HEX colors (e.g. text-[#123456], bg-[#ffffff]). No oklab/oklch functions.
Return ONLY clean, responsive HTML contained within a single <div>. No markdown code blocks.

${profileImage ? `CRITICAL RULE for PROFILE PHOTO:
The user has provided a profile photo. You MUST include this exact HTML element:
<img src="${profileImage}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 50%;" alt="Profile Photo" />` : `<!-- Use https://placehold.co/120?text=Photo if you need a placeholder image -->`}

User Data:
- Name: ${formData.name}
- Title: ${formData.title}
- Contact: ${formData.email ? formData.email + " | " : ""}${formData.phone ? formData.phone + " | " : ""}${formData.location}
- Summary: ${formData.summary}
- Experience: ${formData.experience}
- Skills: ${formData.skills}`;

      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      if (data.result) {
        // Clean up any potential markdown response
        const cleanHTML = data.result.replace(/```html|```/g, "").trim();
        setPreviewData(cleanHTML);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
    if (setIsGenerating) setIsGenerating(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-4">
        {/* Profile Photo Upload */}
        <div className="flex justify-center pb-2">
          <div className="relative group">
            {profileImage ? (
              <div className="relative">
                <img src={profileImage} alt="Preview" className="w-24 h-24 rounded-full object-cover border-4 border-slate-800 shadow-xl" />
                <button 
                  onClick={removeImage}
                  className="absolute bottom-0 right-0 bg-rose-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Remove Photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center justify-center w-24 h-24 rounded-full bg-slate-800/80 border border-white/10 hover:border-primary/50 transition-all shadow-xl group-hover:bg-slate-800">
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                <Camera className="w-7 h-7 text-slate-400 group-hover:text-primary transition-colors mb-1 mt-1" />
                <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Photo</span>
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Full Name</label>
            <div className="relative group">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="John Doe" 
                className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-600 transition-all"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Job Title</label>
            <div className="relative group">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Senior Product Designer" 
                className="w-full bg-slate-800/50 border border-white/5 p-3 pl-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-600 transition-all"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative group">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input type="email" placeholder="Email" className="w-full bg-slate-800/50 border border-white/5 p-2.5 pl-9 rounded-lg text-sm text-white focus:outline-none transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className="relative group">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input type="text" placeholder="Phone" className="w-full bg-slate-800/50 border border-white/5 p-2.5 pl-9 rounded-lg text-sm text-white focus:outline-none transition-all" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
          </div>
          <div className="relative group">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
            <input type="text" placeholder="Location" className="w-full bg-slate-800/50 border border-white/5 p-2.5 pl-9 rounded-lg text-sm text-white focus:outline-none transition-all" onChange={(e) => setFormData({...formData, location: e.target.value})} />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Professional Summary</label>
          <textarea 
            placeholder="Highlight your years of experience, core expertise, and key value proposition..." 
            className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-600 transition-all resize-none"
            onChange={(e) => setFormData({...formData, summary: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Experience Details</label>
          <textarea 
            placeholder="Company Name | Role | Dates&#10;- Key achievement 1&#10;- Key achievement 2..." 
            className="w-full bg-slate-800/50 border border-white/5 p-4 rounded-xl min-h-[180px] focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-600 transition-all resize-none"
            onChange={(e) => setFormData({...formData, experience: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">Skills Cluster</label>
          <input 
            type="text" 
            placeholder="React, TypeScript, UI Design, Project Management..." 
            className="w-full bg-slate-800/50 border border-white/5 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 text-white placeholder:text-slate-600 transition-all"
            onChange={(e) => setFormData({...formData, skills: e.target.value})}
          />
        </div>
      </div>

      <button 
        onClick={generateWithAI}
        disabled={loading}
        className="w-full mt-2 group relative overflow-hidden rounded-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-600 to-primary bg-[length:200%_100%] animate-shimmer group-hover:animate-none group-hover:scale-105 transition-all duration-500" />
        <div className="relative p-4 flex items-center justify-center gap-3 text-white font-bold tracking-widest uppercase text-sm">
          {loading ? (
            <>
              <Loader2 className="animate-spin w-5 h-5 text-white/80" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>Generate High-Impact Resume</span>
            </>
          )}
        </div>
      </button>

      <div className="text-[10px] text-center text-slate-500 font-medium">
        POWERED BY GEMINI 1.5 FLASH • 2024 NEXT-GEN AI INTERFACE
      </div>
    </div>
  );
}
