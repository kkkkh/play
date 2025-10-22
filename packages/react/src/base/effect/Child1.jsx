import { useEffect, useState } from 'react';
export default function Child1 () {
  {/*
    测试 1.1
      useEffect 第二个参数依赖
    测试 1.2
      返回清除函数，以及打印顺序
  */}
  const [state, setState] = useState(0);
  console.log('render')
  useEffect(() => {
    console.log('useEffect');
  });

  useEffect(() => {
    console.log('useEffect1', state);
  }, [state]);

  useEffect(() => {
    console.log('useEffect2', state);
    return () => {
      console.log('useEffect2 return');
    };
  }, [state]);

  return <>
    <div>1.1 useEffect 第二个参数依赖</div>
    <div>1.2 返回清除函数，以及打印顺序</div>
    <button onClick={() => setState(state + 1)}>setState</button>
  </>;
}
