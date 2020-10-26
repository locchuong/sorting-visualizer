// Exports animation "frames" for merge sort algorithm
export default function mergeSortAnimations(array) {
  let animations = [];
  let arr = array.slice();
  mergeSort(arr, animations, 0, array.length - 1);
  return [animations, arr];
}

// Merge sort Algorithm
const mergeSort = (array, animations, low, high) => {
  if (low < high) {
    let mid = low + Math.floor((high - low) / 2);
    mergeSort(array, animations, low, mid);
    mergeSort(array, animations, mid + 1, high);
    merge(array, animations, low, mid, high);
  }
  if (low === 0 && high === array.length - 1) {
    for (let i = 0; i < array.length; i++) {
      animations.push([2, i, i]);
    }
  }
}

// Merge sort helper
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
  while (i < len1 && j < len2) {
    animations.push([0, low + i, mid + j + 1]);
    animations.push([1, low + i, mid + j + 1]);
    if (left[i] <= right[j]) {
      animations.push([3, k, left[i]]);
      array[k] = left[i];
      i++;
    } else {
      animations.push([3, k, right[j]]);
      array[k] = right[j];
      j++;
    }
    k++;
  }
  while (i < len1) {
    animations.push([3, k, left[i]]);
    array[k] = left[i];
    i++;
    k++;
  }
  while (j < len2) {
    animations.push([3, k, right[j]]);
    array[k] = right[j];
    j++;
    k++;
  }
}
