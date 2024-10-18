import axios from 'axios';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('cpp');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('light');

  const handleSubmit = async () => {
    const payload = { language, code };
    try {
      const { data } = await axios.post("http://localhost:8081/run", payload);
      setOutput(data.output);
    } catch (err) {
      console.log(err.response);
    }
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.body.className = theme; 
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={`App ${theme}`}>
      <h1>Online Code Compiler</h1>

      <div className="toggle-switch">
        <input
          type="checkbox"
          id="theme-toggle"
          onChange={toggleTheme}
          checked={theme === 'dark'} 
        />
        <label htmlFor="theme-toggle"></label>
      </div>

      <div>
        <label>Language: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="cpp">C++</option>
          <option value="py">Python</option>
        </select>
      </div>
      <br />
      <textarea
        className={`code-editor ${theme}`} 
        rows="20"
        cols="75"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <p>{output}</p>
    </div>
  );
}

export default App;
