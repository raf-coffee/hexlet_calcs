import { Helmet } from "react-helmet-async";

export function SEO({ theme, title, name, content }) {
  return (
    <Helmet>
      <html lang="ru" data-bs-theme={theme} />
      <meta httpEquiv="X-UA-Compatible" content="IE=Edge" />
      <title>{title}</title>
      <meta name={name} content={content} />
    </Helmet>
  );
}
