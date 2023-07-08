import 'react-native-get-random-values';
import * as bip39 from 'bip39';

export function generateMnemonic(params: any) {
    const { number, language } = params;
    if (!number && !language) {
        throw new Error('Must have language and language');
    }
    switch (language) {
        case 'chinese_simplified':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.chinese_simplified);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.chinese_simplified);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.chinese_simplified);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.chinese_simplified);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.chinese_simplified);
            } else {
                throw new Error("Don't support this number");
            }
        case 'chinese_traditional':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.chinese_traditional);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.chinese_traditional);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.chinese_traditional);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.chinese_traditional);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.chinese_traditional);
            } else {
                throw new Error("Don't support this number");
            }
        case 'english':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.english);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.english);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.english);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.english);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.english);
            } else {
                throw new Error("Don't support this number");
            }
        case 'french':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.french);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.french);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.french);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.french);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.french);
            } else {
                throw new Error("Don't support this number");
            }
        case 'italian':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.italian);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.italian);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.italian);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.italian);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.italian);
            } else {
                throw new Error("Don't support this number");
            }
        case 'japanese':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.japanese);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.japanese);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.japanese);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.japanese);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.japanese);
            } else {
                throw new Error("Don't support this number");
            }
        case 'korean':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.korean);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.korean);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.korean);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.korean);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.korean);
            } else {
                throw new Error("Don't support this number");
            }
        case 'spanish':
            if (number === 12) {
                return bip39.generateMnemonic(128, undefined, bip39.wordlists.spanish);
            } else if (number === 15) {
                return bip39.generateMnemonic(160, undefined, bip39.wordlists.spanish);
            } else if (number === 18) {
                return bip39.generateMnemonic(192, undefined, bip39.wordlists.spanish);
            } else if (number === 21) {
                return bip39.generateMnemonic(224, undefined, bip39.wordlists.spanish);
            } else if (number === 24) {
                return bip39.generateMnemonic(256, undefined, bip39.wordlists.spanish);
            } else {
                throw new Error("Don't support this number");
            }
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}

export function encodeMnemonic(params: any) {
    const { mnemonic, language } = params;
    if (!mnemonic && !language) {
        throw new Error('Must have mnemonic and language');
    }
    switch (language) {
        case 'chinese_simplified':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.mnemonicToEntropy(mnemonic, bip39.wordlists.spanish);
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}

export function decodeMnemonic(params: any) {
    const { encrytMnemonic, language } = params;
    if (!encrytMnemonic && !language) {
        throw new Error('Must have mnemonic and language');
    }
    switch (language) {
        case 'chinese_simplified':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.entropyToMnemonic(encrytMnemonic, bip39.wordlists.spanish);
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}

export function mnemonicToSeed(params: any) {
    const { mnemonic, password } = params;
    if (!mnemonic) {
        throw new Error('Must have mnemonic');
    }
    return bip39.mnemonicToSeedSync(mnemonic, password);
}

export function validateMnemonic(params: any) {
    const { mnemonic, language } = params;
    if (!mnemonic && !language) {
        throw new Error('Must have mnemonic and language');
    }
    switch (language) {
        case 'chinese_simplified':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_simplified);
        case 'chinese_traditional':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.chinese_traditional);
        case 'english':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.english);
        case 'french':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.french);
        case 'italian':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.italian);
        case 'japanese':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.japanese);
        case 'korean':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.korean);
        case 'spanish':
            return bip39.validateMnemonic(mnemonic, bip39.wordlists.spanish);
        default:
            throw new Error('Temporarily does not support the situation you want');
    }
}
