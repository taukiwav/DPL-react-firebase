import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import Home from './pages/Home'
import Fixtures from './pages/Fixtures';
import Results from './pages/Results';
import SignIn from './pages/SignIn';
import Table from './pages/Table';
import Stats from './pages/Stats';
import Clubs from './pages/Clubs';
import Highlights from './pages/Highlights';
import AddMatch from './pages/AddMatch';

function App() {
  return (
    <>
      <Router>
        <ScrollToTop/>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/fixtures" element={<Fixtures />} />
          <Route path="/results" element={<Results />} />
          <Route path="/table" element={<Table/>} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/highlights" element={<Highlights />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/add-match" element={<AddMatch/>} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
