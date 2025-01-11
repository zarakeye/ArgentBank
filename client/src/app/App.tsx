import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import Footer from '../components/Footer';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {
  //localStorage.removeItem('user');
  //localStorage.removeItem('token');
  const token = localStorage.getItem('token');
  console.log('token', token);

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
        { (token === null) ? (
          <>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          </>
          ) : (
          <>
          <Route path="/" element={<Profile />} />
          <Route path="/login" element={<Profile />} />
          </>
          )
        }  
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        </Routes>
        <Footer />
      </Router>        
    </Provider>
  )
}

export default App
