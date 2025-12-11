import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full relative z-50">
      <div className="mx-auto flex max-w-full items-center px-10 pt-9 ">
        <Link 
          href="/about" 
          className="text-2xl font-regular text-white hover:text-slate-300 transition-colors cursor-pointer relative z-50"
        >
          JEREMIAH33:3
        </Link>
        {/* Future: Dashboard, account icons will go here */}
      </div>
    </header>
  )
}
