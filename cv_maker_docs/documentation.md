# CV Maker - Project Documentation

## Project Overview
CV Maker (Raynova Solution) is an advanced, AI-powered web application designed to help users create highly professional Resumes, Academic CVs, and Cover Letters with ease. By leveraging artificial intelligence, the platform can rewrite or optimize the user's input, offering them a refined output ready for the job market.

## Technology Stack
- **Framework:** Next.js (Version 14/15+)
- **UI Library:** React.js 19
- **Styling:** Tailwind CSS 4 (with advanced glassmorphism and solid themes)
- **AI Integration:** Google Generative AI (Gemini API)
- **PDF Export:** jsPDF, html2pdf.js, html-docx-js
- **Icons:** Lucide React
- **Language:** TypeScript

## Core Features
1. **Multi-Document Generation:** 
   - **Professional Resumes:** Tailored for corporate jobs and quick scanning.
   - **Academic CVs:** Designed for research, teaching, and extensive educational backgrounds.
   - **Cover Letters:** AI-generated persuasive letters for job applications.
2. **AI-Powered Refinement:** Extracts context from the user's form inputs and rewrites it into professional, ATS-friendly language.
3. **Live Split-Screen Preview:** As the user fills in the form on the left, an interactive, scaled device frame on the right displays the final design in real-time.
4. **Customization Engine:**
   - **Color Palettes:** Choose a primary accent color (e.g., Blue, Emerald, Rose).
   - **Layout Styles:** Choose between 'Sidebar' or 'Minimalist' layouts.
   - **Aesthetics & Themes:** Toggle between dark mode, light mode, Glassmorphism, and Solid background properties.
5. **Instant Export Options:** Download the final document directly to PDF, or copy the generated HTML structure.

## Architecture
The application is structured into a prominent `src` directory containing Next.js `app` routing:
- `src/app/page.tsx`: The primary route combining the form inputs and the live preview iframe.
- `src/components/`: Holds granular modular components such as `ResumeBuilder`, `CVBuilder`, `CoverLetterBuilder`, `CustomizationBar`, and `ThemeSwitcher`.
- The AI functionality runs either via server actions or client-side calls to a secure Next.js API route using the Google Generative AI Node SDK. 

## Data Privacy
The application temporarily keeps user details in memory for generation and rendering purposes. The integration requires an API key which is safely injected through environment variables and is never exposed directly on the client deployment outside of secure handlers.
