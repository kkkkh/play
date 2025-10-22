import Ref from "./base/ref/Index"
import ForwardRef from "./base/forwardRef/Index"
import UseContext from "./base/context/Index"
import Meno from "./base/meno/Index"
import CallBack from "./base/callBack/Index"
import Props from "./base/props/Index"

// import Action from "./react19/action/Index"
// import Use from "./react19/use/Index"
// import Ref19 from "./react19/ref/Index"

import Effect from "./base/effect/Index"
function App() {
  return (
    <>
      <div>
        {/* 基础 Hooks */}
        <Ref></Ref>
        <ForwardRef></ForwardRef>
        <UseContext></UseContext>
        <Meno></Meno>
        <Props></Props>
        <Effect></Effect>
        <CallBack></CallBack>
        {/* React19 Hooks */}
        {/* <Action></Action> */}
        {/* <Use></Use> */}
        {/* <Ref19></Ref19> */}

      </div>
    </>
  )
}

export default App
