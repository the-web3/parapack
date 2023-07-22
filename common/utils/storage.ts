import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('数据存储成功');
    } catch (error) {
        console.log('数据存储失败', error);
    }
};

export const getData = async (key: string): Promise<string> => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            console.log('获取到的数据为', value);
            return value;
        } else {
            console.log('未找到存储的数据');
            return '{}';
        }
    } catch (error) {
        console.log('数据获取失败', error);
        return '{}';
    }
};

export const removeData = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('数据删除成功');
    } catch (error) {
        console.log('数据删除失败', error);
    }
};
