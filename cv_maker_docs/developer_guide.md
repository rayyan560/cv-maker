# Developer Guide

Welcome to the Development Guide for the CV Maker project. This document offers instructions for setting up the local environment, understanding the file architecture, and successfully starting the development server.

## Prerequisites
- **Node.js**: Version 18 or above (LTS recommended)
- **npm** or **yarn** package manager
- **Git** version control system

## Setup & Installation

1. **Clone the Repository**
   Ensure you have cloned the project into your workspace.
   
2. **Install Dependencies**
   Navigate to the project root and run:
   ```bash
   npm install
   ```
   This will install all necessary libraries, including React, Next.js, Tailwind CSS variants, jsPDF, and the Google Generative AI SDK.

3. **Configure Environment Variables**
   Create a `.env.local` file in the root folder. You *must* add your AI secret key here to use the generation functionality. Do **NOT** commit this file to public version control.
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

## Development Commands

- **Run Locally (Development Mode)**
  ```bash
  npm run dev
  ```
  The server will usually start at `http://localhost:3000`.

- **Build for Production**
  ```bash
  npm run build
  ```
  Compiles the application into a `.next/` folder, checking for TypeScript and ESLint errors.

- **Start Production Build**
  ```bash
  npm start
  ```

## Project Structure Overview
- `src/app/page.tsx`: The unified UI encompassing the Sidebar navigation, the Builder form pane, and the Live Preview pane. State such as `activeTab`, `previewData`, and customizations are bubbled up here.
- `src/components/*Builder.tsx`: Logic specifically dedicated to form states, capturing user input, making the API call to generate HTML content, and rendering text inputs.
- `next.config.js`: Next.js configuration setups.
- `tailwind.config.mjs` / `postcss.config.mjs`: Utility styling setup.

## Handling AI API Logic
The platform heavily relies on `@google/generative-ai`.
When modifying prompts:
- Ensure the prompt demands **only HTML formatting** without raw markdown block ticks.
- Ensure the AI strictly utilizes Tailwind CSS utility classes inside the styles.
- Fallbacks should be in place in case the AI provider rate limits or timeouts occur.

## Deployment
This project is configured perfectly for Vercel. Ensure the `GEMINI_API_KEY` is added to your Vercel Project Settings > Environment Variables before clicking Deploy.
