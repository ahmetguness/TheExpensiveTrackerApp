import { View, StyleSheet, Text } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { GlobalStyles } from "../../constants/styles";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {

    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputs((currentInputs) => {
            return {
                ...currentInputs,
                [inputIdentifier]: { value: enteredValue, isValid: true }
            };
        });
    };

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amonutIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsVallid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amonutIsValid || !dateIsVallid || !descriptionIsValid) {
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amonutIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsVallid },
                    description: { value: currentInputs.description.value, isValid: descriptionIsValid },
                };
            });
            return;
        }

        onSubmit(expenseData);
    };

    const formIsInValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form} >
            <Text style={styles.title} >Your Expense</Text>
            <View style={styles.inputsRow} >
                <Input label="Amount" invalid={!inputs.amount.isValid} style={styles.rowInput} textInputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value,
                }}
                />
                <Input label="Date" style={styles.rowInput} invalid={!inputs.date.isValid} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value,
                }} />
            </View>
            <Input label="Description" invalid={!inputs.description.isValid} textInputConfig={{
                multiLine: true,
                autoCorrect: false,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value,
            }} />
            {formIsInValid && <Text style={styles.errorText} >Invalid input values!! Please check your data!!</Text>}
            <View style={styles.buttonContainer} >
                <Button style={styles.buttonStyle} children={'Cancel'} mode={'flat'} onPressFunc={onCancel} />
                <Button style={styles.buttonStyle} children={submitButtonLabel} onPressFunc={submitHandler} />
            </View>
        </View>
    );
}


export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 6,
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonStyle: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    }
});