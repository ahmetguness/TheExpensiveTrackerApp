import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}
