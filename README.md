# 🎬 Website Suggester

An AI-powered entertainment recommendation platform that helps users discover movies, TV shows, anime, and K-dramas based on trending content, search, genres, moods, favorites, and personalized AI recommendations.

The application combines a React frontend with an Express.js backend, MongoDB for user data and preferences, TMDB for entertainment content, and Google Gemini for AI-powered taste analysis and recommendations.

---

## ✨ Features

### 🔎 Content Discovery

- Browse trending movies and TV shows
- Search for movies and other entertainment content
- Filter content by genre
- Filter content by mood
- Filter content by content type
- View detailed information about selected titles
- Fetch movie genres dynamically from TMDB

### ❤️ Favorites

- Add movies and shows to favorites
- View saved favorites
- Remove items from favorites
- Store favorite titles against authenticated users

### 📺 Watchlist

- Add content to a personal watchlist
- View saved watchlist items
- Remove items from the watchlist
- Store watchlist data per authenticated user

### 🤖 AI Recommendations

- Analyze a user's favorite titles using Google Gemini
- Generate a personalized taste profile
- Extract genres, themes, and keywords from user preferences
- Generate entertainment recommendations based on the user's taste
- Ask the AI assistant for recommendations using natural-language prompts

### 👤 User Authentication

- User registration
- User login
- Password hashing with bcrypt
- JWT-based authentication
- Protected routes for authenticated users
- Persistent login using browser local storage

### 📊 Personalized Taste Profile

The application analyzes a user's saved favorites and generates:

- Preferred genres
- Common themes
- Relevant keywords

These results can then be used to generate personalized recommendations.

---

## 🏗️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router, Axios, CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Authentication | JWT, bcrypt |
| AI | Google Gemini |
| Entertainment API | TMDB API |
| HTTP Client | Axios |
| Deployment | Vercel / Render |

---

## 📐 System Architecture

```text
                         ┌─────────────────────┐
                         │    React + Vite     │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                               REST API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   Express.js API    │
                         │       Backend       │
                         └──────────┬──────────┘
                                    │
                 ┌──────────────────┼──────────────────┐
                 │                  │                  │
                 ▼                  ▼                  ▼
          ┌────────────┐     ┌────────────┐     ┌────────────┐
          │  MongoDB   │     │    TMDB    │     │  Google    │
          │  Database  │     │    API     │     │  Gemini    │
          └────────────┘     └────────────┘     └────────────┘
                 │
                 ▼
          User Preferences
          Favorites
          Watchlist
```

---

## 📁 Project Structure

```text
website-suggester/
│
├── Frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Details.jsx
│   │   │   ├── Favorites.jsx
│   │   │   ├── WatchList.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── TasteProfile.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── api.jsx
│   │   │   └── auth.jsx
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Frontend-vanilla_js/
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── details.html
│   ├── favorites.html
│   ├── watchlist.html
│   ├── script.js
│   ├── login.js
│   ├── signup.js
│   ├── details.js
│   ├── favorites.js
│   ├── watchlist.js
│   └── style.css
│
├── backend/
│   ├── controllers/
│   │   ├── aiController.js
│   │   ├── contentControllers.js
│   │   ├── favouriteControllers.js
│   │   ├── recommendationController.js
│   │   ├── userControllers.js
│   │   └── watchlistController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── models/
│   │   ├── users.js
│   │   ├── favorite.js
│   │   └── Watchlist.js
│   │
│   ├── routes/
│   │   ├── aiRoutes.js
│   │   ├── contentRoutes.js
│   │   ├── favouriteRoutes.js
│   │   ├── recommendationRoutes.js
│   │   ├── userRoutes.js
│   │   └── watchlistRoutes.js
│   │
│   ├── services/
│   │   └── aiService.js
│   │
│   ├── server.js
│   ├── seed.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication Flow

User authentication is implemented using bcrypt and JSON Web Tokens.

```text
User
 │
 ├── Signup
 │      │
 │      ▼
 │   Password Hashing
 │      │
 │      ▼
 │   MongoDB User
 │
 └── Login
        │
        ▼
   Verify Password
        │
        ▼
   Generate JWT
        │
        ▼
   Store Token
        │
        ▼
   Access Protected APIs
```

During registration, passwords are hashed using bcrypt before being stored in MongoDB.

During login, the password is verified and a JWT with a seven-day expiration is generated.

Protected backend routes verify the JWT before processing authenticated requests.

---

## 🤖 AI Recommendation Architecture

The AI functionality uses Google Gemini to analyze the user's saved favorites.

```text
                 User Favorites
                       │
                       ▼
                Favorite Titles
                       │
                       ▼
              Google Gemini API
                       │
                       ▼
              Taste Profile JSON
              ┌────────┼────────┐
              ▼        ▼        ▼
            Genres   Themes   Keywords
                       │
                       ▼
              Recommendation Engine
                       │
                       ▼
                  TMDB Search
                       │
                       ▼
             Recommended Content
```

The taste-analysis service sends the titles from a user's favorites to Gemini and requests structured JSON containing:

```json
{
  "genres": [],
  "themes": [],
  "keywords": []
}
```

The recommendation controller then uses the generated keywords to search TMDB and returns unique recommendations.

---

## 💬 AI Recommendation Assistant

Authenticated users can also interact with an AI recommendation assistant.

The user provides a natural-language request such as:

```text
Recommend dark anime with psychological themes
```

The backend combines the user's saved favorites with the user's request and sends the context to Gemini.

The AI is instructed to recommend five movies, anime, TV shows, or K-dramas and provide:

- Title
- Type
- Short reason for recommendation

---

## 🎬 Content Discovery Flow

TMDB is used as the external content provider.

```text
User
 │
 ├── Search ───────────────┐
 │                         │
 ├── Genre Filter ─────────┤
 │                         │
 ├── Mood Filter ──────────┤
 │                         ▼
 └── Content Type ───► Express Backend
                              │
                              ▼
                         TMDB API
                              │
                              ▼
                       Content Results
                              │
                              ▼
                         MovieCard
```

The backend acts as the API layer between the frontend and TMDB.

The application supports:

- Trending content
- Search
- Genre discovery
- Content details
- Movie and TV discovery

---

## ❤️ Favorites Flow

```text
User
 │
 ▼
Select Content
 │
 ▼
Add to Favorites
 │
 ▼
Authenticated API Request
 │
 ▼
Express Backend
 │
 ▼
MongoDB
 │
 ▼
User's Favorite List
```

Each favorite stores information such as:

- TMDB ID
- Title
- Poster path
- Media type
- Associated user

---

## 📺 Watchlist Flow

```text
User
 │
 ▼
Select Content
 │
 ▼
Add to Watchlist
 │
 ▼
Authenticated API Request
 │
 ▼
Express Backend
 │
 ▼
MongoDB
 │
 ▼
Personal Watchlist
```

Watchlist entries contain the associated user, TMDB ID, title, poster path, and media type.

---

## 🗄️ Database Models

### User

Stores authentication and account information.

```text
User
├── username
├── email
└── password
```

Passwords are stored as bcrypt hashes rather than plain text.

### Favorite

Stores content saved by users.

```text
Favorite
├── user
├── tmdbId
├── title
├── posterPath
└── mediaType
```

### Watchlist

Stores content users want to watch later.

```text
Watchlist
├── userId
├── tmdbId
├── title
├── posterPath
└── mediaType
```

---

## 🔒 Security

The backend includes:

- Password hashing with bcrypt
- JWT authentication
- Protected API routes
- JWT verification middleware
- Environment-based secret management
- CORS configuration
- MongoDB user references
- Authentication checks before accessing favorites and watchlists

**Never commit `.env` files or API credentials to GitHub.**

---

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/signup` | Create a new user |
| `POST` | `/login` | Authenticate a user and receive a JWT |

### Content

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/trending` | Get trending content |
| `GET` | `/content` | Search and filter content |
| `GET` | `/details/:id` | Get content details |
| `GET` | `/genres` | Get available movie genres |

### Favorites

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/favorites` | Add a favorite |
| `GET` | `/favorites` | Get user's favorites |
| `DELETE` | `/favorites/:id` | Remove a favorite |

### Watchlist

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/watchlist/watchlist` | Add an item to the watchlist |
| `GET` | `/watchlist/watchlist` | Get watchlist items |
| `DELETE` | `/watchlist/watchlist/remove/:id` | Remove a watchlist item |

### AI

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/taste-profile` | Generate the user's AI taste profile |
| `POST` | `/ask-ai` | Ask the AI recommendation assistant |
| `GET` | `/recommendations` | Generate personalized recommendations |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- A TMDB API key
- A Google Gemini API key

### 1. Clone the Repository

```bash
git clone https://github.com/Swaritdixit/website-suggester.git
cd website-suggester
```

### 2. Setup the Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory:

```env
PORT=3000

Mongo_DB=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

TMDB_KEY=your_tmdb_api_key

GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
npm start
```

The backend will run on:

```text
http://localhost:3000
```

### 3. Setup the Frontend

Open another terminal:

```bash
cd Frontend
npm install
```

Start the React development server:

```bash
npm run dev
```

Vite will provide the local frontend URL in the terminal.

---

## 🌐 Deployment

The backend is configured to use the deployed Render API:

```text
https://website-suggester.onrender.com/
```

The React frontend can be deployed using Vercel or another static hosting platform.

For deployment, configure the required environment variables on the backend hosting platform rather than committing them to the repository.

---

## 🧪 Development

### Frontend

The React frontend is organized into reusable components, pages, services, and styles.

```text
Frontend/src/
├── components/
├── pages/
├── services/
├── styles/
├── App.jsx
└── main.jsx
```

### Backend

The backend follows a controller-route-service architecture.

```text
backend/
├── controllers/
├── middleware/
├── models/
├── routes/
├── services/
└── server.js
```

- **Routes** define API endpoints.
- **Controllers** handle request processing and application logic.
- **Models** define MongoDB schemas.
- **Middleware** handles authentication.
- **Services** contain reusable AI-related logic.

---

## 📌 Key Implementation Areas

### External API Integration

The backend communicates with TMDB using Axios rather than exposing the TMDB API logic directly in the frontend.

### AI Integration

Google Gemini is used to analyze user preferences and generate personalized entertainment recommendations.

### Personalized Recommendations

Recommendations are based on titles saved by the user rather than being completely generic.

### Protected Resources

Favorites, watchlists, AI taste profiles, and personalized recommendations require authentication.

### Modular Backend

The Express backend separates routes, controllers, models, middleware, and services, making the application easier to extend.

---

## 🔮 Future Improvements

- Improve recommendation ranking and filtering
- Add more accurate mood-based recommendations
- Add pagination for large TMDB result sets
- Add duplicate prevention for favorites and watchlist entries
- Improve watchlist management
- Add recommendation explanations
- Add recommendation history
- Add user profile customization
- Add automated backend and frontend testing
- Improve API error handling
- Move frontend API configuration to environment variables
- Improve loading and error states across the application

---

## 👨‍💻 Author

**Swarit Dixit**

B.Tech Electronics & Communication Engineering  
IIT Bhilai

- 💻 GitHub: https://github.com/Swaritdixit
- 💼 LinkedIn: https://www.linkedin.com/in/swarit-dixit-b907b8309/
