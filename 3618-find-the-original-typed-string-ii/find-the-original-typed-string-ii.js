const MOD = 1_000_000_007;

function getConsecutiveCharCounts(word) {
  return word.match(/(.)\1*/g).map(group => group.length);
}

function getTotalAmountOfCombinations(consecutiveCharCounts) {
  return consecutiveCharCounts.reduce(
    (multiplier, combinationsCount) => (multiplier * combinationsCount) % MOD,
    1
  );
}

function buildPrefixSum(arr) {
  const prefix = [0];

  for (let i = 0; i < arr.length; i++) {
    prefix.push((prefix[i] + arr[i]) % MOD);
  }

  return prefix;
}

function fillDPMatrixWithPrefix(windowsSizes, rows, columns) {
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    matrix[i] = [];

    for (let j = 0; j < columns; j++) {
      if (i === 0 && j === 0) {
        matrix[i][j] = 1;
      } else if (i === 0 || j === 0) {
        matrix[i][j] = 0;
      } else {
        matrix[i][j] = 0;
      }
    }

    if (i > 0) {
      const prefix = buildPrefixSum(matrix[i - 1]);
      const windowSize = windowsSizes[i - 1];
      for (let j = 1; j < columns; j++) {
        const l = Math.max(0, j - windowSize);
        const r = j - 1;
        matrix[i][j] = (prefix[r + 1] - prefix[l] + MOD) % MOD;
      }
    }
  }

  return matrix;
}

function sumLastRow(matrix) {
  return matrix.at(-1).reduce((sum, value) => (sum + value) % MOD, 0);
}

var possibleStringCount = function (word, k) {
  const consecutiveCharCounts = getConsecutiveCharCounts(word);

  if (k <= consecutiveCharCounts.length) {
    return getTotalAmountOfCombinations(consecutiveCharCounts) % MOD;
  }

  const rows = consecutiveCharCounts.length + 1;
  const columns = k;
  const matrix = fillDPMatrixWithPrefix(consecutiveCharCounts, rows, columns);

  return (
    (getTotalAmountOfCombinations(consecutiveCharCounts) -
      sumLastRow(matrix) +
      MOD) %
    MOD
  );
};