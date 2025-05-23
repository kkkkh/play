'use server';
import { redirect } from 'next/navigation';
import fs from 'node:fs/promises';

// saveContactAction的服务器 action
export async function saveContactAction(formData) {
  // 'use server';
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const content = await fs.readFile('./data.json', 'utf-8');
  const { contacts } = JSON.parse(content);
  contacts.push({
    id: contacts.length + 1,
    name: formData.get('name'),
  });
  const newContent = JSON.stringify({ contacts }, null, 4);
  await fs.writeFile('./data.json', newContent, 'utf-8');
  redirect('/');
}
