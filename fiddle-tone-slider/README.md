# 🎯 Tone Slider Tool – Internship Assignment Demo

A simple React-based web application that allows users to adjust the tone of a predefined text (e.g., an email) using a tone slider. The app interacts with a backend server (e.g., powered by Mistral AI) to convert the input text to a selected tone level ranging from **Very Formal** to **Very Casual**.

## 📽 Demo Video

▶️ [Watch Demo on YouTube](https://youtu.be/r9NkHiWPHjs)



## ✨ Features

- 📜 Predefined or user-entered text input (e.g., an email draft)
- 🎚️ Tone adjustment using a slider (Very Formal to Very Casual)
- ♻️ Undo and Redo functionality
- ♻️ Reset to clear the text
- 💾 Local storage support for text persistence

## 🚀 Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Axios used to interact with a local server (expects an endpoint like `http://localhost:5000/tone`)
- **Styling**: Tailwind CSS utility classes

## 🖥️ Getting Started

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

```bash
git clone https://github.com/Aryan4884/tone-slider-tool.git
cd fiddle-tone-slider
npm install
```
```bash
cd backend
npm install
node server.js
```
```bash
cd ..
npm start
```



