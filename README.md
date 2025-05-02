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
## 🏗️ Technical Architecture Decisions

### **Frontend Architecture**
- **React State Management**: React's `useState` hook is used to store the primary states, including the text content, tone index, loading state, error state, and history. 
- **Tailwind CSS**: The decision to use Tailwind CSS was based on its utility-first approach that allows for rapid styling with responsive, customizable classes.
- **LocalStorage**: LocalStorage was used to persist the input text across sessions to ensure that the user's input is not lost when they refresh or close the browser.

### **Backend Architecture**
- **Express and Node.js**: Express was chosen as a minimal and flexible web framework that could easily handle routing, middleware, and communication with external APIs (Mistral AI in this case).
- **Caching with Node-Cache**: Node-Cache was used to avoid excessive API calls for repeated text-tone pairs, improving performance by serving cached results when the same text and tone are requested again.
- **Error Handling**: Custom error handling was implemented in both the frontend and backend to ensure a smooth user experience. In case of failure to contact the Mistral API or an invalid input, the system responds with appropriate messages.
  
### **Trade-offs**
- **LocalStorage vs. Backend Storage**: LocalStorage was preferred over a backend storage solution because the application was designed to be lightweight and user-centric. It reduces complexity and eliminates the need for managing databases or external storage.
- **Caching**: Caching was implemented at the backend to minimize API usage and improve response times. However, this introduces the limitation of cache expiry (set to 5 minutes) for dynamic text-to-tone conversions, which might not be suitable for all use cases.
  
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

## 🛠️ State Management and Undo/Redo Functionality

### **State Management in Frontend**
- **Text State**: The current state of the text is stored using `useState` in React. This allows the text to be dynamically updated when the user interacts with the input area or tone slider.
- **Undo/Redo State**:
  - **History Stack**: A stack of previous text states is maintained, enabling the user to "undo" changes. When the tone is changed, the current text is pushed onto the history stack.
  - **Future Stack**: A stack of future text states is maintained, allowing the user to "redo" a change. When an undo action is performed, the text state is moved to the future stack, enabling reversion back to the state after undoing.
- **Tone State**: The tone selected by the user is stored in the `toneIdx` state variable. It controls the active tone level and triggers the API call for tone conversion when changed.

### **Undo/Redo Logic**
- The `undo` function pops the most recent text state from the history stack and pushes it onto the future stack. It then updates the `text` state with the previous text.
- The `redo` function works by popping the most recent text state from the future stack and pushing it onto the history stack. It then updates the `text` state with the next text.

### **State Management Approach**
- The state management approach focuses on keeping the UI responsive and lightweight by using React's state hooks (`useState`), with special attention to handling text and its transformations.
  
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
