
import Login from './components/auth/Login';
import './App.css'
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
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
    <BrowserRouter basename='/daily-thoughts'>
      <AppProvider>
      <div className="App">
            <Routes>
                <Route  path="/"  element={<div>hello</div>} >
                  <Route  path='profile/:username' element={<Profile/>} />
                  <Route path='explore' element={<Explore />} >
                    <Route path='profile/:username' element={<Profile/>} />
                  </Route>
                  <Route path='post' element={<PostForm/>} />
                  <Route  path ="feed" element={<Feeds/>} />
                  <Route path='updateprofile' element={<UpdateProfile/>}/>
                </Route>
                <Route path='/signup' element={<Signup/>} />
                <Route path="/login" element={<Login />} />
                {/* <Route path="*" element={<Login/>}/> */}
            </Routes>
      </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
