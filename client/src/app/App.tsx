import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '../components/Header';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import User from '../pages/User';
import Footer from '../components/Footer';
import './App.css'
import { Provider } from 'react-redux';
import { store } from './store';
import ProtectedRoute from '../components/ProtectedRoute';

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<User />} />
          </Route>
        </Routes>
        <Footer />
      </Router>        
    </Provider>
  )
}

export default App
