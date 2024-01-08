import Toast from 'react-native-simple-toast';

export const showToast = (
    msg: string,
    props?: {
        onHide: () => void;
    }
) => {
    Toast.showWithGravity(msg, Toast.LONG, Toast.CENTER, {
        backgroundColor: 'rgba(0,0,0,0.5)',
    });
};
