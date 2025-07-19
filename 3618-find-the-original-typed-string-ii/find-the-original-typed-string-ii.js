const MOD = 1_000_000_007;

function getConsecutiveCharCounts(word) {
    return word.match(/(.)\1*/g).map(group => group.length);
}

function countTotalCombinations(consecutiveCharCounts) {
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

function countForbiddenCombinations(consecutiveCharCounts, k) {
    let prevRow = new Array(k).fill(0);
    let currRow = new Array(k).fill(0);

    prevRow[0] = 1;

    for (let i = 0; i < consecutiveCharCounts.length; i++) {
        const windowSize = consecutiveCharCounts[i];
        const prefix = buildPrefixSum(prevRow);

        for (let j = 1; j < k; j++) {
            const left = Math.max(0, j - windowSize);
            const right = j - 1;
            currRow[j] = (prefix[right + 1] - prefix[left] + MOD) % MOD;
        }

        [prevRow, currRow] = [currRow, prevRow];

        currRow.fill(0);
    }

    return prevRow.reduce((sum, val) => (sum + val) % MOD, 0);
}

function getPossibleStringCount() {
    /**
     * @param {string} word
     * @param {number} k
     * @return {number}
     */
    return function (word, k) {
        const consecutiveCharCounts = getConsecutiveCharCounts(word);
        const totalCombinations =
            countTotalCombinations(consecutiveCharCounts) % MOD;

        if (k <= consecutiveCharCounts.length) return totalCombinations;

        const forbiddenCombinations = countForbiddenCombinations(
            consecutiveCharCounts,
            k
        );

        return (totalCombinations - forbiddenCombinations + MOD) % MOD;
    };
}

const possibleStringCount = getPossibleStringCount();