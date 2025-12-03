import Hero from "./Hero";
import FeaturedReviews from "./FeaturedReviews";

const Home = () => {
  return (
    <div className="space-y-10 md:space-y-14">
      <Hero />
      <FeaturedReviews />

      {/* পরে এখানে আরও দুইটা custom section add করব */}
    </div>
  );
};

export default Home;
