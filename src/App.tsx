import React from 'react'; 
import { useState } from 'react';
import Button from './components/Button';

function App() {
  const [message, setMessage] = useState("Let's learn testing in React");
  return (
    <div>
      <h1> Hello </h1>
      <p> {message}</p>
      <Button disabled={false} onClick={() => setMessage("New Message!")}>
        Change Message
      </Button>
    </div>
  );
}

export default App;