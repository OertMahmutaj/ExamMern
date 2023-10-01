import PirateDetails from "./components/pirates/PirateDetails";
import PirateForm from "./components/pirates/PirateForm";
import PirateList from "./components/pirates/PirateList";
import AuthForm from "./components/user/AuthForm";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './components/styles/app.css';


function App() {
  

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<AuthForm />} path="/" />
          <Route element={<PirateForm />} path="/pirate/new" />
          <Route element={<PirateList />} path="/pirates" />
          <Route element={<PirateDetails />} path="/pirate/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
