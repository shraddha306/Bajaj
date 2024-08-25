import React, { useState } from 'react';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const backendUrl = 'http://localhost:4000/bfhl'; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      const res = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: parsedData.data }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data from backend');
      }

      const result = await res.json();
      setResponse(result);
      setError('');
    } catch (err) {
      setError('Invalid JSON format or backend error');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Roll Number</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="jsonInput">API Input</label>
        <textarea
          id="jsonInput"
          style={{ width: '100%', height: '100px', marginBottom: '10px' }}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON input here'
        />
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <label htmlFor="filter">Multi Filter</label>
          <select
            id="filter"
            multiple
            onChange={(e) =>
              setSelectedOptions(Array.from(e.target.selectedOptions, option => option.value))
            }
            style={{ width: '100%', marginBottom: '20px' }}
          >
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highestLowercase">Highest Lowercase Alphabet</option>
          </select>
          <div>
            <h3>Filtered Response</h3>
            {selectedOptions.includes('alphabets') && (
              <p>Alphabets: {response.alphabets.join(', ')}</p>
            )}
            {selectedOptions.includes('numbers') && (
              <p>Numbers: {response.numbers.join(', ')}</p>
            )}
            {selectedOptions.includes('highestLowercase') && (
              <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
