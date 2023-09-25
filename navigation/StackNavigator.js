import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ManageExpense from '../screens/ManageExpense';
import BottomTabsNavigator from './BottomTabsNavigator';

const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='BottomTabsNavigator'
                component={BottomTabsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='ManageExpense'
                component={ManageExpense}
            />
        </Stack.Navigator>
    );
};


export default StackNavigator;