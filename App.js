import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Task from './components/task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleAddTask = () => {
    Keyboard.dismiss();
    if (task.trim() !== '') {
      if (selectedTaskIndex !== null) {
        const updatedTasks = [...taskItems];
        updatedTasks[selectedTaskIndex] = task;
        setTaskItems(updatedTasks);
        setSelectedTaskIndex(null);
      } else {
        setTaskItems([...taskItems, task]);
      }
      setTask('');
    }
  };

  const handleCompleteTask = (taskText) => {
    const updatedTasks = taskItems.filter(item => item !== taskText);
    setTaskItems(updatedTasks);
  };

  const handleEditTask = (oldTask, newTask) => {
    const updatedTasks = taskItems.map(item => (item === oldTask ? newTask : item));
    setTaskItems(updatedTasks);
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>
        <ScrollView style={styles.scrollContainer}>
          {taskItems.map((item, index) => (
            <Task key={index} text={item} onEdit={handleEditTask} onComplete={handleCompleteTask} />
          ))}
        </ScrollView>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <View style={styles.addWrapper}>
          <Text style={styles.addText} onPress={handleAddTask}>{selectedTaskIndex !== null ? 'Save' : 'Add'}</Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8eaed',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#c0c0c0',
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#c0c0c0',
    borderWidth: 1,
  },
  addText: {},
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
