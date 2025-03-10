import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {

  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoals, setCourseGoals] = useState([]);

  const goalInputHandler = (enteredText) => {
    setEnteredGoalText(enteredText);
  };

  const addGoalHandler = () => {
    if (enteredGoalText.trim() === '') return;
    setCourseGoals((currentCourseGoals) => [...currentCourseGoals, enteredGoalText]);
    setEnteredGoalText('');
  };

  const deleteGoal = (index) => {
    const updatedGoals = [...courseGoals];
    updatedGoals.splice(index, 1);
    setCourseGoals(updatedGoals);
  };

  const getRainbowColor = (index) => {
    const colors = ['#6495ed', '#7764ed', '#bc64ed', '#ed64da','#D76C82','#B03052'];
    return { backgroundColor: colors[index % colors.length] };
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      <View>
        <TextInput
          placeholder="My Goal"
          onChangeText={goalInputHandler}
          value={enteredGoalText}
        />
        <Button title="My Goal" onPress={addGoalHandler} />
      </View>
      <FlatList
        data={courseGoals}
        renderItem={({ item, index }) => (
          <View style={[styles.goalContainer, getRainbowColor(index)]}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => deleteGoal(index)}>
              <Ionicons name="trash-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  goalContainer: {
    paddingTop: 20,
    padding: 10,
    marginVertical: 5,
    borderColor: '#ccc',
    borderWidth: 2,
  },
});
