import { Toaster } from "react-hot-toast";
import "./App.css";
import { Home } from "./pages/home";

function App() {
  return (
    <div className="bg-slate-100 w-screen h-screen">
      <Toaster />
      <h1 >Just do it.</h1>

      <Home />
    </div>
  );
}

export default App;
