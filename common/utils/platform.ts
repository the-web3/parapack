import Toast from 'react-native-root-toast';

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
