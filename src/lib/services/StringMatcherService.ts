export class StringMatcherService {
  matchPercentage(
    input1: string,
    input2: string,
    caseSensitive: boolean,
  ): number {
    if (input1.length === 0 || input2.length === 0) return 0;

    const str1 = caseSensitive ? input1 : input1.toLowerCase();
    const str2 = caseSensitive ? input2 : input2.toLowerCase();

    const uniqueChars = [...new Set(str1.split(""))];
    let matchCount = 0;

    for (const char of uniqueChars) {
      for (let j = 0; j < str2.length; j++) {
        if (str2[j] === char) {
          matchCount++;
          break;
        }
      }
    }

    const percentage = (matchCount / uniqueChars.length) * 100;
    return Math.round(percentage * 100) / 100;
  }
}
