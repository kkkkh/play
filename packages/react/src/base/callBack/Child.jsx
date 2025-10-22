import { useState,useCallback } from 'react';
export default function Child() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const callback = useCallback(()=>{
    // 这里打印是旧值
    // 但是当a更新时，再次调用callback则是新的b值
    console.log("b in useCallback:", b);
    setB((val)=>{
      // 这里打印的是新值
      console.log("setB 的参数", val)
      return val + 1
    })
  },[a])
    const callback2 = useCallback(()=>{
    // 这里永远打印是旧值
    console.log("b in useCallback:", b);
    setB((val)=>{
      // 这里打印的是新值
      console.log("setB 的参数", val)
      return val + 1
    })
  },[])
  const callback3 = useCallback(()=>{
    // 这里永远打印是新值
    console.log("b in useCallback:", b);
    setB((val)=>{
      // 这里打印的是新值
      console.log("setB 的参数", val)
      return val + 1
    })
  },[b])
  return (
    <div>
      <button onClick={() => setA(a + 1)}>add a</button>
      <button onClick={() => setB(b + 1)}>add b</button>
      <button onClick={callback}>callback</button>
      <button onClick={callback2}>callback2</button>
      <button onClick={callback3}>callback3</button>
    </div>
  );
}
