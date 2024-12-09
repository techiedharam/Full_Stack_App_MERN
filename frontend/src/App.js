import { Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Blogs from './components/Blogs';
import Createblog from './components/Createblog';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-blog" element={<Createblog />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>

    </div >
  );
}

export default App;
