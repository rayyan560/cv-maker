"use client";
import { useState, useRef, useEffect } from "react";
import { Copy, Download, FileText, FileBadge, Mail, Check, Settings, Eye, Menu, X, ArrowLeft } from "lucide-react";
import CustomizationBar from "@/components/CustomizationBar";
import ResumeBuilder from "@/components/ResumeBuilder";
import CVBuilder from "@/components/CVBuilder";
import CoverLetterBuilder from "@/components/CoverLetterBuilder";
import ThemeSwitcher from "@/components/ThemeSwitcher";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"resume" | "cv" | "cover_letter">("resume");
  const [previewData, setPreviewData] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Mobile: Toggle between form and preview
  
  // Customization state
  const [primaryColor, setPrimaryColor] = useState("blue");
  const [layoutStyle, setLayoutStyle] = useState<"Sidebar" | "Minimalist">("Sidebar");
  const [bgStyle, setBgStyle] = useState<"Glassmorphism" | "Solid">("Glassmorphism");

  const handleCopy = () => {
    if (!previewData) return;
    const cleanText = previewData.replace(/<[^>]+>/g, ''); // Basic HTML strip for text copy
    navigator.clipboard.writeText(previewData); // But copy the HTML if they want to use it elsewhere
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadPDF = async () => {
    if (!previewData) return;
    
    // Dynamically import html2pdf only on client side
    const html2pdf = (await import("html2pdf.js")).default;
    
    const element = document.createElement("div");
    // We need to inject Tailwind to ensure styles are applied in the PDF
    element.innerHTML = `
      <style>
        @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
        body { margin: 0; padding: 0; }
      </style>
      <div class="p-0 m-0">
        ${previewData}
      </div>
    `;
    
    const opt = {
      margin: 0,
      filename: `AI_Professional_${activeTab}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true }, // CORs for icons
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-950 text-slate-200">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-white/5 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              R
            </div>
            <span className="font-bold text-white tracking-tight">Raynova</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeSwitcher />
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className={`p-2 rounded-lg ${showPreview ? "bg-primary text-white" : "bg-white/5 text-slate-400"}`}
          >
            <Eye className="w-5 h-5" />
          </button>
          {previewData && (
            <button 
              onClick={downloadPDF}
              className="p-2 bg-primary/20 text-primary rounded-lg"
            >
              <Download className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className={`
        fixed inset-0 z-[60] lg:relative lg:z-30 
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        transition-transform duration-300 ease-in-out
      `}>
        {/* Backdrop for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        <div className="w-72 bg-slate-900 border-r border-white/5 flex flex-col p-6 shadow-2xl h-full lg:h-screen lg:sticky lg:top-0 overflow-y-auto relative z-10">
          <div className="flex items-center justify-between mb-10 mt-4 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-extrabold text-xl">
                R
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Raynova <span className="text-primary">Solution</span></h1>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 mb-4 px-2">Document Type</div>
          <nav className="flex flex-col gap-2 mb-10">
            <button 
              onClick={() => { setActiveTab("resume"); setPreviewData(""); setIsSidebarOpen(false); setShowPreview(false); }}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 ${activeTab === "resume" ? "bg-primary text-white shadow-xl shadow-primary/20 scale-102" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              <FileText className="w-5 h-5" />
              <span className="font-semibold">Professional Resume</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab("cv"); setPreviewData(""); setIsSidebarOpen(false); setShowPreview(false); }}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 ${activeTab === "cv" ? "bg-primary text-white shadow-xl shadow-primary/20 scale-102" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              <FileBadge className="w-5 h-5" />
              <span className="font-semibold">Academic CV</span>
            </button>
            
            <button 
              onClick={() => { setActiveTab("cover_letter"); setPreviewData(""); setIsSidebarOpen(false); setShowPreview(false); }}
              className={`flex items-center gap-3 p-3.5 rounded-xl transition-all duration-300 ${activeTab === "cover_letter" ? "bg-primary text-white shadow-xl shadow-primary/20 scale-102" : "text-slate-400 hover:text-white hover:bg-white/5"}`}
            >
              <Mail className="w-5 h-5" />
              <span className="font-semibold">Cover Letter</span>
            </button>
          </nav>

          <div className="mt-auto">
            <CustomizationBar 
              primaryColor={primaryColor}
              setPrimaryColor={setPrimaryColor}
              layoutStyle={layoutStyle}
              setLayoutStyle={setLayoutStyle}
              bgStyle={bgStyle}
              setBgStyle={setBgStyle}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area - Responsive Stacking */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden h-[calc(100vh-65px)] lg:h-auto">
        {/* Left Side: Form Area */}
        <div className={`
          flex-1 lg:max-w-xl bg-slate-900/50 relative overflow-y-auto border-r border-white/5 
          ${showPreview ? "hidden lg:block" : "block"}
        `}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] bg-${primaryColor}-500/30`} />
            <div className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[100px] bg-indigo-500/20`} />
          </div>
          
          <div className="relative z-10 p-6 lg:p-8 pt-6 lg:pt-12 min-h-full">
            <div className="mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-2 capitalize">
                {activeTab.replace('_', ' ')} <span className="text-primary italic">Builder</span>
              </h2>
              <div className="h-1.5 w-20 bg-primary rounded-full" />
            </div>

            {activeTab === "resume" && (
              <ResumeBuilder 
                setPreviewData={(html: string) => { 
                  setPreviewData(html);
                  if (window.innerWidth < 1024) setShowPreview(true);
                }} 
                customization={{ primaryColor, layoutStyle, bgStyle }} 
              />
            )}
            {activeTab === "cv" && (
              <CVBuilder 
                setPreviewData={(html: string) => {
                  setPreviewData(html);
                  if (window.innerWidth < 1024) setShowPreview(true);
                }}
                customization={{ primaryColor, layoutStyle, bgStyle }} 
              />
            )}
            {activeTab === "cover_letter" && (
              <CoverLetterBuilder 
                setPreviewData={(html: string) => {
                  setPreviewData(html);
                  if (window.innerWidth < 1024) setShowPreview(true);
                }}
                customization={{ primaryColor, layoutStyle, bgStyle }} 
              />
            )}
          </div>
        </div>

        {/* Right Side: Live Frame Area */}
        <div className={`
          flex-2 lg:flex-grow bg-slate-950 flex flex-col relative h-full lg:h-screen lg:sticky lg:top-0
          ${showPreview ? "block" : "hidden lg:flex"}
        `}>
          {/* Preview Back Button for Mobile */}
          <div className="lg:hidden flex items-center p-4 bg-slate-900 border-b border-white/5 gap-2">
            <button 
              onClick={() => setShowPreview(false)}
              className="flex items-center gap-2 text-slate-400 hover:text-white font-bold text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              BACK TO EDITOR
            </button>
          </div>

          <div className="hidden lg:flex h-20 border-b border-white/5 items-center justify-between px-10 bg-slate-900/40 backdrop-blur-md z-20">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_10px_rgba(244,63,94,0.4)]" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-[1px] bg-white/10 mx-2" />
              <h3 className="font-bold text-sm tracking-widest text-slate-400 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                LIVE PREVIEW
              </h3>
            </div>
            
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2 border-r border-white/10 pr-6 mr-2">
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Aesthetics</span>
                 <ThemeSwitcher />
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={handleCopy}
                  disabled={!previewData}
                  className="group relative px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400 group-hover:text-white" />}
                  <span className="text-xs font-bold">{copied ? "Copied!" : "Source"}</span>
                </button>
                
                <button 
                  onClick={downloadPDF}
                  disabled={!previewData}
                  className="group px-6 py-2.5 bg-gradient-to-r from-primary to-indigo-600 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed text-white"
                >
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wide uppercase">Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Device Frame Layer */}
          <div className="flex-1 overflow-y-auto p-4 lg:p-12 flex justify-center bg-slate-950">
            {!previewData ? (
              <div className="flex flex-col items-center justify-center opacity-30 text-center animate-pulse px-4">
                <div className="w-24 h-24 lg:w-32 lg:h-32 mb-6 border-4 border-dashed border-white/20 rounded-full flex items-center justify-center">
                  <FileText className="w-10 h-10 lg:w-12 lg:h-12" />
                </div>
                <p className="text-lg lg:text-xl font-bold tracking-tight">Awaiting Document Content</p>
                <p className="text-xs lg:text-sm mt-3 max-w-xs leading-relaxed">Complete the form details and click "Generate" to see your high-end design appear here.</p>
              </div>
            ) : (
              <div className="w-full lg:max-w-[850px] aspect-[1/1.414] lg:h-full shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-2xl border border-white/5 overflow-hidden bg-white relative group">
                {/* Responsive Frame (Iframe) */}
                <iframe 
                  className="w-full h-full border-none"
                  title="Document Preview"
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                      <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <script src="https://cdn.tailwindcss.com"></script>
                        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
                        <style>
                          body { font-family: 'Inter', sans-serif; overflow-x: hidden; }
                          .sidebar-column { height: 100vh; }
                          * { transition: all 0.3s ease; }
                        </style>
                      </head>
                      <body className="bg-white">
                        ${previewData}
                      </body>
                    </html>
                  `}
                />
                
                {/* Frame Hover Overlay Controls (Optional - can add zoom etc) */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition duration-500">
                   <div className="bg-black/80 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-white/70 border border-white/20">
                     RENDERED BY AI GEMINI
                   </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

