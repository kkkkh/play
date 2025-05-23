import Link from 'next/link';
import fs from 'node:fs/promises';

export default async function Home() {
  const content = await fs.readFile('./data.json', 'utf-8');
  const { contacts } = JSON.parse(content);
  return (
    <div>
      <ul>
        {contacts.map((contact: { id: number; name: string }) => (
          <li key={contact.id}>{contact.name}</li>
        ))}
      </ul>
      <Link href="/contact">联系人管理</Link>
      <br />
      <Link href="/contactAction">联系人管理Action</Link>
      <br />
      <Link href="/pagination">pagination</Link>
    </div>
  );
}
