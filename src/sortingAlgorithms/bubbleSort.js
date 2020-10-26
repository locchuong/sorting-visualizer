// Exports animation "frames" for bubble sort algorithm
export default function bubbleSortAnimations(array) {
  let animations = [];
  let arr = array.slice();
  bubbleSort(arr, animations);
  return [animations, arr];
}
// Bubble sort algorithm
const bubbleSort = (array, animations) => {
  let length = array.length;
  // Swap values if the current index j is less than the next index 
  for (let i = 0; i < length - 1; i++) {
    for (var j = 0; j < array.length - i - 1; j++) {
      animations.push([0, j, j + 1]);
      animations.push([1, j, j + 1]);
      if (array[j] > array[j + 1]) {
        animations.push([3, j, array[j + 1]]);
        animations.push([3, j + 1, array[j]]);
        swapVal(array, j, j + 1);
      }
    }
    animations.push([2, j, j]);
  }
  animations.push([2, 0, 0]);
}

// Swaps two values in an array
function swapVal(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
