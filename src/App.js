import React from "react";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import "./App.css";
import Footer from "./footer";
function App() {
  return (
    <div className="App">
      <div class="header">
        <h1> SORTING VISUALIZER </h1>
      </div>
        <SortingVisualizer ></SortingVisualizer>
        <Footer></Footer>
    </div>
  );
}

export default App;
