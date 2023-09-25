import AllExpenses from '../screens/AllExpenses';
import RecentExpenses from '../screens/RecentExpenses';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { GlobalStyles } from '../constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from '../components/UI/IconButton';


const BottomTabs = createBottomTabNavigator();

function BottomTabsNavigator() {
    return <BottomTabs.Navigator screenOptions={({ navigation }) => (
        {
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            headerRight: ({ tintColor }) => <IconButton icon={'add'} color={tintColor} size={24} onPressFunc={() => {
                navigation.navigate('ManageExpense');
            }} />
        }
    )} >
        <BottomTabs.Screen
            name='RecentExpenses'
            component={RecentExpenses}
            options={{
                title: 'Recent Expenses',
                tabBarLabel: 'Recent Expenses',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name='hourglass'
                        size={size}
                        color={color} />
                )
            }} />
        <BottomTabs.Screen
            name='AllExpenses'
            component={AllExpenses}
            options={{
                title: 'All Expenses',
                tabBarLabel: 'All Expenses',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons
                        name='calendar'
                        size={size}
                        color={color} />
                )
            }} />
    </BottomTabs.Navigator>
};

export default BottomTabsNavigator;