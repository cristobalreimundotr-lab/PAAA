import { notFound } from "next/navigation";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import PropertyDetailPage from "@/components/PropertyDetailPage";
import { propertyPages } from "@/data/siteData";

export function generateStaticParams() {
  return Object.keys(propertyPages).map((slug) => ({ slug }));
}

export default function Page({ params }) {
  const property = propertyPages[params.slug];

  if (!property) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <PropertyDetailPage property={property} />
      <SiteFooter />
    </>
  );
}
