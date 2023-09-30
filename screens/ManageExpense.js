import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpense({ route, navigation }) {

    const expensesCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;


    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });

    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expensesCtx.deleteExpense(editedExpenseId);
        navigation.goBack();
    };

    function cancelHandler() {
        navigation.goBack();
    };

    function confirmHandler() {
        if (isEditing) {

            expensesCtx.updateExpense(editedExpenseId, { description: 'asdasd', amount: 12.12, date: new Date('123-12-12') });
        } else {
            expensesCtx.addExpense();
        }
        navigation.goBack();
    };


    return (
        <View style={styles.container} >
            <ExpenseForm />
            <View style={styles.buttonContainer} >
                <Button style={styles.buttonStyle} children={'Cancel'} mode={'flat'} onPressFunc={cancelHandler} />
                <Button style={styles.buttonStyle} children={isEditing ? 'Update' : 'Add'} onPressFunc={confirmHandler} />
            </View>
            {isEditing && <View
                style={styles.deleteContainer} >
                <IconButton
                    icon="trash"
                    color={GlobalStyles.colors.error500}
                    size={24}
                    onPressFunc={deleteExpenseHandler}
                />
            </View>}
        </View>
    );
};


export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
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
});