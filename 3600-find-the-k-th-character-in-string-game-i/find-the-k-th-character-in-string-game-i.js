/**
 * @param {number} k
 * @return {character}
 */
var kthCharacter = function (k) {
  let word = 'a';

  while (word.length < k) {
    for (char of word) {
      const nextCharByASCII = String.fromCharCode(char.charCodeAt(0) + 1);
      word += nextCharByASCII;
    }
  }

  return word[k - 1];
};