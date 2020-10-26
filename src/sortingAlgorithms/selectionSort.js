// Exports animation "frames" for selection sort algorithm
export default function selectionSortAnimations(array) {
  let animations = [];
  let arr = array.slice();
  selectionSort(arr, animations);
  return [animations, arr];
}
// Selection sort Algorithm
const selectionSort = (array, animations) => {
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
  animations.push([2, length - 1, length - 1]);
}
// Swaps two values in an array
function swapVal(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}
