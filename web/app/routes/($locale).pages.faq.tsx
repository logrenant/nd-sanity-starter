import {useLoaderData, type LoaderFunctionArgs, type MetaFunction} from 'react-router';
import {PortableText} from '@portabletext/react';
import {getFaqPage} from '~/lib/sanity-queries';

export const meta: MetaFunction<typeof loader> = ({data}) => {
  return [{title: `Luneva | ${data?.page?.title ?? 'FAQ'}`}];
};

export async function loader({context}: LoaderFunctionArgs) {
  const page = await getFaqPage(context.sanity);

  if (!page) {
    throw new Response('Not Found', {status: 404});
  }

  return {
    page,
  };
}

export default function FaqPage() {
  const {page} = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-12 text-center">{page.title}</h1>
      
      <div className="space-y-8">
        {page.faqs?.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-8 last:border-0">
            <h3 className="text-xl font-semibold mb-4">{faq.question}</h3>
            <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              <PortableText value={faq.answer} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
