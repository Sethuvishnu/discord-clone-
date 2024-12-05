import { SignIn } from '@clerk/nextjs'

export default function Page() {
  console.log("Sign-in page is rendering");
  console.log("Sign-in page is rendering");
  return (
    <>
      <SignIn />
      <div className="text-white mt-4">ggggg</div>
    </>
  );
}
