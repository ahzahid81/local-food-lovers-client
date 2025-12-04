import Hero from "./Hero";
import FeaturedReviews from "./FeaturedReviews";
import ExploreByMood from "./ExploreByMood";
import WhyFoodieCircle from "./WhyFoodieCircle";

const Home = () => {
  return (
    <div className="space-y-10 md:space-y-14">
      <Hero />
      <FeaturedReviews />
      <ExploreByMood></ExploreByMood>
      <WhyFoodieCircle></WhyFoodieCircle>
    </div>
  );
};

export default Home;
