import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';

import { ResultProps } from '@/lib/api/user';

import { LoadingDots } from '@/components/icons';
import ClusterProvisioning from '@/components/layout/cluster-provisioning';
import Meta, { MetaProps } from '@/components/layout/meta';
import Toast from '@/components/layout/toast';

import Directory from './directory';
import Navbar from './navbar';
import Sidebar from './sidebar';

export default function Layout({
  meta,
  results,
  totalUsers,
  username,
  clusterStillProvisioning,
  children,
}: {
  meta: MetaProps;
  results: ResultProps[];
  totalUsers: number;
  username?: string;
  clusterStillProvisioning?: boolean;
  children: ReactNode;
}) {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (router.isFallback) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <LoadingDots color="white" />
      </div>
    );
  }

  // You should remove this once your MongoDB Cluster is fully provisioned
  if (clusterStillProvisioning) {
    return <ClusterProvisioning />;
  }

  return (
    <div className="mx-auto flex h-screen w-full overflow-hidden bg-black">
      <Meta props={meta} />
      <Toast username={username} />
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        results={results}
        totalUsers={totalUsers}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <div className="relative z-0 flex flex-1 overflow-hidden">
          <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
            {/* Navbar */}
            <Navbar setSidebarOpen={setSidebarOpen} />

            {children}
          </main>
          <div className="hidden h-screen md:order-first md:flex md:flex-col">
            <Directory results={results} totalUsers={totalUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}
