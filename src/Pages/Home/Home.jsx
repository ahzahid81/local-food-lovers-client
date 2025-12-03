import Hero from "./Hero";
import FeaturedReviews from "./FeaturedReviews";

const Home = () => {
  return (
    <div className="space-y-10">
      <Hero />
      <FeaturedReviews />
      {/* পরবর্তীতে আরও ২টি extra section যোগ করব */}
    </div>
  );
};

export default Home;
