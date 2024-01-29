import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import Icon from 'react-native-vector-icons/AntDesign';
import Layout from '@components/Layout';
import SwapCom from '@components/SwapCom';
import { getWallet } from '@common/wallet';
import {
    BLOCK_CHAIN_ID_MAP,
} from '@common/utils/sqlite';
type Props = {
    fullWidth?: boolean;
    navigation: any;
};


const Swap = () => {
    const [walletAddress, setWalletAddress] = useState<string>('');
    async function initSwapData() {
        const sqliteData = (await getWallet(BLOCK_CHAIN_ID_MAP.Ethereum)) ?? {};
        const address = sqliteData?.account?.address;
        setWalletAddress(address);
    }
    useEffect(() => {
        initSwapData();
    }, [])

    return (
        <Layout>
            <SwapCom
                initChain={'Ethereum'}
                initChainId={BLOCK_CHAIN_ID_MAP.Ethereum}
            />
        </Layout>
    );
};

const useStyles = makeStyles((theme, props: Props) => {
    return {};
});

export default Swap;
