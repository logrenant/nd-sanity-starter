import {PortableText} from '@portabletext/react';
import type {SanityTextWithParagraph} from '~/lib/sanity-types';

interface TextWithParagraphProps {
  data: SanityTextWithParagraph;
}

export function TextWithParagraph({data}: TextWithParagraphProps) {
  if (!data) return null;
  const {title, content, reverseDirection} = data;

  return (
    <div className="w-full px-16 py-[72px]">
      <div className={`flex w-full justify-between items-start gap-10 ${reverseDirection ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className="flex-1">
          <h2 className="text-3xl font-bold">{title}</h2>
        </div>
        <div className="flex-1 prose dark:prose-invert">
          <PortableText value={content} />
        </div>
      </div>
    </div>
  );
}
