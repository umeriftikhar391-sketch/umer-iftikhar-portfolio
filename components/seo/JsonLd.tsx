/**
 * JSON-LD script tag. "<" is serialized as the JSON escape < so text inside the data
 * (FAQ answers, titles) can never close the <script> element early. Note the doubled backslash:
 * "<" in a JS string literal is just "<" and would escape nothing.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
