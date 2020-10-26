// Exports animation "frames" for quick sort algorithm
export default function quickSortAnimations(array) {
  let animations = [];
  let arr = array.slice();
  quickSort(arr, animations, 0, array.length - 1);
  return [animations, arr];
}
// Quick sort Algorithm
const quickSort = (array, animations, low, high) => {
  if (low <= high) {
    var parIdx = partition(array, animations, low, high);
    quickSort(array, animations, low, parIdx - 1); // Quick Sort before partition index
    quickSort(array, animations, parIdx + 1, high); // Quick Sort after partition index
  }
}

// Quick sort helper
function partition(array, animations, low, high) {
  let pivot = array[high]; // Element to be place at correct position
  let i = low - 1; // Index of smaller element
  for (var j = low; j < high; j++) {
    animations.push([0, j, high]);
    animations.push([1, j, high]);
    if (array[j] <= pivot) {
      i++;
      animations.push([3, j, array[i]]);
      animations.push([3, i, array[j]]);
      swapVal(array, i, j);
    }
  }
  animations.push([3, i + 1, array[high]]);
  animations.push([3, high, array[i + 1]]);
  animations.push([2, i + 1, i + 1]);
  swapVal(array, i + 1, high);
  return i + 1;
}

// Swaps two values in an array
function swapVal(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
