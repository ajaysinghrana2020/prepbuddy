PrepBuddy
Your personal interview preparation companion — built with Next.js and React.
Live Demo: prepbuddy0001.vercel.app
What is PrepBuddy?
PrepBuddy is a web app designed to help developers prepare for technical interviews. Add your own questions, practice with random quizzes, track your confidence level, and get AI-powered feedback on your answers.
Features

Question Management — Add, edit, and delete interview questions across multiple topics (Java, Spring Boot, SQL, System Design, and more)
Topic Filtering — Filter questions by topic to focus your practice sessions
Confidence Tracking — Rate each question with a 1-5 star confidence level to identify weak areas
Stats Dashboard — See total questions, confident topics, and weak areas at a glance
Practice Mode — Random question picker with a built-in answer area — great for simulating real interviews
AI Evaluation — Get instant feedback on your answers powered by Google Gemini API
Answer Writing — Expand any card to write and save your answer

Tech Stack

Frontend: React, Next.js 16, Tailwind CSS
AI Integration: Google Gemini 2.0 Flash API
Deployment: Vercel

Getting Started
Prerequisites

Node.js 22+
npm

Installation
bashgit clone https://github.com/ajaysinghrana2020/prepbuddy.git
cd prepbuddy
npm install
Environment Variables
Create a .env.local file in the project root:
GEMINI_API_KEY=your_gemini_api_key_here
Get a free API key from Google AI Studio.
Run Locally
bashnpm run dev
Open http://localhost:3000 in your browser.
Project Structure
prepbuddy/
├── src/
│   └── app/
│       ├── api/
│       │   └── evaluate/
│       │       └── route.js        # Gemini AI evaluation endpoint
│       ├── PracticeMode.js         # Random question practice component
│       ├── page.js                 # Main app — questions, filtering, CRUD
│       ├── layout.js               # Root layout
│       └── globals.css             # Global styles
├── .env.local                      # API keys (not committed)
├── package.json
└── README.md
Screenshots
Main Dashboard
Questions with topic filtering, confidence stars, and stats bar.
Practice Mode
Random questions with answer area and AI evaluation.
Roadmap

 Database integration (Supabase) for persistent storage
 User authentication
 Export questions to PDF
 Share question sets with others
 Mobile PWA support

Author
Ajay Singh Rana — Java Developer | 3.5 years experience in enterprise backend development

GitHub: @ajaysinghrana2020
LinkedIn: Connect with me
