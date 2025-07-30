// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs';
export default function page() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        path="/sign-in"
        appearance={{
          elements: {
            socialButtonsBlock: 'hidden',
            footerActionText: 'Sign up disabled', // Changes text
            footerActionLink: 'pointer-events-none opacity-50', // Disables click
          },
        }}
      />
    </div>
  );
}
