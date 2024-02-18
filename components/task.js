import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

const Task = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.text);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        props.onEdit(props.text, editedText);
    };

    const handleComplete = () => {
        props.onComplete(props.text);
    };

    return (
        <View style={styles.item}>
            {isEditing ? (
                <View style={styles.editContainer}>
                    <TextInput
                        style={styles.editInput}
                        value={editedText}
                        onChangeText={setEditedText}
                        autoFocus
                        onBlur={handleSave}
                        onSubmitEditing={handleSave}
                    />
                </View>
            ) : (
                <View style={styles.taskContainer}>
                    <TouchableOpacity onPress={handleEdit} style={styles.taskTextContainer}>
                        <Text style={styles.itemText}>{props.text}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleComplete} style={[styles.button, styles.completeButton]}>
                            <Text style={styles.buttonText}>Complete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleEdit} style={[styles.button, styles.editButton]}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    taskTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    itemText: {
        maxWidth: '80%',
    },
    editContainer: {
        marginBottom: 10,
    },
    editInput: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
    button: {
        padding: 10,
        borderRadius: 10,
        marginLeft: 5,
    },
    completeButton: {
        backgroundColor: 'red',
    },
    editButton: {
        backgroundColor: 'green',
    },
    buttonText: {
        color: 'white',
    },
});

export default Task;
