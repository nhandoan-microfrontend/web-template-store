import React from 'react';
import './App.css';
import MicroFrontend from './containers/MicroContainer/MicroContainer.container';

const MicroHomeLayout = () => <MicroFrontend name={'HomeLayout'} host='http://localhost:3001' window={window}/>

function App() {
  return (
    <div className="App">
      <MicroHomeLayout />
    </div>
  );
}

export default App;
