import DOMPurify from 'dompurify'

interface HtmlParserProps {
  htmlString: string
}

export default function HtmlParser({ htmlString }: HtmlParserProps) {
  const sanitizedHtml = DOMPurify.sanitize(htmlString)
  return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
}
