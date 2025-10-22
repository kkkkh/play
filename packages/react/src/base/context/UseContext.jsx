import React, { useState, useContext,useCallback } from 'react';
const MyContext = React.createContext('没路用的初始值');

function MyComponent() {
  const [state, setState] = useState('state');
  const handleClick = () => {
    setState(val  => val + "1");
  };
  const [show, setShow] = useState(false)
  const showHandle = useCallback(()=>{
    setShow((status) => !status)
  },[])
  return (
    <MyContext.Provider value={{showHandle,state}}>
      <ul>
        <li>{show ? '显示':'隐藏'}</li>
        <li><button onClick={handleClick}>更新state</button></li>
        <MyChildComponent />
      </ul>
    </MyContext.Provider>
  );
}

function MyChildComponent() {
  return (
    <MyGrandchildComponent />
  );
}

function MyGrandchildComponent() {
  const {state,showHandle} = useContext(MyContext);
  // debugger
  return (
    <>
    <li>{state}</li>
    <li ><button onClick={showHandle}>更新show</button></li>
    </>
  );
}

export default MyComponent;
