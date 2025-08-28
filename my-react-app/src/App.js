import React, { useState } from 'react';
import Contestant from './Contestant'; // Import the Contestant component
import './App.css'; // Import the CSS file for styling

const App = () => {
  const [contestants, setContestants] = useState([
    { id: 1, name: 'Sumayah', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-5-fe21260-e1726491710118.jpg?quality=90&webp=true&fit=975,651' },
    { id: 2, name: 'John', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-1-e794c9e-e1726490973700.jpg?quality=90&webp=true&fit=975,651' },
    { id: 3, name: 'Mike', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-8-4ead851-e1726492280291.jpg?quality=90&webp=true&fit=975,651' },
    { id: 4, name: 'Nelly', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-e8f668f-e1726490841522.jpg?quality=90&webp=true&fit=975,651' },
    { id: 5, name: 'Illiyin', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-9-0f2f0df-e1726492128427.jpg?quality=90&webp=true&fit=975,651' },
    { id: 6, name: 'Georgie', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-3-fd06bf4-e1726491164444.jpg?quality=90&webp=true&fit=975,651' },
    { id: 7, name: 'Gill', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-7-921df46-e1726491780242.jpg?quality=90&webp=true&fit=975,651' },
    { id: 8, name: 'Andy', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-6-d38529c-e1726491329767.jpg?quality=90&webp=true&fit=975,651' },
    { id: 9, name: 'Dylan', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-2-2196599-e1726491094730.jpg?quality=90&webp=true&fit=975,651' },
    { id: 10, name: 'Christiaan', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-4-197a90f-e1726491624858.jpg?quality=90&webp=true&fit=975,651' },
    { id: 11, name: 'Hazel', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-11-8b8f652-e1726492021311.jpg?quality=90&webp=true&fit=975,651' },
    { id: 12, name: 'Jeff', imageUrl: 'https://images.immediate.co.uk/production/volatile/sites/3/2024/09/75228S15-Embargo-0001-Tuesday-17th-Sept-The-Great-British-Bake-Off-Series-15-10-198c439-e1726492509943.jpg?quality=90&webp=true&fit=975,651' },
  ]);

  const [userName, setUserName] = useState(''); // State to hold the user's name

  const handleNameChange = (e) => {
    setUserName(e.target.value);
  }
  const moveContestant = (fromIndex, toIndex) => {
    const updatedContestants = [...contestants];
    const [movedContestant] = updatedContestants.splice(fromIndex, 1);
    updatedContestants.splice(toIndex, 0, movedContestant);
    setContestants(updatedContestants);
  };

   const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: contestants.map(c => c.name),
          user: userName,  // Include the user's name
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      const data = await response.json();
      console.log(data.message); // Success message
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <div>
      <h1>Contestants</h1>
      
      {/* Input field for the user to type their name */}
      <div>
        <label htmlFor="userName">Your Name:</label>
        <input
          type="text"
          id="userName"
          value={userName}
          onChange={handleNameChange}
          placeholder="Enter your name"
        />
      </div>

      {/* List of contestants */}
      {contestants.map((contestant, index) => (
        <Contestant
          key={contestant.id}
          index={index}
          contestant={contestant}
          moveContestant={moveContestant}
        />
      ))}

      {/* Submit button */}
      <button onClick={handleSubmit}>Submit Picks</button>
    </div>
  );
};

export default App;