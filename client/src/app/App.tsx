import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
// import Container from './components/Container';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import User from '../pages/User';
import Footer from '../components/Footer';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/user/profile" element={<User />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>        
    </Provider>
  )
}

export default App
