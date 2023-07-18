import { getSymbolSupport } from '@api/symbol';
import { createWallet } from '@api/wallet';
import { SUCCESS_CODE } from '@common/constants';
import { getUniqueId } from 'react-native-device-info';
import { CreateAddress, EncodeMnemonic, MnemonicToSeed } from 'savourlabs-wallet-sdk/wallet';
import { v4 as uuidv4 } from 'uuid';

export const createImportWallet = async (params: {
    password: any;
    wallet_name: any;
    mnemonic?: string;
}): Promise<Boolean> => {
    try {
        const { password, wallet_name, mnemonic = '' } = params;
        //助记词编码
        const [device_id, mnemonic_code, symbolSupport] = await Promise.all([
            getUniqueId(),
            EncodeMnemonic({ mnemonic, language: 'english' }),
            getSymbolSupport(),
        ]);
        const wallet_uuid = uuidv4();
        if (symbolSupport.code === SUCCESS_CODE) {
            const tokens = (symbolSupport.data || [])
                ?.filter((item) => !['TRON', 'BITCOIN'].includes(item.chainName))
                .reduce((total, supportChian) => {
                    if (supportChian.token.length > 0) {
                        const curTokens = supportChian.token
                            .filter((currentToken) => currentToken.tokenDefault)
                            .map((currentToken) => {
                                const seed = MnemonicToSeed({
                                    mnemonic,
                                    password,
                                });
                                const account = CreateAddress({
                                    chain: supportChian.symbol.toLowerCase(),
                                    seedHex: seed.toString('hex'),
                                    index: 0,
                                    receiveOrChange: 0,
                                    network: 'mainnet',
                                });
                                return {
                                    chain: supportChian.chainName,
                                    symbol: supportChian.symbol,
                                    contract_addr: currentToken.contractAddr,
                                    index: 0,
                                    ...JSON.parse(account),
                                };
                            });

                        return [...total, ...curTokens];
                    }
                    return [...total];
                }, []);
            const res = await createWallet({
                password,
                tokens: tokens.map(({ chain, symbol, contract_addr, index, address }: any) => {
                    return {
                        chain,
                        symbol,
                        contract_addr,
                        index,
                        address,
                    };
                }),
                mnemonic_code,
                wallet_name,
                wallet_uuid,
                device_id,
            });
            return res.code === SUCCESS_CODE;
        }
    } catch (error) {
        console.log('error', error);
        return false;
    }
};
