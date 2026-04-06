cat > README.md << 'ENDOFFILE'
# PrepBuddy

Your personal interview preparation companion — built with Next.js and React.

**Live Demo:** [prepbuddy0001.vercel.app](https://prepbuddy0001.vercel.app/)

## What is PrepBuddy?

PrepBuddy is a web app designed to help developers prepare for technical interviews. Add your own questions, practice with random quizzes, track your confidence level, and get AI-powered feedback on your answers.

## Features

- **Question Management** — Add, edit, and delete interview questions across multiple topics
- **Topic Filtering** — Filter questions by topic to focus your practice sessions
- **Confidence Tracking** — Rate each question with a 1-5 star confidence level
- **Stats Dashboard** — See total questions, confident topics, and weak areas at a glance
- **Practice Mode** — Random question picker with built-in answer area
- **AI Evaluation** — Get instant feedback on your answers powered by Google Gemini API
- **Answer Writing** — Expand any card to write and save your answer

## Tech Stack

- **Frontend:** React, Next.js 16, Tailwind CSS
- **AI Integration:** Google Gemini 2.0 Flash API
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- Node.js 22+
- npm

### Installation
```bash
git clone https://github.com/ajaysinghrana2020/prepbuddy.git
cd prepbuddy
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

Get a free API key from [Google AI Studio](https://aistudio.google.com/apikey).

### Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Author

**Ajay Singh Rana** — Java Developer | 3.5 years experience in enterprise backend development

- GitHub: [@ajaysinghrana2020](https://github.com/ajaysinghrana2020)
ENDOFFILE
