import { notFound } from "next/navigation";
import PropertyPage from "@/components/PropertyPage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { propertyDetails } from "@/data/siteData";

export function generateStaticParams() {
  return Object.keys(propertyDetails).map((id) => ({ id }));
}

export default function Page({ params }) {
  const property = propertyDetails[params.id];

  if (!property || params.id === "FB-STGO-001") {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <PropertyPage property={property} />
      <SiteFooter />
    </>
  );
}
