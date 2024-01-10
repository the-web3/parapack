import React from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
// replace with your button component

const { width, height } = Dimensions.get('window');
import { useThemeMode } from '@rneui/themed';

const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: '#f2f3f6',
    color: 'black',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flex: 1,
    marginBottom: height * 0.1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  text: {
    color: 'black',
    fontSize: width * 0.04,
  },
});

const darkTheme = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    color: 'white',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#222',
    padding: 16,
  },
  text: {
    color: 'white',
    fontSize: width * 0.04,
  },
});

const DeveloperOnboarding = () => {
  const { mode } = useThemeMode();
  const theme = mode === 'dark' ? darkTheme : lightTheme;
  const { t } = useTranslation();

  return (
    <ScrollView style={theme.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={theme.container}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={theme.text}>{t('developerOnboarding.title')}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.first')}</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.first1')}</Text>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.first2')}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.second')}</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.second1')}</Text>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.second2')}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.third')} </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.third1')}</Text>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.third2')}</Text>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.third3')}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.fourth')} </Text>
        </View>
        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.fourth1')}</Text>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.fourth2')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.fifth')} </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.fifth1')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.sixth')}</Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.sixth1')}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.seventh')} </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.seventh1')}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.eighth')} </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.eighth1')} </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: height * 0.02 }}>
          <Text style={{ flex: 1 }}>{t('developerOnboarding.ninth')} </Text>
        </View>

        <View style={{ flex: 7, marginBottom: height * 0.02 }}>
          <Text style={{ fontSize: width * 0.035 }}>{t('developerOnboarding.ninth1')}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default DeveloperOnboarding;
