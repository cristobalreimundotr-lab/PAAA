import HomePage from "@/components/HomePage";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export default function Page() {
  return (
    <>
      <SiteHeader home />
      <HomePage />
      <SiteFooter />
    </>
  );
}
