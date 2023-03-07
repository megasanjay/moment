import Link from 'next/link';
import { useState } from 'react';
import useSWR from 'swr';

import { ResultProps, UserProps } from '@/lib/api/user';
import fetcher from '@/lib/fetcher';
import { useDebounce } from '@/lib/hooks/use-debounce';

import { DirectoryIcon, SearchIcon } from '@/components/icons';

import DirectoryResults from './directory-results';

export default function Directory({
  results,
  totalUsers,
}: {
  results: ResultProps[];
  totalUsers: number;
}) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const { data: searchedUsers } = useSWR<UserProps[] | null>(
    debouncedQuery.length > 0 && `api/user?query=${debouncedQuery}`,
    fetcher,
    {
      keepPreviousData: true,
    },
  );

  return (
    <aside className="h-full w-full flex-shrink-0 overflow-scroll border-r border-gray-800 bg-black sm:w-96">
      <div className="sticky top-0 z-20 bg-black px-6 pt-6 pb-0">
        <Link href="/">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-dark-accent-1 transition-all hover:bg-dark-accent-2">
            <DirectoryIcon className="text-white" />
          </div>
        </Link>
        <p className="mt-8 text-2xl font-bold text-white">Directory</p>
        <p className="mt-2 text-sm text-dark-accent-5">
          Search directory of {Intl.NumberFormat('en-us').format(totalUsers)}{' '}
          developers
        </p>
        <form className="flex space-x-4 py-8" action="#">
          <div className="min-w-0 flex-1">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative rounded-none border-0 border-b-[1px] border-b-dark-accent-2 shadow-sm ">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center bg-black pl-3">
                <SearchIcon className="h-4 w-4 text-dark-accent-3" />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full rounded-md border-none bg-black pl-10 text-white placeholder:text-dark-accent-3 focus:border-transparent focus:ring-transparent sm:text-sm"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {/* Directory list */}
      <nav
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
        aria-label="Directory"
      >
        {debouncedQuery.length === 0 ? (
          results.map(({ _id: letter, users }) => (
            <div key={letter} className="relative">
              <div className="bg-dark-accent-1 px-6 py-1 text-sm font-bold uppercase text-white">
                <h3>{letter}</h3>
              </div>
              <DirectoryResults users={users} />
            </div>
          ))
        ) : searchedUsers && searchedUsers.length > 0 ? (
          <DirectoryResults users={searchedUsers} />
        ) : (
          <div className="px-6 py-6">
            <p className="text-center text-gray-500">No results found</p>
          </div>
        )}
      </nav>
    </aside>
  );
}
