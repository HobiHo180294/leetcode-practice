const MOD = 1_000_000_007;

function getConsecutiveCharCounts(word) {
  return word.match(/(.)\1*/g).map(group => group.length);
}

function getTotalCombinations(consecutiveCharCounts) {
  return consecutiveCharCounts.reduce(
    (multiplier, combinationsCount) => (multiplier * combinationsCount) % MOD,
    1
  );
}

function buildPrefixSum(numbers) {
  const prefix = [0];

  for (let i = 0; i < numbers.length; i++) {
    prefix.push((prefix[i] + numbers[i]) % MOD);
  }

  return prefix;
}

function buildDPMatrixRow(previousRow, windowSize, columns) {
  const prefix = buildPrefixSum(previousRow);

  return Array.from({ length: columns }, (_, j) =>
    j === 0 ? 0 : (prefix[j] - prefix[Math.max(0, j - windowSize)] + MOD) % MOD
  );
}

function fillDPMatrixWithPrefix(windowsSizes, rows, columns) {
  const baseRow = [1, ...Array(columns - 1).fill(0)];

  return Array.from({ length: rows }).reduce(
    (matrix, _, i) =>
      i === 0
        ? [baseRow]
        : [
            ...matrix,
            buildDPMatrixRow(matrix[i - 1], windowsSizes[i - 1], columns),
          ],
    []
  );
}

function sumDPmatrixRow(matrix, rowIndex) {
  return matrix[rowIndex].reduce((sum, value) => (sum + value) % MOD, 0);
}

function getPossibleStringCount() {
  return function (word, k) {
    const consecutiveCharCounts = getConsecutiveCharCounts(word);
    const totalCombinations = getTotalCombinations(consecutiveCharCounts) % MOD;

    if (k <= consecutiveCharCounts.length) return totalCombinations;

    const dpMatrix = fillDPMatrixWithPrefix(
      consecutiveCharCounts,
      consecutiveCharCounts.length + 1,
      k
    );

    const forbidden = sumDPmatrixRow(dpMatrix, dpMatrix.length - 1);

    return (totalCombinations - forbidden + MOD) % MOD;
  };
}

const possibleStringCount = getPossibleStringCount();