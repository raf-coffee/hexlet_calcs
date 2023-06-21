import { Helmet } from "react-helmet-async";

export function SEO({ theme }) {
  return (
    <Helmet>
      <html lang="ru" data-bs-theme={theme} />
    </Helmet>
  );
}
