import React, { useState, useEffect } from 'react'
import BottomOverlay from '../BottomOverlay';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';

type ChainDetail = {
    address: string;
    assetCny: string;
    assetUsd: string;
    balance: string;
    chain: string;
    chainName: string;
    contract_addr: string;
    index: number;
    logo: string;
    symbol: string;
    chainId: number;
    chainContractAddr: string;
};

type TokenDetail = {
    address: string;
    assetCny: string;
    assetUsd: string;
    balance: string;
    chain: string;
    chainName: string;
    contract_addr: string;
    index: number;
    logo: string;
    symbol: string;
    chainId: number;
    chainContractAddr: string;
};

type ChainDetailType = {
    chainId: string;
    chainName: string;
    default: boolean;
    gasSymbol: string;
    hot: boolean;
    logo: string;
    token: TokenDetail[];
}

type SwapChainSelectType = {
    chainSelectWindowVisible: boolean;
    toggleDialogChainSelect: () => void;
    chainList: ChainDetailType[];
    chainSelected: (item: any) => void;
}


export default function SwapChainSelect({
    chainSelectWindowVisible,
    toggleDialogChainSelect,
    chainList,
    chainSelected
}: SwapChainSelectType) {
    return (
        <BottomOverlay
            visible={chainSelectWindowVisible}
            title={"选择链"}
            onBackdropPress={toggleDialogChainSelect}
        >
            <View>
                {
                    chainList.map((item, index) => {
                        if (item.chainId == "0" || item.token.length <= 1) return null
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => {
                                    chainSelected(item)
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    {
                                        item.logo && <Avatar rounded source={{ uri: item.logo }} />
                                    }
                                    {/* <Avatar rounded source={{ uri: item.logo }} /> */}
                                    <View style={{ flex: 1, marginRight: 10, marginLeft: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1, alignItems: 'center' }}>
                                            <View>
                                                <Text>{item.chainName}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
        </BottomOverlay>
    )
}
