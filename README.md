# 🦷 Grad Dental - Intelligent Dental Care & Clinical Training Platform

**Grad Dental** is a comprehensive dental healthcare platform designed to bridge the gap between dental students requiring clinical cases and patients seeking affordable, supervised dental treatment. The platform leverages cutting-edge Artificial Intelligence for automated X-ray pathology detection, an interactive dental chatbot, and real-time communication via ASP.NET Core SignalR.

---

---

## 📸 Screenshots & UI Preview

| Patient Dashboard | AI X-ray Analysis |
| :---: | :---: |
| ![Dashboard](./assets/images/dashboard.png) | ![X-ray AI](./assets/images/x-ray.png) |

| Real-time Chat (SignalR) | AI Chatbot Assistant |
| :---: | :---: |
| ![Chat](./assets/images/chat.png) | ![Chatbot](./assets/images/chatbot.png) |

## 📌 1. Executive Summary & Vision

In dental education, dental students constantly need specific clinical cases to fulfill their graduation and clinical training requirements, while many patients struggle to access quality dental care at an affordable cost. 

**Grad Dental** solves this mutual challenge by providing an end-to-end digital ecosystem featuring:
* **Patients:** Can report dental conditions, upload X-rays for instant AI analysis, receive treatment proposals from qualified dental students, and book clinic sessions.
* **Dental Students:** Can discover cases filtered by required clinical pathology (e.g., Operative, Endodontics, Periodontics, Surgery) and geographic location, submit treatment proposals, manage patient records, and schedule clinical appointments.
* **Admin Verification:** Dedicated administrative workflow to verify academic credentials and uphold clinical standards.

---

## 🏗️ 2. System Architecture

The project is architected as a distributed, decoupled multi-tier system:

```text
┌────────────────────────────────────────────────────────────────────────┐
│                          PRESENTATION LAYER                            │
│           Next.js 15 (App Router) + TypeScript + Tailwind CSS          │
│             Shadcn UI / Radix Primitives + Next-Intl (AR / EN)         │
└───────────────────▲───────────────────────────────▲────────────────────┘
                    │ REST APIs                     │ WebSockets
                    │ (HTTP / JSON)                 │ (SignalR Hubs)
┌───────────────────▼───────────────────────────────▼────────────────────┐
│                           BACKEND SERVICES                             │
│                       ASP.NET Core Web API (C#)                        │
│   ├── Authentication & Role-Based Access Control (JWT)                 │
│   ├── Case & Proposal Management Engine                                │
│   ├── Appointment Scheduling & Clinical Records                        │
│   └── Real-Time Hubs (SignalR for Instant Messaging & Alerts)          │
└───────────────────▲───────────────────────────────▲────────────────────┘
                    │                               │
┌───────────────────▼─────────────┐   ┌─────────────▼────────────────────┐
│      PERSISTENCE LAYER          │   │         AI & ML SERVICES         │
│  Entity Framework Core + RDBMS  │   │ ├── Dental X-Ray Vision Model    │
│  (Relational Database Storage)  │   │ └── Conversational Dental Bot    │
└─────────────────────────────────┘   └──────────────────────────────────┘
```

---

## 🛠️ 3. Technologies & Stack Breakdown

### Frontend Application
* **Framework:** Next.js 15 (App Router, Server & Client Components)
* **Language:** TypeScript
* **Styling & Components:** Tailwind CSS, Shadcn UI, Radix UI Primitives, Lucide Icons
* **Internationalization:** `next-intl` (Full bilingual support: Arabic RTL & English LTR)
* **Forms & Validation:** React Hook Form, Zod
* **Real-time Client:** `@microsoft/signalr` client library

### Backend Architecture
* **Framework:** ASP.NET Core Web API (.NET)
* **Language:** C#
* **Real-Time Communication:** ASP.NET Core SignalR (Bi-directional real-time communication for patient-student messaging and notification dispatching)
* **ORM & Database:** Entity Framework Core (EF Core) with relational database management
* **Security:** ASP.NET Core Identity, JWT (JSON Web Tokens) for role-based authentication

### Artificial Intelligence & Machine Learning
* **Dental X-Ray Diagnostic Model:** Deep Learning Convolutional Neural Network (CNN) trained on dental radiographic datasets (periapical and panoramic X-rays) to assist in detecting caries, lesions, and bone loss.
* **Conversational Dental Chatbot:** Integrated AI-powered assistant designed for dental symptom triaging, patient FAQ answering, and platform navigation.

---

## 🌟 4. Core Features & Technical Highlights

### 1. AI-Assisted Dental X-Ray Analysis
* Patients and students can upload digital dental radiographs (Periapical / Bitewing / Panoramic).
* The integrated Computer Vision model processes images to highlight suspicious areas (caries, apical periodontitis) and generate instant preliminary diagnostic insights.

### 2. Intelligent Dental Chatbot
* Available across the platform to provide automated, 24/7 dental health advice and preliminary triage.
* Directs patients to the appropriate clinical department based on reported symptoms.

### 3. Real-Time Chat System (SignalR)
* Built using **ASP.NET Core SignalR** hubs to provide instant, bi-directional messaging between accepted patients and their assigned student doctors.
* Features real-time message delivery, typing states, and case update notifications without polling.

### 4. Smart Case Matching & Clinical Filtering
* Patients create clinical cases with symptom descriptions, dental disease tags, and uploaded imaging.
* Students filter cases by:
  * **Required Clinical Disease** (e.g., Caries, Root Canal, Extraction, Scaling).
  * **Geographical Proximity / University Clinic Location**.
* Students submit detailed treatment proposals outlining the procedure and clinical appointment details.

### 5. Clinical Appointment & Treatment Tracking
* Complete schedule management for clinical appointments.
* Track case progression from *Proposed* to *Assigned*, *In Progress*, and *Completed*.
* Mandatory rating and review system ensuring accountability, quality of care, and student performance tracking.

### 6. Admin Verification Portal
* Specialized dashboard for administrators to review student academic credentials, verify university affiliations, and audit platform activities.

---

## 📂 5. Frontend Project Structure

```text
src/
├── app/
│   ├── [locale]/
│   │   ├── (admin)/admin/dashboard/     # Admin verification portal
│   │   ├── (auth)/                      # Patient & Student login / registration
│   │   ├── (landing)/                   # Public landing page & about us
│   │   ├── (patient)/patient/
│   │   │   ├── available-doctors/       # Explore verified dental students
│   │   │   ├── chat/                    # Real-time chat with assigned doctor
│   │   │   ├── create-case/             # Case creation with AI X-ray upload
│   │   │   ├── dashboard/               # Patient dashboard & appointments
│   │   │   └── proposals/               # Incoming student treatment proposals
│   │   └── (student)/student/
│   │       ├── available-cases/         # Filter & browse clinical cases
│   │       ├── dashboard/               # Student target tracker & dashboard
│   │       ├── my-patients/             # Assigned cases & records
│   │       └── my-proposals/            # Track submitted proposals
│   └── api/                             # Internal Next.js API routes & handlers
├── components/                          # Shadcn UI reusable components
├── hooks/
│   └── useSignalRChat.ts                # Custom SignalR real-time chat hook
├── constants/
│   ├── diseases.ts                      # Dental classification taxonomy
│   ├── locations.ts                     # Geographic distribution
│   └── universities.ts                  # Academic institutions
└── messages/
    ├── ar.json                          # Arabic localization strings (RTL)
    └── en.json                          # English localization strings (LTR)
```

---

## 🚀 6. Installation & Setup

### Prerequisites
* **Node.js:** v18.x or later
* **.NET SDK:** .NET 8.0 or later
* **Package Manager:** npm / yarn / pnpm

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/a7medabdelmon3m/Dentify.git](https://github.com/a7medabdelmon3m/Dentify.git)
   cd Dentify
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables (`.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=https://localhost:5001/api
   NEXT_PUBLIC_SIGNALR_HUB_URL=https://localhost:5001/chatHub
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the platform.

### Backend Setup
1. Open the backend solution in Visual Studio or VS Code.
2. Update the connection string in `appsettings.json`.
3. Apply database migrations:
   ```bash
   dotnet ef database update
   ```
4. Start the API server:
   ```bash
   dotnet run
   ```

---

## 📄 7. License

This project is developed as an academic graduation project and is protected under the terms of the repository license.
