import { useState } from 'react';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [results, setResults] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios
        .post('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            animal: text,
          }),
        })
        .then((response) => response.json())
        .then((response) => {
          if (response.status !== 200) {
            throw (
              response.error ||
              new Error(`Request failed with ${response.status}`)
            );
          }
          setResults(response.result);
          setText('');
        });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="flex flex-col items-center pt-16">
      <h3 className="text-3xl h-6 font-bold ml-4 mr-10 my-0">Name my pet</h3>
      <form onSubmit={handleSubmit} className="flex flex-col w-80">
        <input
          type="text"
          name="input-information"
          placeholder="Enter an animal"
          value={text}
          onChange={handleChange}
          className="text-base h-6 font-sans"
        />
        <button type="submit">Generate Names</button>
      </form>
      <div>{results}</div>
    </div>
  );
}

export default App;
