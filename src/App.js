import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import PrivateRoute from './PrivateRoutes/PrivateRoute';
import Signup from './Components/Signup';
import { AuthProvider } from './Context/Authcontext';
import ForgotPassword from './Components/ForgotPassword';
import UpdateProfile from './Components/UpdateProfile';

function App() {
  return (
    <Container className='d-flex align-items-center justify-content-center dlex-direction-column' style={{ minHeight: "100vh" }} >
      <div className="w-100" style={{ maxWidth: '400px' }}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              {/* here we had created a private route for login based page rendering  */}
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='/update-profle' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
