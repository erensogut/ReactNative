// DisplayModal.js

import React from 'react'
import { TextInput,Button, TouchableHighlight, Modal, View, Image, Text, StyleSheet } from 'react-native';
import { Form, Textarea } from 'native-base';

const DisplayModal = (props) => {
    function bar(param) { 
        global.SessionVar = param;
        props.closeDisplay();
     }
    const [value, onChangeText] = React.useState(global.SessionVar);
    return(
    <Modal visible={props.display} >
        <View >
            <View style={styles.containerChild} >
                <Form style={styles.form}>
                    <Textarea rowSpan={5} bordered value={value} onChangeText={text => onChangeText(text)}/>
                    <Button
                        title="Save"
                        onPress={() => bar(value)}
                    />
                    <Button
                        title="Cancel"
                        onPress={() => props.closeDisplay()}
                    />
                </Form>
            </View>
        </View>
    </Modal>
    );
}

const styles = StyleSheet.create({

    container:
    {
       
    },
    containerChild: {
       
    },
    form:
    {
        margin:40,
        marginTop:80,
    },
    text: {
        backgroundColor: 'gray',
        fontSize: 20,
        marginLeft: 150
    }
})

export default DisplayModal;