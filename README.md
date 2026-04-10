# 🧠 MoodMate

> **Turn your mood into momentum.** An intelligent MERN application that bridges facial recognition and Generative AI to provide personalized, empathetic wellness tasks.

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini](https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

---

## 🌟 Key Features

* **📷 Dual-Mode Mood Detection:**
    * **AI Vision:** Real-time emotion analysis using `face-api.js` (Happy, Sad, Neutral, Surprised, etc.) directly in the browser.
    * **Manual Input:** Quick selection for when you're on the move.
* **🤖 Smart Recommendations:** Integrates **Google Gemini AI** to generate empathetic, context-aware task suggestions.
* **👤 Personalized Context:** Users can input their profession or role, allowing the AI to tailor tasks specifically to their lifestyle (e.g., student vs. professional).
* **🔐 Enterprise-Grade Auth:** Secure JWT-based implementation featuring **HTTP-only cookies** and password hashing with Bcryptjs.
* **🎨 Modern UI:** Clean, responsive interface built with React and Vite for lightning-fast performance.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Axios, Face-API.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas (Mongoose) |
| **AI/ML** | Google Generative AI (Gemini SDK) |
| **Security** | JWT (Access/Refresh Tokens), Bcryptjs, Cookie-Parser |

---

## 📂 Project Structure

```text
moodmate/
├── backend/
│   ├── config/          # Database connection & configurations
│   ├── controllers/     # Logic for auth and mood processing
│   ├── middleware/      # JWT verification & global error handling
│   ├── models/          # Mongoose User & Data schemas
│   ├── routes/          # API endpoint definitions
│   ├── services/        # Gemini AI integration logic
│   └── server.js        # Backend entry point
└── frontend/
    ├── public/models/   # Pre-trained weights for Face-API.js
    ├── src/
    │   ├── components/  # Reusable UI components (Navbar, Spinners)
    │   ├── context/     # AuthContext for global state management
    │   ├── pages/       # Dashboard, Login, CameraView
    │   └── services/    # Axios configuration & API calls


1. Clone & Install Dependencies
git clone [https://github.com/your-username/moodmate.git](https://github.com/your-username/moodmate.git)
cd moodmate

# Install Backend dependencies
cd backend && npm install

# Install Frontend dependencies
cd ../frontend && npm install

2.Environment Configuration
Create a .env file in the /backend directory:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_random_access_secret
JWT_REFRESH_SECRET=your_random_refresh_secret
GEMINI_API_KEY=your_google_gemini_api_key


3. Running the Application


Terminal 1 (Backend):

Bash
cd backend
npm run dev



Terminal 2 (Frontend):

Bash
cd frontend
npm run dev


🔒 Security & Privacy
Privacy First: Facial analysis is performed locally in the browser. No raw camera data or images are ever stored on or sent to our servers.

Environment Safety: All API keys and secrets are managed via environment variables and are excluded from version control.

Session Security: JWTs are stored in HttpOnly cookies to mitigate XSS (Cross-Site Scripting) risks.