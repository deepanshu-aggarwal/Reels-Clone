import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={
              <Profile />
          } />
          <Route path="/" element={
            <PrivateRoute>
              <Feed />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
