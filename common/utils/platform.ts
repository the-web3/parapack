import Toast from 'react-native-root-toast';
import * as RNLocalize from 'react-native-localize';
import { getValidLan } from '../../i18n/index'

export const showToast = (
    msg: string,
    props?: {
        onHide: () => void;
    }
) => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHide: () => {
            props?.onHide?.();
        },
    });
};

export const getLanguage = async () => {
    const systemLanguages = RNLocalize.getLocales()?.[0];
    const cacheLan = await getValidLan()
    return cacheLan.replace(/-/g, '_') || `${systemLanguages.languageCode}_${systemLanguages.countryCode}`;
};
