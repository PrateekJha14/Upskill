import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Learn from './pages/Learn';
import ProblemSet from './pages/Problemset';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/problems/:topic" element={<ProblemSet />} />
      </Routes>
    </Router>
  );
}

export default App;
