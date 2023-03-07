import { GetStaticProps } from 'next';

import {
  getAllUsers,
  getFirstUser,
  getUserCount,
  UserProps,
} from '@/lib/api/user';
import clientPromise from '@/lib/mongodb';

import { defaultMetaProps } from '@/components/layout/meta';
import Profile from '@/components/profile';

export default function Home({ user }: { user: UserProps }) {
  return <Profile user={user} settings={false} />;
}

export const getStaticProps: GetStaticProps = async () => {
  // You should remove this try-catch block once your MongoDB Cluster is fully provisioned
  try {
    await clientPromise;
  } catch (e: any) {
    if (e.code === 'ENOTFOUND') {
      // cluster is still provisioning
      return {
        props: {
          clusterStillProvisioning: true,
        },
      };
    } else {
      throw new Error(`Connection limit reached. Please try again later.`);
    }
  }

  const results = await getAllUsers();
  const totalUsers = await getUserCount();
  const firstUser = await getFirstUser();

  return {
    props: {
      meta: defaultMetaProps,
      results,
      totalUsers,
      user: firstUser,
    },
    revalidate: 10,
  };
};
