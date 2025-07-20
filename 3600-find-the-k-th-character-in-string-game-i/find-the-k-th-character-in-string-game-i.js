function getNextWordPart(word) {
    let next = '';

    for (const char of word) {
        next += String.fromCharCode(char.charCodeAt(0) + 1);
    }

    return word + next;
}

function getkthCharacter() {
    /**
     * @param {number} k
     * @return {character}
     */
    return function (k) {
        let word = 'a';

        while (word.length < k) {
            word = getNextWordPart(word);
        }

        return word[k - 1];
    };
}

const kthCharacter = getkthCharacter();