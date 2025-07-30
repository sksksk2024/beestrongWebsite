// app/admin/page.tsx
'use server';

import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import AdminPanel from './components/AdminPanel';

export default async function Page() {
  const user = await currentUser();

  // List of allowed user IDs
  const allowedUsers = [
    process.env.ADMIN_USER_ID, // Your account
    process.env.CLIENT_USER_ID, // Client's account
  ];

  if (!user || !allowedUsers.includes(user.id)) {
    redirect('/');
  }

  return <AdminPanel />;
}
