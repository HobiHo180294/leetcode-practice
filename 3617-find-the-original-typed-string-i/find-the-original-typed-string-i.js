/**
 * @param {string} word
 * @return {number}
 */
var possibleStringCount = function (word) {
    return (
        1 +
        word
            .match(/(.)\1*/g)
            .map(group => group.length - 1)
            .reduce((sum, x) => sum + x, 0)
    );
};