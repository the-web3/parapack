import * as React from 'react';
import Layout from '@components/Layout';
import { Button, Image, Text } from '@rneui/themed';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
// import * as base from '@common/wallet';
import { useEffect } from 'react';
const StartBackup = ({ navigation }) => {
    const getMnemonic = async () => {
        // const wordsInfo = await base.CreateMnemonic({
        //     number: 12,
        //     language: 'english',
        // });
        // console.log(999999, wordsInfo);
        // try {
        //     // 生成随机字节
        //     const randomBytes = await RandomBytes.randomBytes(16);
        //     // 生成助记词
        //     const mnemonic = await bip39.generateMnemonic(128, randomBytes);
        //     console.log('生成的助记词:', mnemonic);
        //     // 在这里可以将助记词保存到状态或进行其他操作
        // } catch (error) {
        //     console.error('生成助记词时出错:', error);
        // }
    };
    useEffect(() => {
        getMnemonic();
    }, []);
    const handleStartBackup = () => {
        navigation.navigate('backupMnemonics');
    };
    return (
        <Layout
            fixedChildren={
                <View style={styles.button}>
                    <Button onPress={handleStartBackup}>开始备份</Button>
                </View>
            }
        >
            <View style={styles.item}>
                <Image
                    // source={BASE_URI}
                    source={require('../../../assets/images/empty.png')}
                    style={styles.img}
                    // containerStyle={styles.item}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
            <Text style={styles.text}>如果您的手机丢失或损坏</Text>
            <Text style={styles.text}>纸密码是你找回钱包的唯一途径</Text>
            <Text style={styles.text2}>（安全起见，请不要截图形式）</Text>
        </Layout>
    );
};
const styles = StyleSheet.create({
    item: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 138,
        height: 180,
        aspectRatio: 1,
        marginTop: 106,
        marginBottom: 112,
    },
    text: {
        textAlign: 'center',
        color: '#6D7278',
    },
    text2: {
        textAlign: 'center',
        color: '#6D7278',
        marginTop: 30,
    },
    button: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 25,
    },
});

export default StartBackup;
