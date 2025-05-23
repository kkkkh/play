'use client';
// 除了在客户端组件 import 导入服务器 action，
// 也可以由服务器组件通过 props 将服务器 action 的引用传递给客户端组件。
import { saveContactAction } from './actions.jsx';
import { useActionState } from 'react';

export default function ContactForm() {
  const [_state, formAction, pending] = useActionState(
    async (_currentState, formData) => {
      await saveContactAction(formData)
    }, {});
  return (
    <>
    <h2>contactAction</h2>
    {/* saveContactAction会在服务器端被执行 */}
    {/* 其实这个过程还是存在浏览器端对服务器端 API 的调用的，只不过 Next.js 框架为你代劳了。 */}
    <form action={formAction}>
      <input type="text" name="name" placeholder="联系人名称" />
      <button type="submit">提交</button>
      {pending && <p>提交中...</p>}
    </form>
    </>
  );
}


