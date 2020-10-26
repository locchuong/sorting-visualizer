import React from "react";
import "./SortingVisualizer.css";
import mergeSortAnimations from "../sortingAlgorithms/mergeSort.js"
import quickSortAnimations from "../sortingAlgorithms/quickSort.js"
import heapSortAnimations from "../sortingAlgorithms/heapSort.js"
import bubbleSortAnimations from "../sortingAlgorithms/bubbleSort.js"
import selectionSortAnimations from "../sortingAlgorithms/selectionSort.js"
import shellSortAnimations from "../sortingAlgorithms/shellSort.js"
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import RangeSlider from "react-bootstrap-range-slider";

const PRIMARY_COLOR = "red"; // Unsorted array bar color
const SECONDARY_COLOR = "blue"; // Comparing array bar color
const FINISH_COLOR = "green"; // Sorted array bar color
const MERGESORT = 0;
const QUICKSORT = 1;
const HEAPSORT = 2;
const BUBBLESORT = 3;
const SELECTIONSORT = 4;
const SHELLSORT = 5;

const PRIMARY_COLOR_EVENT = 1;
const SECONDARY_COLOR_EVENT  = 0;
const SWAP_EVENT = 3; // Signifies to animations array to swap values in array bars
// const FINISH_COLOR_EVENT = 2;

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [], // Array of numbers of size this.state.size
      ANIMATION_DELAY: 1, // Animation speed (for visibility)
      size: 100, // Size of array
      isInputDisabled: false,
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
    this.setState({isInputDisabled: true});
    const [animations, arr] = this.getAnimations(algo);
    const arrayBars = document.getElementsByClassName("array-bar");
    // Go through each animation "frame"
    for (let i = 0; i < animations.length; i++) {
      const [event, valA, valB] = animations[i];
      if (event !== SWAP_EVENT) {
        let color =
          event === SECONDARY_COLOR_EVENT
            ? SECONDARY_COLOR
            : event === PRIMARY_COLOR_EVENT
            ? PRIMARY_COLOR
            : FINISH_COLOR;
        const aStyle = arrayBars[valA].style;
        const bStyle = arrayBars[valB].style;
        setTimeout(() => {
          aStyle.backgroundColor = color;
          bStyle.backgroundColor = color;
        }, i * this.state.ANIMATION_DELAY);
      } else {
        const style = arrayBars[valA].style;
        setTimeout(() => {
          style.height = `${valB}px`;
        }, i * this.state.ANIMATION_DELAY);
      }
    }
    setTimeout(() => {
      this.setState({isInputDisabled: false, array: arr});
    }, animations.length * this.state.ANIMATION_DELAY);
  }

  // Handles sorting algorithm to use
  getAnimations(algo) {
    switch (algo) {
      case MERGESORT:
        return mergeSortAnimations(this.state.array);
      case QUICKSORT:
        return quickSortAnimations(this.state.array);
      case HEAPSORT:
        return heapSortAnimations(this.state.array);
      case BUBBLESORT:
        return bubbleSortAnimations(this.state.array);
      case SELECTIONSORT:
        return selectionSortAnimations(this.state.array);
      case SHELLSORT:
        return shellSortAnimations(this.state.array);
      default:
        return quickSortAnimations(this.state.array);
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
            disabled={this.state.isInputDisabled}
            onClick={() => this.resetArray(this.state.size)}>
            Generate New Array
          </button>
          <button disabled={this.state.isInputDisabled} onClick={() => this.sort(MERGESORT)}>Merge Sort</button>
          <button disabled={this.state.isInputDisabled} onClick={() => this.sort(QUICKSORT)}>Quick Sort</button>
          <button disabled={this.state.isInputDisabled} onClick={() => this.sort(HEAPSORT)}>Heap Sort</button>
          <button disabled={this.state.isInputDisabled} onClick={() => this.sort(BUBBLESORT)}>Bubble Sort</button>
          <button disabled={this.state.isInputDisabled} onClick={() => this.sort(SELECTIONSORT)}>Selection Sort</button>
          <button disabled={this.state.isInputDisabled} onClick={() => this.sort(SHELLSORT)}>Shell Sort</button>
          <div className="animations">
            <h4> Animation Delay </h4>
            <RangeSlider
              value={this.state.ANIMATION_DELAY}
              min={0}
              max={10}
              size="sm"
              tooltip="auto"
              tooltipPlacement="top"
              variant="success"
              onChange={(changeEvent) =>
                this.setState({ ANIMATION_DELAY: changeEvent.target.value })
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
