import React from 'react';
import {View, StyleSheet, Button, Text, TouchableOpacity} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Body: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <View style={styles.body}>{children}</View>;
};

const Container: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <View style={styles.container}>{children}</View>;
};

const Title: React.FC<{children: React.ReactNode; iconButton?: String; textButton?: String; clickEvent?: () => void}> = ({children, iconButton, textButton, clickEvent}) => {
  return (
    <View style={styles.title}>
      <Text style={styles.titleTitle}>{children}</Text>
      <View style={styles.titleLeft}></View>
      <View style={styles.titleRight}>
        {iconButton && (
          <TouchableOpacity style={styles.iconButton} onPress={clickEvent}>
            <MaterialIcons name={String(iconButton)} size={24} style={styles.iconButtonIcon} />
          </TouchableOpacity>
        )}
        {textButton && (
          <TouchableOpacity style={styles.textButton} onPress={clickEvent}>
            <Text style={styles.textButtonText}>{textButton}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const List: React.FC<{children: React.ReactNode}> = ({children}) => {
  return <View style={styles.list}>{children}</View>;
};

const Item: React.FC<{children: String; subtitle?: String; iconButton?: String; textButton?: String; clickEvent?: () => void}> = ({children, subtitle, iconButton, textButton, clickEvent}) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Text style={styles.itemtitle}>{children}</Text>
        <Text style={styles.itemSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.itemRight}>
        {iconButton && (
          <TouchableOpacity style={styles.iconButton} onPress={clickEvent}>
            <MaterialIcons name={String(iconButton)} size={24} style={styles.iconButtonIcon} />
          </TouchableOpacity>
        )}
        {textButton && (
          <TouchableOpacity style={styles.textButton} onPress={clickEvent}>
            <Text style={styles.textButtonText}>{textButton}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    gap: 36,
    paddingVertical: 12,
    backgroundColor: '#101811',
  },
  container: {
    gap: 10,
    backgroundColor: '#101811',
  },
  iconButton: {
    alignItems: 'center',
  },
  iconButtonIcon: {
    color: '#ffffff',
  },
  textButton: {
    backgroundColor: '#254731',
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  textButtonText: {
    color: '#ffffff',
    lineHeight: 24,
    fontWeight: 'bold',
  },
  title: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 6,
  },
  titleLeft: {
    flex: 1,
  },
  titleTitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  titleRight: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  list: {
    gap: 6,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 2,
  },
  itemLeft: {
    flex: 1,
  },
  itemRight: {
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  itemtitle: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  itemSubtitle: {
    color: '#98B0A1',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
});

export {Body, Container, Title, List, Item};
