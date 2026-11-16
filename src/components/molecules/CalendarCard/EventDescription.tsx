import { ReactNode } from 'react';

import { containsHtml, parseHtml } from './htmlToText';

/**
 * Rebuilds a parsed node from a short list of harmless tags. Nothing from the
 * source is passed through: attributes are dropped, unknown tags are unwrapped
 * to their text, and links become plain text, since a wall tablet should not
 * navigate away from the dashboard.
 */
const renderNode = (node: ChildNode, key: number): ReactNode => {
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }

  const children = Array.from(node.childNodes, renderNode);

  switch (node.nodeName.toLowerCase()) {
    case 'script':
    case 'style':
      return null;
    case 'br':
      return <br key={key} />;
    case 'b':
    case 'strong':
      return <strong key={key}>{children}</strong>;
    case 'i':
    case 'em':
      return <em key={key}>{children}</em>;
    case 'u':
      return <u key={key}>{children}</u>;
    case 'p':
    case 'div':
      return <p key={key}>{children}</p>;
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return (
        <p key={key} className="text-mist font-semibold">
          {children}
        </p>
      );
    case 'ul':
      return (
        <ul key={key} className="list-disc pl-5">
          {children}
        </ul>
      );
    case 'ol':
      return (
        <ol key={key} className="list-decimal pl-5">
          {children}
        </ol>
      );
    case 'li':
      return <li key={key}>{children}</li>;
    case 'a':
      return (
        <span key={key} className="text-rain break-all">
          {children}
        </span>
      );
    default:
      return <span key={key}>{children}</span>;
  }
};

interface EventDescriptionProps {
  description: string;
}

export const EventDescription = ({ description }: EventDescriptionProps) =>
  containsHtml(description) ? (
    <div className="flex flex-col gap-2">
      {Array.from(parseHtml(description).childNodes, renderNode)}
    </div>
  ) : (
    <p className="whitespace-pre-line">{description}</p>
  );
