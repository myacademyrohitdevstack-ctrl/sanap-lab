import Hero from "@/components/Hero";
import TestCategories from "@/components/TestCategories";
import FeaturedPackages from "@/components/FeaturedPackages";
import HomeCollection from "@/components/HomeCollection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Steps from "@/components/Steps";
import Reviews from "@/components/Reviews";
import LabLocation from "@/components/LabLocation";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TestCategories />
      <FeaturedPackages />
      <HomeCollection />
      <WhyChooseUs />
      <Steps />
      <Reviews />
      <LabLocation />
    </>
  );
}
