// app/adminpanel/page.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
  // promisses if you want to know what it is look at starckoverflow
export default async function AdminPanelPage() {
  // session
  const session = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  return (
      <div>
        <h1>dalo sie zalogować powinno działać, {session.user.email}!</h1>
        <p>Adam teraz ty ugotuj coś ciekawego z tego .</p>
      </div>
  )
}