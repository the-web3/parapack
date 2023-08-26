import Toast from 'react-native-root-toast';
import * as RNLocalize from 'react-native-localize';

export const showToast = (
    msg: string,
    props?: {
        onHide: () => void;
    }
) => {
    Toast.show(msg, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onHide: () => {
            props?.onHide?.();
        },
    });
};

export const getLanguage = () => {
    const systemLanguages = RNLocalize.getLocales()?.[0];
    return `${systemLanguages.languageCode}_${systemLanguages.countryCode}`;
};
