export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(
    mainArray,
    startIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(
    mainArray,
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
  ) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }

  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    const auxiliaryArray = array.slice();
    quickSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function quickSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx < endIdx) {
      const pivotIdx = partition(mainArray, startIdx, endIdx, auxiliaryArray, animations);
      quickSortHelper(mainArray, startIdx, pivotIdx - 1, auxiliaryArray, animations);
      quickSortHelper(mainArray, pivotIdx + 1, endIdx, auxiliaryArray, animations);
    }
  }
  
  function partition(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    const pivotValue = auxiliaryArray[endIdx];
    let pivotIdx = startIdx;
  
    for (let i = startIdx; i < endIdx; i++) {
      // Push animation for comparing elements
      animations.push([i, endIdx]);
      // Push animation for reverting element colors
      animations.push([i, endIdx]);
  
      if (auxiliaryArray[i] <= pivotValue) {
        // Push animation for swapping elements
        animations.push([i, pivotIdx, auxiliaryArray[i], auxiliaryArray[pivotIdx]]);
        
        // Swap elements in the auxiliary array
        const temp = auxiliaryArray[i];
        auxiliaryArray[i] = auxiliaryArray[pivotIdx];
        auxiliaryArray[pivotIdx] = temp;
  
        pivotIdx++;
      }
    }
  
    // Push animation for swapping pivot and element at pivotIdx
    animations.push([pivotIdx, endIdx, auxiliaryArray[pivotIdx], auxiliaryArray[endIdx]]);
    
    // Swap pivot and element at pivotIdx
    const temp = auxiliaryArray[pivotIdx];
    auxiliaryArray[pivotIdx] = auxiliaryArray[endIdx];
    auxiliaryArray[endIdx] = temp;
  
    return pivotIdx;
  }  