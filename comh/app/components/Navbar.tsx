import Link from "next/link";
import { ModeToggle } from "./ModeToggle";


export default function Navbar() {
  return (
    <nav className="w-full relative flex items-center justify-between md:justify-between max-w-5xl mx-auto px-4 py-5">
      <Link href="/" className="font-bold text-3xl">
        Hélio<span className="text-primary font-black">Blog</span>
      </Link>
      <p className="hidden md:block px-8 text-sm">
        A little description here... Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis inventore beatae nam perspiciatis quasi omnis quisquam deleniti doloremque dicta consectetur tempore.
      </p>
      <div className="ml-auto md:ml-0">
        <ModeToggle />
      </div>
    </nav>
  );
}