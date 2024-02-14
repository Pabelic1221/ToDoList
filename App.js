import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Task from './components/task';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask('');
  };

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
    setSelectedTaskIndex(null);
  };

  const handleEditTask = (index) => {
    setSelectedTaskIndex(index);
    setTask(taskItems[index]);
  };

  const handleFinishEdit = () => {
    const itemsCopy = [...taskItems];
    itemsCopy[selectedTaskIndex] = task;
    setTaskItems(itemsCopy);
    setSelectedTaskIndex(null);
    setTask('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>
        <View style={styles.items}>
          {taskItems.map((item, index) => {
            return (
              <View key={index} style={styles.taskContainer}>
                <TouchableOpacity
                  onPress={() => setSelectedTaskIndex(selectedTaskIndex === index ? null : index)}
                  style={[styles.task, selectedTaskIndex === index && styles.selectedTask]}
                >
                  <Task text={item} />
                </TouchableOpacity>
                {selectedTaskIndex === index && (
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={() => handleEditTask(index)}>
                      <Text>Edit</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {selectedTaskIndex === index && (
                  <TouchableOpacity style={styles.completeButton} onPress={() => completeTask(index)}>
                    <Text>Complete</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={(text) => setTask(text)} />
        <TouchableOpacity onPress={selectedTaskIndex !== null ? handleFinishEdit : handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>{selectedTaskIndex !== null ? 'Save' : 'Add'}</Text>
          </View>
        </TouchableOpacity>
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
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  task: {
    flex: 1,
  },
  selectedTask: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginRight: 10, // Added margin to separate "Edit" and "Complete" buttons
  },
  completeButton: {
    padding: 10,
    backgroundColor: 'lightgreen',
    borderRadius: 10,
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
