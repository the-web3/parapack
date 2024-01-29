import React, { useState, useEffect } from 'react'
import BottomOverlay from '../BottomOverlay';
import { Avatar, Button, Text, makeStyles, Slider, useTheme, Icon } from '@rneui/themed';
import { SafeAreaView, TextInput, View, TouchableWithoutFeedback } from 'react-native';

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
            title={"交易设置"}
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
                                <Icon
                                    name="heartbeat"
                                    type="font-awesome"
                                    size={20}
                                    reverse
                                    containerStyle={{ bottom: 20, right: 20 }}
                                    color={color()}
                                />
                            ),
                        }}
                    />
                    <Text style={{ paddingTop: 20 }}>最大滑点: {value}%</Text>
                </View>
                <Text>如果汇率在您下单和确认之问发生变化，这被称为“滑点”。如果滑点超过您的 “最大滑点”设置，您的兑换将自动取消。</Text>
            </View>
        </BottomOverlay>
    )
}

const useStyles = makeStyles({
    contentView: {
        padding: 20,
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