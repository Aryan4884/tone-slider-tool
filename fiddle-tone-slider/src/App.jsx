import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const tones = ['very formal', 'formal', 'neutral', 'casual', 'very casual'];

function App() {
  const [text, setText] = useState(
    `Dear Team,\n\nI hope this message finds you well. I am writing to provide an update on our current project status and outline the next steps.\n\nBest regards,\nAryan`
  );
  const [toneIdx, setToneIdx] = useState(2);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('text');
    if (saved) setText(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem('text', text);
  }, [text]);

  const handleToneChange = async (value) => {
    if (!text.trim()) {
      setError('Please enter some text before adjusting the tone.');
      return;
    }

    setToneIdx(value);
    setLoading(true);
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/tone', {
        text,
        tone: tones[value],
      });
      setHistory([...history, text]);
      setText(res.data.result);
      setFuture([]);
    } catch (err) {
      setError('Tone conversion failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const undo = () => {
    if (!history.length) return;
    const last = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setFuture([text, ...future]);
    setText(last);
  };

  const redo = () => {
    if (!future.length) return;
    const next = future[0];
    setFuture(future.slice(1));
    setHistory([...history, text]);
    setText(next);
  };

  const reset = () => {
    setText('');
    setHistory([]);
    setFuture([]);
  };

  return (
    <div className="h-screen flex flex-row bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      {/* Left panel: Text input */}
      <div className="w-1/2 h-full p-6 flex flex-col bg-white shadow-xl rounded-xl">
        <label className="ml-2 text-lg font-semibold mb-2 mt-4 text-gray-700">Input Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-4 rounded-xl border border-gray-300 text-lg shadow-lg focus:ring-2 focus:ring-blue-500 resize-none"
          placeholder="Type or paste your message here..."
        />
      </div>

      {/* Right panel: Controls */}
      <div className="w-1/2 h-full p-6 flex flex-col justify-center items-center bg-white shadow-xl rounded-xl">
        <div className="w-full max-w-md text-center">
          <label className="text-xl font-semibold mb-2 block text-gray-700">
            Adjust Tone: <span className="text-blue-600">{tones[toneIdx]}</span>
          </label>
          <input
            type="range"
            min="0"
            max="4"
            value={toneIdx}
            onChange={(e) => handleToneChange(Number(e.target.value))}
            className="w-full accent-blue-600"
          />

          {loading && <p className="text-blue-500 mt-2">Converting tone...</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={undo}
              disabled={!history.length}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded text-lg font-medium transition-colors duration-200"
            >
              Undo
            </button>
            <button
              onClick={redo}
              disabled={!future.length}
              className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded text-lg font-medium transition-colors duration-200"
            >
              Redo
            </button>
            <button
              onClick={reset}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded text-lg font-medium transition-colors duration-200"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
