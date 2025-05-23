'use client';
import { startTransition, useState } from 'react';
import { getDataByPage } from './actions.jsx';

export default function PaginationChild ({initData,initTotal}) {
  const [data, setData] = useState(initData);
  const [total, setTotal] = useState(initTotal);
  const getPage = (page) => {
    startTransition(async() => {
      const {data,total} = await getDataByPage(page)
      setData(data);
      setTotal(total);
    });
  }
  return <div>
    <ul> data:{data.map((item) => <li key={item}>{item}</li>)}</ul>
    <span>total: {total}</span>
    <div>
      <button onClick={() => getPage(1)}>第1页</button>
      <button onClick={() => getPage(2)}>第2页</button>
    </div>
  </div>;
}


