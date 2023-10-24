import { ToastContainer } from "react-toastify";
import { HomePage } from "./pages/HomePage";
import { useState } from "react";
import "./styles/index.scss";

function App() {
  const [isVisible, setVisible] = useState(false);

  return (
    <>
      <HomePage isVisible={isVisible} setVisible={setVisible} />
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
