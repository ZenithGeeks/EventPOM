import {SignIn} from '@/app/components/sign-in';
import { Suspense } from 'react';
import { SignOut } from '../components/sign-out';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
        <Suspense>
          <SignIn />
          <SignOut />
        </Suspense>
    </main>
  );
}