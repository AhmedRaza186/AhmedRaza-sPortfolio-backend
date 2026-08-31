# Ahmed Raza's Portfolio Backend

This is the backend service for [Ahmed Raza's Portfolio](https://ahmed-razas-portfolio.vercel.app). It is built with **Node.js, Express, TypeScript, Prisma, and the Groq SDK** to power an intelligent, context-aware AI chatbot that interacts with visitors on the frontend.

## 🔗 Links

- **Backend Repository:** [https://github.com/AhmedRaza186/AhmedRaza-sPortfolio-backend](https://github.com/AhmedRaza186/AhmedRaza-sPortfolio-backend)
- **Live Backend API:** [https://ahmedrazassportfolio-backend.vercel.app](https://ahmedrazassportfolio-backend.vercel.app)
- **Live Frontend Portfolio:** [https://ahmed-razas-portfolio.vercel.app](https://ahmed-razas-portfolio.vercel.app)

## ✨ Features

- **AI Chatbot Integration (Groq API):** Powers the frontend AI assistant to answer questions about Ahmed's experience, skills, and projects using a strictly defined factual context.
- **Multilingual & Script-Aware:** The AI is configured to precisely match the user's language and writing script, seamlessly handling English, Urdu (script), and Roman Urdu (Latin alphabet).
- **Conversational Formatting:** Enforces plain-text and Markdown formatting without breaking the UI with raw HTML or Markdown tables, ensuring a premium chat experience.
- **Context-Aware Navigation Links:** Intelligently provides internal navigation links (e.g., `[→ Experience](/experience)`) and social links (LinkedIn, GitHub) only when contextually relevant.
- **Database Integration:** Utilizes **Prisma ORM** (connected to a Neon PostgreSQL database) for robust and type-safe database interactions.
- **CORS Protection:** Configured to strictly accept requests only from the designated frontend URL, protecting the API from unauthorized cross-origin access.
- **TypeScript & Express:** Fully strongly typed backend architecture ensuring high maintainability and fewer runtime errors.
- **Vercel Deployment Ready:** Optimized build scripts to generate the Prisma client during the Vercel CI/CD pipeline, avoiding caching issues.

## 🚀 API Routes

### `GET /api/health`
Health check endpoint to verify that the API is up and running.
- **Response:** `{ "status": "ok", "message": "Server is healthy" }`

### `POST /api/chat`
The main endpoint used by the frontend to communicate with the Groq AI model.
- **Request Body:**
  ```json
  {
    "sessionId": "optional-uuid-string",
    "message": "Ahmed kon hai?"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "sessionId": "uuid-string",
    "message": "Ahmed Raza ek Full Stack Developer hain..."
  }
  ```

## 🛠️ Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/AhmedRaza186/AhmedRaza-sPortfolio-backend.git
   cd AhmedRaza-sPortfolio-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables by creating a `.env` file in the root directory:
   ```env
   DATABASE_URL="your-neon-postgres-url"
   GROQ_API_KEY="your-groq-api-key"
   FRONTEND_URL="http://localhost:5173"
   GROQ_MODEL="llama3-8b-8192" # Or any preferred Groq model
   ```
4. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```
   The server will start at `http://localhost:8000`.

## 📦 Deployment (Vercel)

This project is configured to be deployed seamlessly on Vercel. 
- The `build` script in `package.json` is set to `"prisma generate && tsc"`, which ensures the Prisma client is freshly generated before compiling the TypeScript code.
- Ensure all environment variables (including `FRONTEND_URL` without a trailing slash) are correctly set in the Vercel dashboard.
