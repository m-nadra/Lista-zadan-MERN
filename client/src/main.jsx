import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from 'react-router'
import { TaskProvider } from "./contexts/TaskContext"
import Main from "./components/Main"
import Signup from "./components/Signup"
import Login from "./components/Login"
import "./styles/globals.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <TaskProvider>
          <Main />
        </TaskProvider>
      } />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
