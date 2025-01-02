import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Container from './components/Container';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import User from './pages/User';
import Footer from './components/Footer';
import './App.css'

function App() {

  return (
    <>
      <Container>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>        
      </Container>
    </>
  )
}

export default App
