import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import kanjiList from '../../data/kanjiList';

import styles from './styles';

class KanjiBlock extends React.Component {
  constructor(props) {
    super(props);

    this.toggleDialogVisible = this.toggleDialogVisible.bind(this);
    // TODO: move to own component
    this.renderONReadings = this.renderONReadings.bind(this);
    this.renderKUNReadings = this.renderKUNReadings.bind(this);
    this.renderMeaning = this.renderMeaning.bind(this);

    this.state = {
      dialogVisible: false,
    }
  }

  toggleDialogVisible() {
    this.setState({ dialogVisible: !this.state.dialogVisible });
  }

  renderONReadings(curKanji) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.headline}>
          ON
        </Text>
        <Text style={styles.text}>
          {curKanji.on1}
        </Text>
        {this.renderMeaning(curKanji.on1Bedeutung)}
        <Text style={styles.text}>
          {curKanji.on2}
        </Text>
        {this.renderMeaning(curKanji.on2Bedeutung)}
      </View>
    );
  }

  renderKUNReadings(curKanji) {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.headline}>
          KUN
        </Text>
        <Text style={styles.text}>
          {curKanji.kun1}
        </Text>
        {this.renderMeaning(curKanji.kun1Bedeutung)}
        <Text style={styles.text}>
          {curKanji.kun2}
        </Text>
        {this.renderMeaning(curKanji.kun2Bedeutung)}
        <Text style={styles.text}>
          {curKanji.kun3}
        </Text>
        {this.renderMeaning(curKanji.kun3Bedeutung)}
      </View>
    );
  }
 
  renderMeaning(meaning) {
    if (meaning && meaning !== ' ') {
      return (
        <View>
          <Text style={[styles.text, styles.comment]}>
            {`(${meaning})`}
          </Text>
        </View>
      );
    }

    return null;
  }

  render() {
    const { kanji, filter } = this.props;
    return (
      <TouchableOpacity style={styles.blockContainer} onPress={this.toggleDialogVisible}>
        <Text style={styles.textSymbol}> {kanji.symbol} </Text>
        { !filter.meaning && <Text style={styles.textMeaning}> {kanji.meaning} </Text> }
        { !filter.reading && <Text style={styles.textOn1}> {kanji.on1} </Text> }
        { !filter.reading && <Text style={styles.textKun1}> {kanji.kun1} </Text> }
        <Dialog
          width={0.8}
          visible={this.state.dialogVisible}
          onTouchOutside={this.toggleDialogVisible}
          onHardwareBackPress={this.toggleDialogVisible}
        >
          <DialogContent>
            <Text style={styles.kanji}>
              {kanji.symbol}
            </Text>
            <Text style={styles.text}>
              {kanjiList[kanji.id - 1].bedeutung}
            </Text>
            <View style={styles.readingContainer}>
              {this.renderKUNReadings(kanjiList[kanji.id - 1])}
              {this.renderONReadings(kanjiList[kanji.id - 1])}
            </View>
          </DialogContent>
        </Dialog>
      </TouchableOpacity>
    );
  }
}

KanjiBlock.propTypes = {
  kanji: PropTypes.object.isRequired,
}

export default KanjiBlock;
