import {useLoaderData, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import {PortableText} from '@portabletext/react';
import {getAboutPage} from '~/lib/sanity-queries';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Luneva | ${data?.page?.title ?? 'About Us'}`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const page = await getAboutPage(context.sanity);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return {
    page,
  };
}

export default function AboutPage() {
  const {page} = useLoaderData<typeof loader>();
  const imageUrl = page.mainImage?.asset?.url;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center">{page.title}</h1>
      
      {imageUrl && (
        <div className="mb-12 w-full aspect-video relative overflow-hidden rounded-lg">
          <img 
            src={imageUrl} 
            alt={page.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none mx-auto">
        <PortableText value={page.content} />
      </div>
    </div>
  );
}
