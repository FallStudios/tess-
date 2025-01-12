import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import Animations from './pages/Animations';
import UI from './pages/UI';
import Builds from './pages/Builds';
import Systems from './pages/Systems';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Portfolio />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/animations" element={<Animations />} />
      <Route path="/ui" element={<UI />} />
      <Route path="/builds" element={<Builds />} />
      <Route path="/systems" element={<Systems />} />
    </Routes>
  );
}