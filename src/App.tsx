import { Toaster } from "react-hot-toast";
import "./App.css";
import { Home } from "./pages/home";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <Home />
    </DndProvider>
  );
}

export default App;
