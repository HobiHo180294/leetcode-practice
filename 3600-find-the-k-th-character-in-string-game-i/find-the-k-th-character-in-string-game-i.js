function getNextWordPart(word) {
    let next = '';

    for (const char of word) {
        next += String.fromCharCode(char.charCodeAt(0) + 1);
    }

    return word + next;
}

/**
 * @param {number} k
 * @return {character}
 */
const kthCharacter = function getkthCharacter(k) {
    let word = 'a';

    while (word.length < k) {
        word = getNextWordPart(word);
    }

    return word[k - 1];
};