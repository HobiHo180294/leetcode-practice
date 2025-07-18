function getPossibleStringCount() {
    const ORIGINAL_STRING_COUNT = 1;
    const MINIMAL_GROUP_LENGTH = 1;
    const CONSECUTIVE_CHAR_GROUP_REGEX = /(.)\1*/g;

    /**
     * @param {string} word
     * @return {number}
     */
    return function (word) {
        return (
            ORIGINAL_STRING_COUNT +
            word
                .match(CONSECUTIVE_CHAR_GROUP_REGEX)
                .map(group => group.length - MINIMAL_GROUP_LENGTH)
                .reduce((total, variantsFromGroup) => total + variantsFromGroup, 0)
        );
    };
}

const possibleStringCount = getPossibleStringCount();