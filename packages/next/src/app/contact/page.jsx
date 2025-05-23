'use client';
// 运行在客户端（即浏览器端）的
import { useState } from 'react';


export default function ContactForm() {
  const [name, setName] = useState();
  const formAction = async (formData) => {
    const contactName = formData.get('name');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setName(contactName);
  };
  return (
    <>
    <h2>contact</h2>
    <form action={formAction}>
      <input type="text" name="name" placeholder="联系人名称" />
      <button type="submit">提交</button>
      {name && <p>您提交的联系人名称是：{name}</p>}
    </form>
    </>
  );
}


