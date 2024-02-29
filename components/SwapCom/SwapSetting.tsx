import React, { useState, useEffect } from 'react'
import BottomOverlay from '../BottomOverlay';
import { Avatar, Button, Text, makeStyles, Slider, useTheme, Icon } from '@rneui/themed';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';
import { useTranslation } from 'react-i18next';

type SwapSettingFormType = {
    slippage: number;
}

type SwapSettingType = {
    swapSettingWindowVisible: boolean;
    toggleDialogSwapSetting: () => void;
    swapSettingForm: SwapSettingFormType;
    changeSwapSettingForm: (form: SwapSettingFormType) => void;
}


export default function SwapSetting({
    swapSettingWindowVisible,
    toggleDialogSwapSetting,
    swapSettingForm,
    changeSwapSettingForm
}: SwapSettingType) {
    const { t } = useTranslation();
    const [value, setValue] = useState(swapSettingForm.slippage);
    const theme = useTheme();
    const styles = useStyles(theme);

    const interpolate = (start: number, end: number) => {
        let k = (value - 1) / 5; // 0 =>min  && 5 => MAX
        return Math.ceil((1 - k) * start + k * end) % 256;
    };

    const color = () => {
        let r = interpolate(0, 255);
        let g = interpolate(255, 0);
        let b = interpolate(0, 0);
        return `rgb(${r},${g},${b})`;
    };

    useEffect(() => {
        changeSwapSettingForm({
            ...swapSettingForm,
            slippage: value
        })
    }, [value])

    return (
        <BottomOverlay
            visible={swapSettingWindowVisible}
            title={t("swap.transSett")}
            onBackdropPress={toggleDialogSwapSetting}
        >
            <View>
                <View style={[styles.contentView]}>
                    <Slider
                        value={value}
                        onValueChange={setValue}
                        maximumValue={5}
                        minimumValue={1}
                        step={1}
                        allowTouchTrack
                        trackStyle={{ height: 5, backgroundColor: 'transparent' }}
                        thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
                        thumbProps={{
                            children: (
                                <View style={{ width: 32, height: 32, borderRadius: 32, backgroundColor: 'white', borderWidth: 6, borderColor: '#3B28CC', bottom: 4 }}>
                                </View>
                            ),
                        }}
                    />
                    <Text style={{ paddingTop: 10, fontSize: 14 }}>{t("swap.maxSlippage")}: {value}%</Text>
                </View>
                <Text style={{ fontSize: 12, marginTop: 16, marginBottom: 30 }}>{t("swap.slippageDesc")}</Text>
            </View>
        </BottomOverlay>
    )
}

const useStyles = makeStyles({
    contentView: {
        marginTop: 32,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    verticalContent: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        height: 500,
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    subHeader: {
        backgroundColor: "#2089dc",
        color: "white",
        textAlign: "center",
        paddingVertical: 5,
        marginBottom: 10
    }
});