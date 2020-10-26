// Exports animation "frames" for heap sort algorithm
export default function heapSortAnimations(array) {
  let animations = [];
  let arr = array.slice();
  heapSort(arr, animations);
  return [animations, arr];
}

// Heap Sort Algorithm
const heapSort = (array, animations) => {
  let len = array.length;
  for (let i = Math.floor(len / 2 - 1); i >= 0; i--) {
    heapify(array, animations, len, i);
  }
  for (let i = len - 1; i > 0; i--) {
    animations.push([3, 0, array[i]]);
    animations.push([3, i, array[0]]);
    swapVal(array, 0, i);
    heapify(array, animations, i, 0);
    animations.push([2, i, i]);
  }
  animations.push([2, 0, 0]);
}

// Heap sort helper
function heapify(array, animations, len, i) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < len && array[left] > array[max]) {
    animations.push([0, left, max]);
    animations.push([1, left, max]);
    max = left;
  }
  if (right < len && array[right] > array[max]) {
    animations.push([0, right, max]);
    animations.push([1, right, max]);
    max = right;
  }
  if (max !== i) {
    animations.push([3, i, array[max]]);
    animations.push([3, max, array[i]]);
    swapVal(array, i, max);
    heapify(array, animations, len, max);
  }
}

// Swaps two values in an array
function swapVal(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
