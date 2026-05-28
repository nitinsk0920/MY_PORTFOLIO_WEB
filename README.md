# Nitin S Katagihallimath Portfolio

A cinematic, monochrome portfolio website for **Nitin S Katagihallimath**, built to present AI/ML projects, full stack work, healthcare AI systems, research achievements, skills, education, and contact details in a premium immersive interface.

The visual direction is a dark spiritual-futuristic archive: black and white cinematic media, soft white glow, subtle amber accents, smooth scroll depth, animated reveal effects, and interactive project cards.

## Live Repository

GitHub: [MY_PORTFOLIO_WEB](https://github.com/nitinsk0920/MY_PORTFOLIO_WEB)

## Portfolio Focus

- AI/ML development
- Full stack development
- Freelance AI applications
- Healthcare AI systems
- Computer vision projects
- RAG and LLM-powered assistants
- Embedded AI and Arduino automation
- Modern cinematic frontend experiences

## Key Sections

- **Hero**: Name, title, tagline, resume CTA, and cinematic intro presence.
- **About**: Professional summary and current learning focus.
- **What I Build**: AI chatbots, healthcare AI applications, computer vision, full stack apps, and AI plus embedded systems.
- **Experience**: Freelance AI development and hospital healthcare chatbot project details.
- **Projects**: Interactive project archive with modal details, tech stack, deployment status, GitHub links, and Kaggle link where applicable.
- **Skills**: Programming, AI/ML, frameworks, tools, and libraries.
- **Achievements**: Project exhibition, research, patent filings, and competition achievements.
- **Education**: KLE Technological University academic details.
- **Contact**: Email, phone, GitHub, LinkedIn, and resume links.

## Featured Projects

### CLD Sarcopenia Healthcare Chatbot

Full-stack multilingual healthcare education chatbot for Chronic Liver Disease and sarcopenia. Built with React, Vite, FastAPI, LangGraph, Supabase PostgreSQL, JWT authentication, admin dashboards, report APIs, patient learning workflows, chatbot support, and multilingual content.

Repository: [CLD_Sarcopenia_chatbot](https://github.com/nitinsk0920/CLD_Sarcopenia_chatbot.git)

### Oral Cancer Classification & Clinical Decision Support

Deep learning screening pipeline for oral cancer imagery classification with explainable AI and clinical support. Includes a 12K-image four-class dataset workflow, DenseNet169 transfer learning, Grad-CAM explainability, FastAPI, LangGraph, Streamlit UI, risk scoring, and report generation.

Repository: [ORAL_CAVITY_CANCER_MULTICLASSIFICATION](https://github.com/nitinsk0920/ORAL_CAVITY_CANCER_MULTICLASSIFICATION.git)

### CoDe-DuINo - AI Arduino Development Assistant

LLM-powered Arduino development assistant for code generation, compile/upload automation, serial monitoring, pin mapping, real-time logs, voice input, and developer workflow automation.

Repository: [CODE_DUINO](https://github.com/nitinsk0920/CODE_DUINO.git)

### PDF RAG Chatbot

Document-aware chatbot that answers questions from PDF files using semantic retrieval, embeddings, FAISS, LangChain, Hugging Face LLMs, chunking, and Streamlit.

Repository: [RAG-PDF-Reader](https://github.com/nitinsk0920/RAG-PDF-Reader.git)

### Text-to-Image Translation Using TextControlGAN

GAN-based text-to-image generation project trained on the CUB-200-2011 bird dataset using PyTorch, h5py, Matplotlib, and text-conditioned synthesis techniques.

### Multimodal Product Price Prediction

Amazon ML Hackathon project combining DistilBERT text embeddings, ResNet50 image embeddings, feature fusion, and XGBoost regression.

Kaggle: [Multimodal Product Price Prediction](https://www.kaggle.com/code/nitinkmath/multimodal-product-price-prediction)

## Tech Stack

### Framework

- Next.js 14
- React 18
- TypeScript
- App Router

### Styling

- Tailwind CSS
- CSS custom properties
- Custom local display fonts
- Responsive dark UI system

### Animation and Interaction

- Framer Motion
- Anime.js
- Lenis smooth scroll
- React Three Fiber
- Three.js
- Spline runtime support
- Scroll reveal and cinematic section depth wrappers

### UI and Utilities

- shadcn-compatible component setup
- class-variance-authority
- clsx
- tailwind-merge
- Hugeicons
- Custom project cards, modal cards, glow borders, starfields, and cinematic media components

## Visual Assets

The portfolio uses local visual assets and videos from the `univere` archive and `public` folders.

Important asset paths:

- `public/animations/running_scroll.mp4`
- `public/animations/portals.mp4`
- `public/assets/m2.jpg`
- `public/assets/m3.jpg`
- `public/assets/m4.jpg`
- `public/assets/back-2.jpg`
- `public/assets/b1-wings.jpg`
- `public/assets/vagabond.jpg`
- `public/fonts/OrangeAvenueDEMO-Regular.otf`
- `public/fonts/OrangeAvenueOutlineDEMO-Regular.otf`

## Project Structure

```text
app/
  layout.tsx              Root layout, metadata, smooth scroll provider
  page.tsx                Main page composition
  globals.css             Global theme, fonts, and visual styling

components/
  cinematic-intro.tsx     Initial cinematic intro wrapper
  cinematic-section.tsx   Section depth and scroll atmosphere
  global-atmosphere.tsx   Global background atmosphere
  project-grid-card.tsx   Interactive peel/reveal project cards
  smooth-scroll-provider.tsx
  site-navbar.tsx
  ui/
  forgeui/

sections/
  hero-section.tsx
  about-section.tsx
  what-i-build-section.tsx
  experience-section.tsx
  projects-section.tsx
  skills-section.tsx
  achievements-section.tsx
  education-section.tsx
  contact-section.tsx
  footer-section.tsx

public/
  animations/
  assets/
  fonts/
```

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

### Lint

```bash
npm run lint
```

## Deployment

This project is ready for deployment on platforms that support Next.js, such as Vercel, Netlify, or a Node.js server.

Recommended Vercel flow:

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Keep the framework preset as Next.js.
4. Build command: `npm run build`
5. Output handling: default Next.js output.

## Important Notes

- The portfolio uses local video and image assets, so keep the `public/animations`, `public/assets`, and `public/fonts` folders in the repository.
- The production build may require free disk space because Next.js writes generated output and webpack cache under `.next`.
- The project currently skips TypeScript and ESLint checks during `next build` through `next.config.mjs`; run `npm run lint` and `npx tsc --noEmit` separately when doing deeper validation.
- If `next build` fails with `ENOSPC`, clear generated build output and free disk space before rebuilding.

## Contact

- Email: [nitinsk0920@gmail.com](mailto:nitinsk0920@gmail.com)
- Phone: [+91 8073743139](tel:+918073743139)
- GitHub: [nitinsk0920](https://github.com/nitinsk0920)
- LinkedIn: [Nitin S Katagihallimath](https://www.linkedin.com/in/nitin-s-katagihallimath-692aa826a)
- Resume: [Google Drive Resume](https://drive.google.com/file/d/11eVwAG66kxehpISvvDaAffs7P9ZP-OHq/view?usp=sharing)

## Credits

Designed and developed by **Nitin S Katagihallimath**.

Built with creativity, AI, and modern web technologies.
