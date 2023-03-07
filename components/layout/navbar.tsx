import { MenuIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';

import { LoadingDots } from '@/components/icons';

export default function Navbar({
  setSidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);

  return (
    <nav
      className="absolute right-0 flex h-16 w-full items-center justify-between px-4 md:justify-end"
      aria-label="Navbar"
    >
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-0 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuIcon className="h-6 w-6" aria-hidden="true" />
      </button>
      {status !== 'loading' &&
        (session?.user ? (
          <Link
            href={`/${session.username}`}
            className="h-8 w-8 overflow-hidden rounded-full"
          >
            <Image
              src={
                session.user.image ||
                `https://avatar.tobi.sh/${session.user.name}`
              }
              alt={session.user.name || 'User'}
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2PYsGHDfwAHNAMQumvbogAAAABJRU5ErkJggg=="
            />
          </Link>
        ) : (
          <button
            disabled={loading}
            onClick={() => {
              setLoading(true);
              signIn('github', { callbackUrl: `/profile` });
            }}
            className={`${
              loading
                ? 'border-gray-300 bg-gray-200'
                : 'border-black bg-black hover:bg-white'
            } h-8 w-36 rounded-md border py-1 text-sm text-white transition-all hover:text-black`}
          >
            {loading ? <LoadingDots color="gray" /> : 'Log in with GitHub'}
          </button>
        ))}
    </nav>
  );
}
