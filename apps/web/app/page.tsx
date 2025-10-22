import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Link href="/signin">Sign in</Link>
      <Link href="/signup">Sign up</Link>
    </div> 
  ); 
} 
