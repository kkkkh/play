import MyComponent from "./UseContext";
import {AlertProvider} from "./Alert";
import AlertChild from "./AlertChild";
export default function App(){

  return (
    <>
    <h2>useContext</h2>
    <MyComponent></MyComponent>
    <AlertProvider>
      <AlertChild></AlertChild>
    </AlertProvider>
    </>
  )
}
