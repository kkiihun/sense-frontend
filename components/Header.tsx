// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* 로고 / 브랜드명 */}
        <Link href="/" className="text-2xl font-bold text-gray-900">
          SENSE
        </Link>

        {/* 내비게이션 메뉴 */}
        <nav>
          <ul className="flex space-x-6 text-gray-700">
            <li>
              <Link href="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link href="/data-market" className="hover:text-gray-900">
                Data Market
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-900">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-gray-900">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="hover:text-gray-900">
                Register
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
