import { useState } from 'react';

const states = ["State 1", "State 2", "State 3"];
const stateColors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];

const ThreeStateToggle = () => {
  const [state, setState] = useState(0);

  const handleToggle = () => {
    setState((prevState) => (prevState + 1) % states.length);
  };

  return (
    <button
      className={`px-4 py-2 rounded-full text-white ${stateColors[state]}`}
      onClick={handleToggle}
    >
      {states[state]}
    </button>
  );
};

export default ThreeStateToggle;