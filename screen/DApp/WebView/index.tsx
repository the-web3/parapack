import React, { useState, useMemo, useEffect } from 'react';
import { Platform, SafeAreaView, View } from 'react-native';
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

  const onMessage = (event: any) => {
    onBridgeMessage(event, webviewBridge);
  };

  useEffect(() => {
    //props.route?.params.params.title
    console.log('props.route?.params.params.title:', props.route?.params.params.title);
    (props as any)?.navigation.setOptions({ title: props.route?.params.params.title ?? 'DApp' });
  }, []);

  const injectJavaScript = useMemo(() => {
    return getMetamaskExt();
  }, []);

  const onError = (e: any) => {};
  const onRError = (e: any) => {
    return <View />;
  };
  const onNavigationStateChange = () => {};
  const onShouldStartLoadWithRequest = () => {
    return true;
  };

  const onProgress = () => {};

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWebView
        style={styles.container}
        containerStyle={styles.container}
        source={{ uri: propsData.uri }}
        ref={(e) => (webviewBridge = e)}
        onLoadStart={() => {
          Platform.OS === 'android' && webviewBridge.injectJavaScript(injectJavaScript ?? '');
        }}
        shouldStartLoad={true}
        startInLoadingState={true}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        domStorageEnabled={true}
        decelerationRate="normal"
        useWebKit={true}
        injectedJavaScriptBeforeContentLoaded={Platform.OS === 'ios' ? injectJavaScript : ''}
        onMessage={onMessage}
        injectedJavaScriptBeforeLoad={injectJavaScript}
        injectedJavaScript={injectJavaScript}
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
