/**
 * @param {string} word
 * @return {number}
 */
var possibleStringCount = function (word) {
    return 1 + word.match(/(.)\1*/g)
        .map(g => g.length - 1)
        .reduce((sum, x) => sum + (x > 0 ? x : 0), 0);
};