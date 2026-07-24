import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * "Prose" propio de marca. react-markdown NO interpreta HTML crudo por defecto,
 * así que el contenido queda saneado sin necesidad de dangerouslySetInnerHTML.
 */
const components: Components = {
  h2: (props) => (
    <h2
      className="mt-12 mb-4 font-serif text-2xl font-semibold text-purple sm:text-3xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 mb-3 font-serif text-xl font-semibold text-purple"
      {...props}
    />
  ),
  h4: (props) => (
    <h4 className="mt-8 mb-2 font-sans text-lg font-semibold text-purple" {...props} />
  ),
  p: (props) => (
    <p className="my-5 text-[1.05rem] leading-relaxed text-purpleSoft" {...props} />
  ),
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-purpleSoft marker:text-gold2" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-purpleSoft marker:text-gold3" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: ({ href, ...props }) => {
    const external = typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        className="font-medium text-gold3 underline decoration-gold2/40 underline-offset-2 transition-colors hover:text-gold2"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      />
    );
  },
  blockquote: (props) => (
    <blockquote
      className="my-6 border-l-4 border-gold2 bg-cream2/60 py-2 pl-5 pr-4 font-serif text-lg italic text-purple"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-purple" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  hr: () => <hr className="my-10 border-purple/10" />,
  code: (props) => (
    <code
      className="rounded bg-purple/5 px-1.5 py-0.5 font-mono text-[0.9em] text-purple"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl bg-purpleDeep p-5 text-sm text-cream"
      {...props}
    />
  ),
};

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
