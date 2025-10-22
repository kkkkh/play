import { useEffect, useState } from 'react';
export default function Child2 () {
  {/*
    测试
      与 useCallback 对比下，即使useEffect第二个参数没有传入，打印的值都是新值
  */}
  const [state, setState] = useState(0);
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);
  useEffect(()=>{
    // 这里打印是新值
    console.log(state1)
    setState1(() => {
      // 这里打印是新值
      console.log(state1)
      return state1 + 1
    })
    setState2((value) => {
      // 这里打印是新值
      console.log(value)
      return value + 1
    })
  },[state])
  return <>
    <div>2 useCallback 即使useEffect第二个参数没有传入，打印的值都是新值</div>
    state：<button onClick={() => setState(state + 1)}>{state}</button>
    state1：<button onClick={() => setState1(state1 + 1)}>{state1}</button>
    state2：<button onClick={() => setState2(state2 + 1)}>{state2}</button>
  </>
}
