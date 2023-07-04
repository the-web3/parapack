import React, { useState, useMemo } from "react";
import { SafeAreaView, View } from 'react-native'
import RNWebView from 'react-native-webview'
import { makeStyles } from "@rneui/themed";

interface DAppWebViewProps {
  route?: any
}

export const DAppWebView = (props: DAppWebViewProps) => {

  const styles = useStyles();
  const [webviewBridge] = useState<any>(null);

  const sourceURI = useMemo(() => {
    return props.route?.params.params ?? ''
  }, [props])

  const onBridgeMessage = (e: any) => {
    return true
  }

  const injectJavaScript = useMemo(() => {
    return ''
  }, [])

  const onError = () => {

  }
  const onRError = (e: any) => {
    return <View/>
  }
  const onNavigationStateChange = () => {

  }
  const onShouldStartLoadWithRequest = () => {
    return true
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <RNWebView
        style={styles.container}
        containerStyle={styles.container}
        source={sourceURI}
        ref={(e) => {
          // webviewBridge = e
        }}
        onLoadStart={() => {
          //todo just android
          // webviewBridge.injectJavaScript(injectJavaScript ?? '');
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
        injectedJavaScriptBeforeContentLoaded={''}
        onMessage={onBridgeMessage}
        injectedJavaScriptBeforeLoad={injectJavaScript}
        // injectedJavaScript={injectJavaScript}
        // onLoadProgress={this.onProgress}
        onError={onError}
        renderError={onRError}
        onNavigationStateChange={onNavigationStateChange}
        allowsBackForwardNavigationGestures
        allowsLinkPreview
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        originWhitelist={['https://*', 'http://*', '*']}
      />
    </SafeAreaView>
  )
}

const useStyles = makeStyles((theme, _) => {
  return {
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    }
  };
});