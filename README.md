# 🎯 Tone Slider Tool – Internship Assignment Demo

A full-stack web application that transforms the tone of a given text using a slider-based UI. Designed to simulate an email tone adjustment tool, the app allows users to choose among five tone levels — from **Very Formal** to **Very Casual** — and rewrites the input text accordingly using an AI model.

---
## 📽 Demo Video

▶️ [Watch Demo on YouTube](https://youtu.be/r9NkHiWPHjs)

---

## ✨ Features

- 📝 Predefined or user-editable text input
- 🎚️ Intuitive slider to adjust tone dynamically
- ♻️ Undo, Redo, and Reset functionalities for text history control
- 💾 LocalStorage-based text persistence
- 🔄 Loading indicators and error handling messages

---

## 🧰 Tech Stack

### 🖥️ Frontend

- **React**: Used for creating a dynamic and stateful user interface. Components like `useState` and `useEffect` manage tone changes, history, and side effects.
- **Tailwind CSS**: Provides modern, responsive styling with utility classes for layout, padding, and interactive states.
- **Axios**: Handles HTTP requests from the frontend to the backend efficiently.
- **LocalStorage**: Ensures persistence of text input across browser sessions.

### 🌐 Backend

- **Node.js + Express**: Handles incoming requests from the frontend and communicates with the Mistral AI API.
- **Axios**: Used on the backend to send requests to the external AI model API (Mistral).
- **Mistral API**: Rewrites text in the desired tone using advanced generative models.
- **Node-Cache**: Caches responses for repeated input-tone combinations to optimize performance and reduce API usage.
- **dotenv**: Manages secure access to the API key via environment variables.
- **CORS**: Enables safe cross-origin communication between frontend and backend servers.

---

## 🔁 Request-Response Flow

1. **User Interaction**:
   - The user types or edits text in the input area.
   - The user selects a tone level using a slider.

2. **Frontend Request**:
   - A POST request is made to the backend server at `/tone` with a JSON payload containing the current text and selected tone level.

3. **Backend Handling**:
   - The backend checks whether the combination of text and tone already exists in its cache.
   - If not cached, the backend formats a prompt and sends it to the Mistral AI API to generate a rewritten version of the text.
   - Once the response is received, it's cached and sent back to the frontend.

4. **Frontend Response Handling**:
   - On successful response, the updated text replaces the original in the UI.
   - Previous text is stored in a history stack for `Undo`, and the current state is stored for `Redo`.

5. **Error Handling**:
   - If the text is empty, the backend immediately returns a `400 Bad Request` error.
   - If the Mistral API call fails (due to network issues, invalid API key, or quota limits), the backend returns a `500 Internal Server Error`.
   - The frontend displays user-friendly error messages and does not overwrite the current text.

---

## 📦 Setup Instructions

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
git clone https://github.com/Aryan4884/tone-slider-tool.git
cd fiddle-tone-slider
npm install
```
Start the Backend Server
```bash
cd backend
npm install
node server.js
```
In the backend directory, create a .env file and add your Mistral API Key:
```bash
MISTRAL_API_KEY=your-api-key-here
```
Start the Frontend Server
```bash
cd ..
npm start
```
