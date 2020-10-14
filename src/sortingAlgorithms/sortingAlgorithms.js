//  Sources of Help: 
//    geeksforgeeks.org/
//    "Sorting Visualizer Tutorial (software engineering project)"
//     https://www.youtube.com/watch?v=pFXYym4Wbkc"


// SHELL SORT
export function shellSortAnimations(array) {
  let animations = [];
  shellSort(array, animations);
  for(let i = 0; i < array.length; i++) {
    animations.push([2, i, i]);
  }
  return animations;
};

export const shellSort = (array, animations) => {
  for(let diff = Math.floor(array.length/2); diff > 0; diff = Math.floor(diff/2)) {
    for(let i = diff; i < array.length; i++) {
      let temp = array[i];
      let j;
      for(j = i; j >= diff && array[j-diff] > temp; j = j-diff) {
        animations.push([0, j-diff, i]);
        animations.push([1, j-diff, i]);
        animations.push([3, j, array[j-diff]]);
        array[j] = array[j-diff];
      }
      animations.push([3, j, temp]);
      array[j] = temp;
    }
  }
  return 0;
};


// HEAP SORT
export function heapSortAnimations(array) {
  let animations = [];
  heapSort(array, animations);
  return animations;
};

export const heapSort = (array, animations) => {
  let len = array.length;
  for(let i = Math.floor(len/2 -1); i >= 0; i--) {
    heapify(array, animations, len, i);
  }
  for(let i = len - 1; i > 0; i--) {
    animations.push([3, 0, array[i]]);
    animations.push([3, i, array[0]]);
    swapVal(array, 0, i);
    heapify(array, animations, i, 0);
    animations.push([2, i, i]);
  }
  animations.push([2, 0, 0]);
};

function heapify(array, animations, len, i) {
  let max = i;
  let left = 2*i + 1;
  let right = 2*i + 2;
  if( left < len && array[left] > array[max]) {
    animations.push([0, left, max]);
    animations.push([1, left, max]);
    max = left;
  }
  if(right < len && array[right] > array[max]) {
    animations.push([0, right, max]);
    animations.push([1, right, max]);
    max = right;
  }
  if(max !== i) {
    animations.push([3, i, array[max]]);
    animations.push([3, max, array[i]]);
    swapVal(array, i, max);
    heapify(array, animations, len, max);
  }
}

// MERGE SORT
export function mergeSortAnimations(array) {
  let animations = [];
  mergeSort(array, animations, 0, array.length -1);
  return animations;
};

export const mergeSort = (array, animations, low, high) => {
  if( low < high) {
    let mid = low + Math.floor((high-low)/2);
    mergeSort(array, animations, low, mid);
    mergeSort(array, animations, mid + 1, high);
    merge(array, animations, low, mid, high);
  }
  if(low === 0 && high === array.length -1) {
    for(let i = 0; i < array.length; i++) {
      animations.push([2, i, i]);
    }
  }
};

function merge(array, animations, low, mid, high) {
  // Size of sub arrays
  let len1 = mid - low + 1;
  let len2 = high - mid;
  
  // Temporary arrays
  let left = array.slice(low, low + len1);
  let right = array.slice(mid + 1, mid + 1 + len2);

  let i = 0; // Idx of first subarray
  let j = 0; // Idx of second subarray
  let k = low; // Idx of merged subarray
  while( i < len1 && j < len2) {
    animations.push([0, low + i, mid + j + 1]);
    animations.push([1, low + i, mid + j + 1]);
    if(left[i] <= right[j]) {
      animations.push([3, k, left[i]]);
      array[k] = left[i];
      i++;
    }
    else {
      animations.push([3, k, right[j]]);
      array[k] = right[j];
      j++;
    }
    k++;
  }
  while( i < len1) {
    animations.push([3, k, left[i]]);
    array[k] = left[i];
    i++;
    k++;
  }
  while(j < len2) {
    animations.push([3, k, right[j]]);
    array[k] = right[j];
    j++;
    k++;
  }
}


// BUBBLE SORT
export function bubbleSortAnimations(array) {
  let animations = [];
  bubbleSort(array, animations);
  return animations;
};

export const bubbleSort = (array, animations) => {
  let length = array.length;
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
};

// QUICK SORT
export function quickSortAnimations(array) {
    let animations = [];
    quickSort(array, animations, 0, array.length-1);
    return animations;
}
export const quickSort = (array, animations, low, high) => {
    if( low <= high) {
        var parIdx = partition(array, animations, low, high);
        quickSort(array, animations, low, parIdx - 1); // Quick Sort before partition index
        quickSort(array, animations, parIdx + 1, high); // Quick Sort after partition index
    }
};

function partition(array, animations, low, high) {
    let pivot = array[high]; // Element to be place at correct position
    let i = (low - 1); // Index of smaller element
    for(var j = low; j < high; j++) {
        animations.push([0, j, high]);
        animations.push([1, j, high]);
        if(array[j] <= pivot) {
            i++;
            animations.push([3, j, array[i]]);
            animations.push([3, i, array[j]]);
            swapVal(array, i, j);
        }
    }
    animations.push([3, i+1, array[high]]);
    animations.push([3, high, array[i+1]]);
    animations.push([2, i+1, i+1]);
    swapVal(array, i+1, high);
    return (i+1);
}

// SELECTION SORT
export function selectionSortAnimations(array) {
  let animations = [];
  selectionSort(array, animations);
  return animations;
};
export const selectionSort = (array, animations) => {
  let min_idx;
  let length = array.length;
  for (let i = 0; i < length - 1; i++) {
    min_idx = i;
    for (let j = i + 1; j < length; j++) {
      animations.push([0, j, min_idx]);
      animations.push([1, j, min_idx]);
      if (array[j] < array[min_idx]) {
        min_idx = j;
      }
    }
    animations.push([3, i, array[min_idx]]);
    animations.push([3, min_idx, array[i]]);
    swapVal(array, i, min_idx);
    animations.push([2, i, i]);
  }
  animations.push([2, length-1, length-1]);
};

// GENERAL FUNCS
function swapVal(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
