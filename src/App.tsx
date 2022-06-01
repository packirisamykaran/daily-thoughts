
import Login from './components/auth/Login';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppProvider from './contexts/AppProvider';
import RequireLogin from "./components/hoc/RequireLogin"
import Profile from './components/profile/Profile';
import Signup from './components/auth/Signup';
import AppNav from './components/appNav/AppNav';
import PostForm from './components/post/PostForm';
import Explore from './components/explore/Explore';
import Feeds from './components/feed/Feeds';
import UpdateProfile from './components/profile/UpdateProfile';


function App() {
  
  return (
    <BrowserRouter>
      <AppProvider>
      <div className="App">
            <Routes>
              <Route path='/daily-thoughts' element={<RequireLogin><AppNav/></RequireLogin>} >
                <Route  path='profile/:username' element={<RequireLogin><Profile/></RequireLogin>} />
                <Route path='explore' element={<RequireLogin><Explore /></RequireLogin>} >
                  <Route path='profile/:username' element={<RequireLogin><Profile/></RequireLogin>} />
                </Route>
                <Route path='post' element={<RequireLogin><PostForm/></RequireLogin>} />
                <Route path="feed" element={<RequireLogin><Feeds/></RequireLogin>} />
                <Route path='updateprofile' element={<RequireLogin><UpdateProfile/></RequireLogin>}/>
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
