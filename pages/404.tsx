import Meta, { defaultMetaProps } from '@/components/layout/meta';
export { getStaticProps } from '.';

export default function Custom404() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <Meta
        props={{
          ...defaultMetaProps,
          title: '404 | MongoDB Starter Kit',
          ogUrl: 'https://mongodb.vercel.app/404',
        }}
      />
      <h1 className="text-2xl font-light text-white">
        404 <span className="mx-3 text-4xl">|</span> User Not Found
      </h1>
    </div>
  );
}
