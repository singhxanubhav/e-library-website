# AI Company Case Library (AICL)

> A modern e-learning and executive intelligence platform for exploring AI startup case studies, analyzing business models and unit economics, evaluating system architectures, and conferring tamper-evident certificates of mastery.

---

## 🌟 Executive Overview

**AI Company Case Library** is an end-to-end e-learning platform engineered for machine learning engineers, tech executives, founders, and venture analysts. It bridges technical machine learning architectures with real-world business mechanics across frontier AI startups (such as **Sarvam AI**, **Krutrim**, **Cursor**, **Harvey AI**, **Perplexity AI**, **ElevenLabs**, **Runway**, and **Synthesia**).

---

## ⚡ Tech Stack & Architecture

- **Framework**: [Next.js 14+](https://nextjs.org/) (App Router, React Server Components, TypeScript)
- **Styling & UI**: [Tailwind CSS](https://tailwindcss.com/), Radix UI primitives (`shadcn/ui`), [Framer Motion](https://www.framer-motion.com/)
- **Typography & Icons**: Space Grotesk (headings), Inter (body), Lucide React
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/) connected to [NeonDB](https://neon.tech/) (Serverless PostgreSQL) with resilient dual-layer in-memory fallback
- **Authentication**: [Next-Auth.js v4](https://next-auth.js.org/) (JWT session strategy, bcryptjs password hashing, role-based access control for `learner`, `editor`, and `admin`)
- **Forms & Validation**: `react-hook-form` + `zod`
- **Markdown & CMS**: `@tailwindcss/typography`, `react-markdown`
- **QR Codes & Credentials**: `qrcode.react` (SVG standard) + cryptographically verifiable unique certificate identifiers (`AICL-{YEAR}-{HASH}`)

---

## 🚀 Key Feature Modules

### 1. Case Library & Multi-Dimensional Search (`/case-library`)
- 5-Dimensional dynamic taxonomy: **Industry**, **AI Technique**, **Business Model**, **Geography**, and **Funding Stage**.
- Debounced full-text search across problem definitions, value propositions, and founder bios.
- Mobile filter sheet + desktop faceted sticky sidebar with real-time active filter chips.

### 2. Interactive Case Modules (`/company/[slug]`)
- Comprehensive 9-section teardowns: Snapshot, Foundational Problem, Architecture & AI Solution, Interactive SVG Inference Pipeline, Business Model & Unit Economics, Traction & Retention Metrics, Key Insights, Peer Tradeoff/Challenge, and Embedded Knowledge Evaluation.
- Live module interactions (Polls, Architecture Tradeoffs, Peer Insights) with single-response enforcement and real-time community response bars.

### 3. Thematic Learning Tracks (`/learn`, `/learn/[slug]`)
- Curated sequential syllabi (e.g. *Sovereign AI & National Infrastructure*, *Enterprise Generative AI Moats*).
- Dynamic SVG progress rings tracking module completion within each track.
- Capstone Thematic Quizzes unlocking upon track progression.

### 4. AI Business Lab (`/ai-business-lab`, `/lab`)
- **Company Comparator**: Side-by-side comparative analysis of any two AI companies across architectures, customer archetypes, pricing mechanisms, and competitive moats.
- **Dynamic Dimension Explorer**: Interactive multi-attribute query engine exploring startup distributions across techniques and business models.
- **Concept Deep-Dives**: Interactive visual breakdown cards explaining core AI business concepts (e.g. *GPU Token Economics & Speculative Decoding*, *Sovereign Data Moats & DPDP Compliance*, *Agentic Tool-Use Verification*).

### 5. Assessments & Official Certification Hub (`/quiz-certificate`)
- Multi-tier assessment engine:
  - **Case Module Quizzes**: 3–5 targeted MCQs per startup with detailed architectural explanations.
  - **Thematic Quizzes**: Multi-company curriculum evaluations.
  - **Scenario Simulations**: High-stakes executive dilemma simulations (procurement dilemmas, latency vs accuracy, model routing).
  - **Capstone Final Exam**: 10-question AI Startup Architecture & Business Mastery Assessment.
- **Automated Eligibility Engine**:
  - Milestone 1: Complete 5+ case study modules.
  - Milestone 2: Pass at least 1 thematic track quiz.
  - Milestone 3: Achieve >= 70% on the Capstone Final Exam.
- **Verifiable Credential Generator**: Conferred certificate view (`/certificate/[id]`) with printable landscape layout, tamper-evident hash, and dynamic QR code linking to the public verification portal (`/verify/[verificationId]`).

### 6. Editorial Insights CMS (`/insights`, `/insights/[slug]`)
- Long-form editorial essays and memos rendered via `@tailwindcss/typography`.
- Live reading time calculation, author attribution, and tag taxonomy.

### 7. Administration & Control Panel (`/admin`)
- Accessible strictly by authenticated `editor` and `admin` roles.
- Live platform analytics: active learners, modules, evaluation attempts, and issued credentials.
- Full CRUD suites for:
  - **Companies**: Add, edit, preview, or remove case studies.
  - **Learning Tracks**: Curate theme tracks and associate company modules.
  - **Assessments**: Configure quiz categories, passing thresholds, and questions.
  - **Editorial CMS**: Integrated Markdown editor with live preview toggle.

### 8. Security & Account Resilience
- Token-based password recovery flow (`/forgot-password` and `/reset-password`).
- Sliding-window in-memory rate limiting (`lib/rate-limit.ts`) protecting authentication and recovery endpoints against brute-force abuse.
- Custom error boundary (`app/error.tsx`) and branded 404 page (`app/not-found.tsx`).

---

## 🔑 Demo Credentials

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Learner** | `demo@aicasehub.com` | `SecurePass123!` | Case studies, interactive polls, quizzes, streak & badge tracking, certificate generation |
| **Editor** | `editor@aicasehub.com` | `EditorPass123!` | All learner access + Admin Insights CMS, Tracks, and Quizzes |
| **Admin** | `jigyasa@aicasehub.com` | `Founder123!` | Full platform access, admin analytics, user management, complete CRUD |

---

## 🛠️ Local Development Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/anshu762/e-library-website.git
cd e-library-website
npm install
```

### 2. Environment Configuration
Create a `.env` file in the project root:
```env
# Database connection (NeonDB / PostgreSQL)
DATABASE_URL="postgresql://username:password@ep-sample-123.us-east-2.aws.neon.tech/neondb?sslmode=require"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="ai-company-case-library-super-secret-key-32-chars-long"

# Email Delivery (Optional in development)
EMAIL_FROM="no-reply@aicasehub.com"
```

### 3. Database Migration & Seeding
```bash
# Push schema to NeonDB PostgreSQL
npx prisma db push

# Seed 8 comprehensive companies, 5D tags, themes, quizzes, and badges
npx prisma db seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Production Deployment (Vercel)

1. Import the repository into your [Vercel Dashboard](https://vercel.com).
2. Set Environment Variables:
   - `DATABASE_URL`: NeonDB connection string.
   - `NEXTAUTH_URL`: Your production URL (e.g. `https://your-domain.vercel.app`).
   - `NEXTAUTH_SECRET`: Random 32+ character string (`openssl rand -base64 32`).
3. Build Command: `npm run build`
4. Output Directory: `.next`

---

## 🧪 Smoke Testing Checklist

- [x] **Landing Page (`/`)**: Hero mesh, live stats counter, featured startup carousel, value propositions.
- [x] **Case Library (`/case-library`)**: 5D multi-select filtering, search debounce, company card navigation.
- [x] **Company Teardown (`/company/[slug]`)**: 9 story sections, animated inference SVG diagram, live module poll with percentage bars, embedded quiz player.
- [x] **Thematic Tracks (`/learn`)**: SVG completion rings, track progression, theme quizzes.
- [x] **AI Business Lab (`/lab`)**: Two-company comparator, interactive filter matrix, concept breakdown diagrams.
- [x] **Certification Hub (`/quiz-certificate`)**: 3-milestone progress bar, module/theme/scenario/final quiz launcher, certificate claim trigger.
- [x] **Certificate Viewer (`/certificate/[id]`)**: Luxury frame, QR code rendering, print-to-PDF formatting.
- [x] **Public Verification (`/verify/[verificationId]`)**: Tamper-evident verification badge, credential metadata.
- [x] **Admin Suite (`/admin`)**: Role-based access control, analytics KPI cards, CRUD for companies, tracks, quizzes, and markdown insights.
- [x] **Auth & Recovery (`/login`, `/signup`, `/forgot-password`, `/reset-password`)**: Rate-limited token recovery, session persistence.
