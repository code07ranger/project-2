# INFINITY — Digital Platform & Member Portal

> **The Premier Student-Led Academic Technology Society**  
> **Sri Guru Gobind Singh College of Commerce (SGGSCC), University of Delhi**  
> *“Beyond Limits. Beyond Technology.”*

[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8.svg?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-white.svg?logo=express)](https://expressjs.com/)
[![Status](https://img.shields.io/badge/Hackathon_Prototype-Ready-34b88a.svg)]()

---

## 📌 Executive Summary

**INFINITY** is the student-led academic technology society of **Sri Guru Gobind Singh College of Commerce (SGGSCC)**, University of Delhi. 

This platform serves as the central digital home for students to:
- Discover and register for technical workshops, hackathons, seminars, and gaming tournaments.
- Access verified participation certificates and attendance passes.
- Explore specialized learning paths across five multidisciplinary technology domains.
- Provide society administrators with role-protected tools to manage events, attendance, and campus-wide announcements.

All historical highlights, college affiliations, and institutional citations are strictly grounded in verified college archives and the **Official SGGSCC Annual Report (2023–24)**.

---

## 🏛️ Verified Source of Truth & Historical Milestones

To maintain academic and institutional integrity, this prototype adheres strictly to verified source documents:

- **Official Society Portal:** [SGGSCC Academic Societies — Infinity](https://www.sggscc.ac.in/societies/academicsocieties/infinity)
- **Official Annual Report (2023–24):** [Download College PDF Archive](https://www.sggscc.ac.in/uploads/staticfiles/societies/Infinity%20Annual%20Report%202023-24.pdf)

### Verified Historical Records Featured on Platform:
1. **Graphista (National Graphic Design Competition):** Over **400+ registrations** from **50+ universities and colleges** across India.
2. **Web3.0 & Decentralized Technologies Workshop:** Conducted in partnership with industry leaders **WAGMI / Mudrex**.
3. **National Webinar on Digital Economy & CBDCs:** High-impact session with **100+ active attendees** unpacking India’s fintech stack and the Digital Rupee.
4. **Data Privacy & Cybersecurity Awareness Quizzes:** Campus-wide digital hygiene and security quizzes.
5. **Monthly AI Tools Series & TechTonics:** Practical AI workflows, prompt engineering, and annual fest competitions (**Cognition AI Hackathon** and **Pass The Pixel**).

> **Anti-Fabrication Notice:** Unverified 2025–26 claims, synthetic executive names, and fake partner endorsements are strictly excluded. All interactive mock sessions carry explicit `[Demo]` tags. Procedural abstract SVG infinity-loop motifs are used in lieu of unverified logo files.

---

## 🌐 The Five Core Pillars (Bento Grid)

Infinity spans broader than programming alone, organized into five discovery tracks:

| Domain | Focus & Core Skills | Tool & Framework Stack |
|---|---|---|
| **AI & Emerging Technology** | Neural networks, LLMs, transformer fine-tuning, computer vision, and FastAPI model serving. | Python, PyTorch, Hugging Face, LangChain, OpenCV |
| **Cybersecurity & Digital Awareness** | Ethical hacking, CTF challenges, red-team/blue-team drills, packet inspection, and cyber hygiene. | Wireshark, Burp Suite, Kali Linux, Nmap, Cryptography |
| **Design & Creative Technology** | UI/UX design systems, Figma tokens, interactive prototyping, motion design, and visual storytelling. | Figma, Framer, Adobe Illustrator, After Effects, Spline 3D |
| **Gaming & Competitions** | Esports tournament brackets, BGMI Showdown, algorithmic speed-coding contests (*Code Colosseum*). | C++, Python, Unity Engine, HackerRank, Discord API |
| **Web3 & Digital Economy** | Smart contract architecture, DeFi protocols, blockchain consensus, and fintech / Digital Rupee analysis. | Solidity, Ethereum, Hardhat, Ethers.js, CBDC rails |

---

## 🎨 Visual System & Google Fonts Typography

The platform utilizes a **Cyber-Glass Tech Grid** aesthetic with deep dark surfaces, luminous neon accents, and clean typography:

### Color Palette (Design Tokens)
- **Midnight Navy (`#090B16`):** Deep ambient background.
- **Deep Navy (`#15192B`):** Frosted glass surface panels (`glass-card`).
- **Electric Violet (`#8B5CF6`):** Primary brand accent & highlights.
- **Neon Blue (`#38BDF8`):** Secondary accent & status beacon.
- **Lavender (`#C084FC`):** Gradient glow highlights.
- **Soft White (`#E8EAF4`):** High-contrast, accessible body text.
- **Success Emerald (`#34B88A`):** Confirmed passes & attendance marks.
- **Warning Gold (`#E4A34C`):** Seat capacity warnings & full states.

### Google Fonts System
- **Hero & Primary Headings (`font-heading`):** [**Outfit**](https://fonts.google.com/specimen/Outfit) — geometric, bold, architectural lines.
- **Editorial Headlines (`font-display`):** [**Syne**](https://fonts.google.com/specimen/Syne) — distinctive, modern tech branding.
- **Body & Long-form Text (`font-body`):** [**Plus Jakarta Sans**](https://fonts.google.com/specimen/Plus+Jakarta+Sans) — ultra-clean, balanced kerning, and superior readability.
- **Technical Badges & Monospace (`font-mono`):** [**JetBrains Mono**](https://fonts.google.com/specimen/JetBrains+Mono) — authentic developer aesthetic.

---

## ⚡ Application Architecture & Key Pages

```
infinity-platform/
├── public/                 # Static assets & placeholder directories
├── src/
│   ├── components/
│   │   ├── layout/        # Navbar, Footer, Layout wrapper
│   │   └── ui/            # Button, Badge, Card, EventCard, Input, InfinitySymbol
│   ├── context/           # AuthContext (sessions) & EventContext (state & sync)
│   ├── data/              # Verified domains, demo events, and announcements
│   ├── hooks/             # useAuth convenience hook
│   ├── pages/             # Home, About, Explore, Events, EventDetail, Join,
│   │                      # StudentDashboard, AdminDashboard, Login, NotFound
│   ├── types/             # Full TypeScript interfaces & types
│   ├── App.tsx            # React Router v6 setup & context nesting
│   ├── main.tsx           # React DOM client entrypoint
│   └── index.css          # Tailwind directives, tech-grid, and glass styling
├── server/
│   ├── middleware/        # JWT verification (verifyToken, requireAdmin)
│   ├── routes/            # auth.ts, events.ts, admin.ts
│   ├── data.ts            # In-memory mock database & seed records
│   └── index.ts           # Express server initialization (Port 3001)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts         # Vite bundler config with /api proxy to :3001
```

### Core User Journeys:
1. **Public Discovery:**
   - **`/` (Home):** Interactive Quantum Telemetry Console, 5-Pillar Bento Grid, verified Impact Wall, and FAQ accordion.
   - **`/about` (About):** Institutional affiliation, core values, verified milestone timeline, and leadership structure advisory.
   - **`/explore` (Explore):** Deep dives into each pillar's core competencies, technology stacks, and related events.
   - **`/events` (Events):** Live search, category filtering, upcoming/past tabs, and seat capacity indicators.
   - **`/events/:slug` (Event Details):** Agendas, prerequisites, live registration, and instant digital pass issuance.
   - **`/join` (Join):** 4-step induction journey with recruitment interest intake.

2. **Student Member Experience (`/student`):**
   - Active Pass management with duplicate-registration blocking.
   - Live stream of official society announcements.
   - Verified Certificates of Participation (PDF downloads enabled upon attendance verification).
   - Member credentials and profile settings.

3. **Administration Console (`/admin`):**
   - Role-protected backend & frontend access.
   - **Event Manager:** Create, publish, archive, or delete events.
   - **Attendance Control:** Toggle attendance statuses (`Present` / `Absent` / `Pending`) per registrant.
   - **Announcements Broadcast:** Publish notices directly to the student dashboard.
   - **Demo State Reset:** One-click rollback to default seed data.

---

## 🚀 Getting Started & Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### 1. Clone & Enter Repository
```bash
git clone <repository-url>
cd infinity-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
```
Default configuration:
```env
PORT=3001
JWT_SECRET=infinity-hackathon-secret-key-2026
VITE_API_URL=http://localhost:3001
```

### 4. Run Both Frontend & Backend Concurrently
```bash
npm run start
```
This boots:
- 🌐 **Frontend (Vite):** [http://localhost:5173](http://localhost:5173)
- ⚡ **Backend API (Express):** [http://localhost:3001](http://localhost:3001)
- 🩺 **Health Check:** [http://localhost:3001/api/health](http://localhost:3001/api/health)

*(Alternatively, you can run them in separate terminals via `npm run dev` and `npm run server`)*

### 5. Build for Production
```bash
npm run build
```
Executes type checking (`tsc -b`) and bundles optimized static assets to `dist/`.

---

## 🔑 Demo Evaluation Accounts

For rapid hackathon testing and evaluation, the `/login` page includes **1-Click Instant Login** buttons:

| Role | Email | Password | Permissions |
|---|---|---|---|
| **Demo Student** | `student@demo.sggscc.ac.in` | `student123` | Event registration, dashboard passes, certificate viewing |
| **Demo Admin** | `admin@infinity.sggscc.ac.in` | `admin123` | Event creation, attendance management, announcements, full control |

---

## 📡 REST API Reference

All backend API routes are served under `/api` and enforce role authorization:

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System status and society metadata |
| `POST` | `/api/auth/register` | Public | Register new student member |
| `POST` | `/api/auth/login` | Public | Sign in and obtain JWT token |
| `GET` | `/api/events` | Public | List published events with search and filters |
| `GET` | `/api/events/:slug` | Public | Get event details by unique slug |
| `POST` | `/api/events/:id/register` | Authenticated | Register current user for an event (blocks duplicates) |
| `GET` | `/api/me/registrations` | Authenticated | Get current user's registered passes |
| `GET` | `/api/announcements` | Public | Fetch all published announcements |
| `POST` | `/api/admin/events` | **Admin Only** | Create a new event |
| `PATCH` | `/api/admin/events/:id` | **Admin Only** | Update an existing event |
| `DELETE` | `/api/admin/events/:id` | **Admin Only** | Remove event and associated passes |
| `GET` | `/api/admin/events/:id/registrations` | **Admin Only** | View registrant list for an event |
| `PATCH` | `/api/admin/registrations/:id/attendance`| **Admin Only** | Set attendance to `present` / `absent` / `pending` |
| `POST` | `/api/admin/announcements` | **Admin Only** | Broadcast announcement to student stream |
| `DELETE` | `/api/admin/announcements/:id` | **Admin Only** | Delete announcement |

---

## 🎬 2-Minute Hackathon Walkthrough Script

1. **Homepage:** Show the responsive navigation, live SGGSCC beacon, hero tagline (*“Beyond Limits. Beyond Technology.”*), and interact with the **Quantum Telemetry Console** switching between Telemetry, Stack, and Verified tabs.
2. **5-Pillar Bento Grid:** Scroll down to view the asymmetric bento layout highlighting AI & Emerging Tech with tool tags, Cybersecurity, Design, Gaming, and Web3.
3. **Verified Impact:** Point out the documented milestones citing the *SGGSCC 2023–24 Annual Report* (Graphista 400+ registrations, 50+ colleges, WAGMI partnership).
4. **Events Discovery:** Navigate to **Events** (`/events`), type `neural` or filter by `Cybersecurity` to show real-time search and filter responsiveness.
5. **Event Pass Booking:** Click on an upcoming workshop (e.g. *Neural Frontiers*), complete the registration form, and show the confirmed digital pass. Demonstrate that re-registering is blocked by duplicate-prevention logic.
6. **Student Dashboard:** Navigate to `/student` to review registered passes, view society announcements, and preview digitally verified certificates for sessions marked Present.
7. **Admin Control:** Log in as **Demo Admin** on `/login`, navigate to `/admin`, create a new event, toggle a student's attendance to `Present`, and publish a live announcement.
8. **Verified Sync:** Return to the public event listing to see the new event live, and check the student dashboard to verify the updated attendance certificate.

---

## 📜 Compliance & Disclaimer

This software is an independent student hackathon prototype developed to showcase a digital platform concept for **Infinity – The Tech Society of Sri Guru Gobind Singh College of Commerce**. All official college trademarks, logos, and verified annual report citations remain the property of **SGGSCC, University of Delhi**. Official recruitment and event registrations are announced via the society's verified Instagram ([@infinity.sggscc](https://www.instagram.com/infinity.sggscc/)) and college notice boards.

---

*Crafted for INFINITY — The Tech Society | SGGSCC, Delhi University.*

