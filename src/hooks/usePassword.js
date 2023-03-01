



const NUMBERS = '0123456789';
const UPPERCASE_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARACTERS = 'abcdefghijklmnopqrstuvwxyz';
const SPECIAL_CHARACTERS = "!'^+%&/()=?_$#{[]}|;:>÷`<.*-@";

const defaultOpt = {
    numbers: true,
    symbmbols: true,
    lowerase: true,
    uppercase: true,
    excludeSimilarCharacters: true
}
const excludeDuplicateChar = (str) => {
    if (!str) return str;
    const finalResult = Array.from(str).reduce((lastConcated, currentChar) => {
        if (Array.from(SPECIAL_CHARACTERS).includes(currentChar)) {
            return lastConcated + currentChar;
        }
        let caseSenstiveRegex;
        try {
            caseSenstiveRegex = new RegExp(currentChar, "i");
        } catch (ex) {
            console.log('regex error:', currentChar);
        }

        return caseSenstiveRegex?.test(lastConcated) ? lastConcated : lastConcated + currentChar;
    });
    return finalResult;
}
const usePassword = (opts = {}) => {
    let { numbers, symbmbols, lowerase, uppercase, excludeSimilarCharacters } = { ...defaultOpt, ...opts }

    if (!numbers && !symbmbols && !lowerase && !uppercase) {
        throw Error("At least one option should be true.")
    }
    let payload = '';
    if (numbers) {
        payload += NUMBERS;
    }
    if (lowerase) {
        payload += LOWERCASE_CHARACTERS;
    }
    if (uppercase) {
        payload += UPPERCASE_CHARACTERS;
    }
    if (symbmbols) {
        payload += SPECIAL_CHARACTERS;
    }
    const payloadLength = payload.length

    function genPass(pass, requiredLength) {
        if (pass?.length >= requiredLength) {
            return pass;
        }
        for (let i = 0; i < requiredLength; i++) {
            const characterIndex = Math.round(Math.random() * payloadLength)
            pass = pass + payload.charAt(characterIndex)
            if (excludeSimilarCharacters) {
                pass = excludeDuplicateChar(pass);
            }
        }
        return genPass(pass, requiredLength);
    }
    return (min = 8, max = 22) => {
        let password = '';
        const requiredLength = Math.floor(Math.random() * (max - min + 1) + min);
        return genPass(password, requiredLength);
    }
}

export default usePassword;