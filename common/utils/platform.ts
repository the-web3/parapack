// import { ToastAndroid } from 'react-native';
// import Toast from 'react-native-root-toast';
import Toast from 'react-native-simple-toast';

export const showToast = (
    msg: string,
    props?: {
        onHide: () => void;
    }
) => {
    // Toast.show(msg, {
    //     duration: Toast.durations.LONG,
    //     position: Toast.positions.CENTER,
    //     shadow: true,
    //     animation: true,
    //     hideOnPress: true,
    //     delay: 0,
    //     onHide: () => {
    //         props?.onHide?.();
    //     },
    // });
    Toast.showWithGravity(msg, Toast.LONG, Toast.CENTER, {
        backgroundColor: 'rgba(0,0,0,0.5)',
    });
    setTimeout(() => {
        props?.onHide?.();
    }, Toast.LONG);
    // ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT, ToastAndroid.CENTER);
};
