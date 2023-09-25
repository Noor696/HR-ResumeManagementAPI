import './App.css';
import { BrowserRouter as Router,Routes, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './main-pages/Home';
import Footer from './components/Footer';
import { ToastContainer } from "react-toastify";
import SignIn from './main-pages/SignIn';
import Candidates from './main-pages/Candidates';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext';


function App() {
  return (
    <>
    <ToastContainer hideProgressBar={true} newestOnTop={true}/>
    <Router>
      <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} exact/>

        <Route path='/sign-in' element={<SignIn />} exact/>

        <Route element={<PrivateRoute />}>
          <Route path='/candidates' element={<Candidates />} exact/>
        </Route>
      </Routes>
      <Footer />
      </AuthProvider>
    </Router>
      
    </>
  );
}

export default App;


{/* <Route element={<PrivateRoute />}>
   <Route path="/" element={<Dashboard />} exact></Route>
</Route>; */}
