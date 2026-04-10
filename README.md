# 🧠 MoodMate

> **Turn your mood into momentum.**
> An intelligent MERN application that bridges facial recognition and Generative AI to provide personalized, empathetic wellness tasks.

---

## 🌟 Key Features

### 📷 Dual-Mode Mood Detection

* **AI Vision:** Real-time emotion analysis using `face-api.js` (Happy, Sad, Neutral, Surprised, etc.) directly in the browser
* **Manual Input:** Quick selection for when you're on the move

### 🤖 Smart Recommendations

* Uses **Google Gemini AI** to generate empathetic, context-aware wellness tasks

### 👤 Personalized Context

* Tailors suggestions based on user role (e.g., student, professional)

### 🔐 Enterprise-Grade Authentication

* JWT-based authentication (Access & Refresh tokens)
* HTTP-only cookies for security
* Password hashing with Bcryptjs

### 🎨 Modern UI

* Built with React + Vite for fast, responsive performance

---

## 🛠️ Tech Stack

| Layer    | Technology                         |
| -------- | ---------------------------------- |
| Frontend | React 18, Vite, Axios, Face-API.js |
| Backend  | Node.js, Express.js                |
| Database | MongoDB Atlas (Mongoose)           |
| AI/ML    | Google Generative AI (Gemini SDK)  |
| Security | JWT, Bcryptjs, Cookie-Parser       |

---

## 📂 Project Structure

```text
moodmate/
├── backend/
│   ├── config/          # Database connection & configurations
│   ├── controllers/     # Logic for auth and mood processing
│   ├── middleware/      # JWT verification & error handling
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API endpoints
│   ├── services/        # Gemini AI integration
│   └── server.js        # Entry point
└── frontend/
    ├── public/models/   # Face-API.js models
    ├── src/
    │   ├── components/  # UI components
    │   ├── context/     # Global state (AuthContext)
    │   ├── pages/       # Views (Dashboard, Login, Camera)
    │   └── services/    # API calls
```

---

## 🚀 Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/your-username/moodmate.git
cd moodmate
```

---

### 2. Install Dependencies

#### Backend

```bash
cd backend
npm install
```

#### Frontend

```bash
cd ../frontend
npm install
```

---

### 3. Environment Configuration

Create a `.env` file inside `/backend`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
GEMINI_API_KEY=your_gemini_api_key
```

---

### 4. Run the Application

#### Start Backend

```bash
cd backend
npm run dev
```

#### Start Frontend

```bash
cd frontend
npm run dev
```

---

## 🔒 Security & Privacy

* **Privacy First:** Facial analysis runs locally in the browser — no images are stored or sent to servers
* **Environment Safety:** Secrets are stored in `.env` and excluded from version control
* **Session Security:** JWT tokens are stored in HTTP-only cookies to prevent XSS attacks

---

## 📌 Future Improvements (Optional Section)

* Mood tracking history & analytics
* Mobile app version
* Voice-based mood input
* Integration with wearable devices

---

## 📄 License

This project is licensed under the MIT License.
