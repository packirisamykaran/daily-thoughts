
import Login from './components/auth/Login';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Feed from './components/feed/Feed';
import AppProvider from './contexts/AppProvider';
import RequireLogin from "./components/hoc/RequireLogin"
import Profile from './components/profile/Profile';
import Signup from './components/auth/Signup';
import AppNav from './components/appNav/AppNav';
import PostForm from './components/post/PostForm';


function App() {
  
  return (
    <BrowserRouter>
      <AppProvider>
      <div className="App">
            <Routes>
              <Route path='/' element={<AppNav/>} >
                <Route path='profile' element={<Profile/>} />
                <Route path='post' element={<PostForm/>} />
                <Route path="feed" element={<Feed/>} />
              </Route>
              <Route path='signup' element={<Signup/>} />
              <Route path="login" element={<Login />} />
            </Routes>
      </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
