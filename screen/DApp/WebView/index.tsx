import React, { useState, useMemo, useEffect, useRef } from 'react';
import { SafeAreaView, View } from 'react-native';
import RNWebView from 'react-native-webview';
import { makeStyles } from '@rneui/themed';
import { getMetamaskExt } from '@common/bridge/inject';
import { onBridgeMessage } from './common';

interface DAppWebViewProps {
  route?: any;
}

export const DAppWebView = (props: DAppWebViewProps) => {
  const styles = useStyles();
  let [webviewBridge] = useState<any>(null);

  const propsData = useMemo(() => {
    return props.route?.params.params ?? '';
  }, [props]);
  const [webviewUri, setwebviewUri] = useState(propsData.uri);
  const onMessage = (event: any) => {
    console.log(898989);
    console.warn('----> event.nativeEvent', event.nativeEvent);
    // console.warn('----> propsData ', JSON.stringify(propsData));
    onBridgeMessage(event, webviewBridge, propsData, setwebviewUri);
  };

  useEffect(() => {
    (props as any)?.navigation.setOptions({ title: props.route?.params.params?.title ?? '' });
  }, []);
  const injectJavaScript = () => {
    const tempMask = getMetamaskExt();
    return tempMask;
  };

  const onError = (e: any) => {};
  const onRError = (e: any) => {
    return <View />;
  };
  const onNavigationStateChange = () => {};
  const onShouldStartLoadWithRequest = () => {
    return true;
  };

  const onProgress = () => {};
  useEffect(() => {
    if (webviewUri) {
      console.warn(`webviewUri: ${webviewUri}`);
    }
  }, [webviewUri]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWebView
        style={styles.container}
        containerStyle={styles.container}
        // source={{ uri: propsData.uri }}
        source={{ uri: webviewUri }}
        ref={(e) => (webviewBridge = e)}
        // ref={webviewBridge}
        // onLoadStart={() => {
        //   Platform.OS === 'android' && webviewBridge.injectJavaScript(injectJavaScript ?? '');
        // }}
        shouldStartLoad={true}
        startInLoadingState={true}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        useWebKit={true}
        injectedJavaScriptBeforeContentLoaded={injectJavaScript()}
        onMessage={onMessage}
        // injectedJavaScriptBeforeLoad={injectJavaScript}
        // injectedJavaScript={injectJavaScript}
        onLoadProgress={onProgress}
        onError={onError}
        renderError={onRError}
        onNavigationStateChange={onNavigationStateChange}
        allowsBackForwardNavigationGestures
        allowsLinkPreview
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        originWhitelist={['https://*', 'http://*', '*']}
      />
    </SafeAreaView>
  );
};

const useStyles = makeStyles((theme, _) => {
  return {
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
  };
});
