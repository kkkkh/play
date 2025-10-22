

import {useAlert} from "./Alert";
export default function Child(){
  const {show} = useAlert()
  const test = ()=>{
    show("123","error")
  }
  return <button onClick={test}>alert</button>
}
