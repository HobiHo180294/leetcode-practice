/**
 * @param {string} word
 * @return {number}
 */
function getPossibleStringCount() {
  const MINIMAL_GROUP_LENGTH = 1;
  const CONSECUTIVE_CHAR_GROUP_REGEX = /(.)\1*/g;

  return function (word) {
    return (
      MINIMAL_GROUP_LENGTH +
      word
        .match(CONSECUTIVE_CHAR_GROUP_REGEX)
        .map(group => group.length - MINIMAL_GROUP_LENGTH)
        .reduce((total, variantsFromGroup) => total + variantsFromGroup, 0)
    );
  };
}

const possibleStringCount = getPossibleStringCount();