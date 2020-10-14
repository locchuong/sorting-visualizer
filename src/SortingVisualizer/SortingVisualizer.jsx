import React from "react";
import "./SortingVisualizer.css";
import * as sortingAlgorithms from "../sortingAlgorithms/sortingAlgorithms";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

const PRIMARY_COLOR = "red"; // Unsorted array bar color
const SECONDARY_COLOR = "blue"; // Comparing array bar color
const FINISH_COLOR = "green"; // Sorted array bar color
const SWAP = 3; // Signifies to animations array to swap values in array bars

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [], // Array of numbers of size this.state.size
      ANIMATION_SPEED: 1, // Animation speed (for visibility)
      size: 100, // Size of array
    };
  }
  
  // Runs when component has mounted
  componentDidMount() {
    this.resetArray(this.state.size);
  }

  // Resets unsorted array
  resetArray(size) {
    const arrayBars = document.getElementsByClassName("array-bar");
    for (let bar of arrayBars) {
      bar.style.backgroundColor = PRIMARY_COLOR;
    }
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({ array });
  }

  // Handles creating and reading animations array
  sort(algo) {
    const animations = this.getAnimations(algo);
    const arrayBars = document.getElementsByClassName("array-bar");
    // Go through each animation "frame"
    for (let i = 0; i < animations.length; i++) {
      const [event, valA, valB] = animations[i];
      if (event !== SWAP) {
        let color =
          event === 0
            ? SECONDARY_COLOR
            : event === 1
            ? PRIMARY_COLOR
            : FINISH_COLOR;
        const aStyle = arrayBars[valA].style;
        const bStyle = arrayBars[valB].style;
        setTimeout(() => {
          aStyle.backgroundColor = color;
          bStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_SPEED);
      } else {
        const style = arrayBars[valA].style;
        setTimeout(() => {
          style.height = `${valB}px`;
        }, i * this.state.ANIMATION_SPEED);
      }
    }
  }

  // Handles sorting algorithm to use
  getAnimations(algo) {
    switch (algo) {
      case 0:
        return sortingAlgorithms.mergeSortAnimations(this.state.array);
      case 1:
        return sortingAlgorithms.quickSortAnimations(this.state.array);
      case 2:
        return sortingAlgorithms.heapSortAnimations(this.state.array);
      case 3:
        return sortingAlgorithms.bubbleSortAnimations(this.state.array);
      case 4:
        return sortingAlgorithms.selectionSortAnimations(this.state.array);
      case 5:
        return sortingAlgorithms.shellSortAnimations(this.state.array);
      default:
        return sortingAlgorithms.quickSortAnimations(this.state.array);
    }
  }

  // Handles rendering the component
  render() {
    const { array } = this.state;
    return (
      <div className="visualizer-container">
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{ height: `${value}px` }}
            ></div>
          ))}
        </div>
        <div className="controls">
          <button
            id="resetbtn"
            onClick={() => this.resetArray(this.state.size)}>
            Generate New Array
          </button>
          <button onClick={() => this.sort(0)}>Merge Sort</button>
          <button onClick={() => this.sort(1)}>Quick Sort</button>
          <button onClick={() => this.sort(2)}>Heap Sort</button>
          <button onClick={() => this.sort(3)}>Bubble Sort</button>
          <button onClick={() => this.sort(4)}>Selection Sort</button>
          <button onClick={() => this.sort(5)}>Shell Sort</button>
          <div className="animations">
            <h4> Animation Speed </h4>
            <RangeSlider
              value={this.state.ANIMATION_SPEED}
              min={0}
              max={10}
              size="sm"
              tooltip="auto"
              tooltipPlacement="top"
              variant="success"
              onChange={(changeEvent) =>
                this.setState({ ANIMATION_SPEED: changeEvent.target.value })
              }
            />
            <h4> Array Size </h4>
            <RangeSlider
              value={this.state.size}
              min={2}
              max={200}
              step={2}
              size="sm"
              tooltip="auto"
              tooltipPlacement="top"
              variant="success"
              onChange={(changeEvent) => {
                this.resetArray(changeEvent.target.value);
                this.setState({ size: changeEvent.target.value });
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

// From StackOverFlow
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
