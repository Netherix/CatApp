import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LearnMore from './Components/LearnMore/LearnMore';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn_more" element={<LearnMore test="Hello" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
