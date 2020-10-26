// Exports animation "frames" for shell sort algorithm
export default function shellSortAnimations(array) {
  let animations = [];
  let arr = array.slice();
  shellSort(arr, animations);
  // Set all array bars to finished color
  for (let i = 0; i < array.length; i++) {
    animations.push([2, i, i]);
  }
  return [animations, arr];
}

// Shell sort algorithm
const shellSort = (array, animations) => {
  for (
    let diff = Math.floor(array.length / 2);
    diff > 0;
    diff = Math.floor(diff / 2)
  ) {
    for (let i = diff; i < array.length; i++) {
      let temp = array[i];
      let j;
      for (j = i; j >= diff && array[j - diff] > temp; j = j - diff) {
        animations.push([0, j - diff, i]);
        animations.push([1, j - diff, i]);
        animations.push([3, j, array[j - diff]]);
        array[j] = array[j - diff];
      }
      animations.push([3, j, temp]);
      array[j] = temp;
    }
  }
  return 0;
}