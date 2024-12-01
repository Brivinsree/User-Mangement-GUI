import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/homepage.js'
import UserPage from './pages/user/userpage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/user" element={<UserPage />}></Route>

        </Routes>
      </Router>
    </div>
  );
}

export default App;




