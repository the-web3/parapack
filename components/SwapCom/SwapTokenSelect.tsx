import React, { useState, useEffect } from 'react'
import BottomOverlay from '../BottomOverlay';
import { Avatar, Button, Text, makeStyles } from '@rneui/themed';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';

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

type SwapTokenSelectType = {
    tokenSelectWindowVisible: boolean;
    toggleDialogTokenSelect: () => void;
    tokenList: TokenDetail[];
    tokenSelected: (item: any) => void;
}


export default function SwapTokenSelect({
    tokenSelectWindowVisible,
    toggleDialogTokenSelect,
    tokenList,
    tokenSelected
}: SwapTokenSelectType) {

    return (
        <BottomOverlay
            visible={tokenSelectWindowVisible}
            title={"选择币种"}
            onBackdropPress={toggleDialogTokenSelect}
        >
            <View>
                {
                    tokenList.map((item, index) => {
                        return (
                            <TouchableWithoutFeedback
                                key={index}
                                onPress={() => {
                                    tokenSelected(item)
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
                                                <Text>{item.symbol}</Text>
                                                <Text
                                                    style={{
                                                        color: '#999999',
                                                        fontWeight: '500',
                                                        fontSize: 11,
                                                        lineHeight: 16,
                                                    }}
                                                >
                                                    {item.chain}
                                                </Text>
                                            </View>
                                            <Text>{item.balance}</Text>
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
