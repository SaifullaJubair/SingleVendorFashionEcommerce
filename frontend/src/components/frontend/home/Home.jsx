import Banner from "./banner/Banner";
import PopularProducts from "./popularProducts/PopularProducts";
import TrendingProduct from "./trendingProduct/TrendingProduct";
import OnlyForYouProduct from "./latestProducts/LatestProducts";
import NewFeatureCategories from "./newFeatureCategories/NewFeatureCategories";

const Home = () => {
  return (
    <div className="space-y-20">
      <Banner />
      <NewFeatureCategories />
      {/* <FeatureCategories /> */}
      {/* <ECommerceChoice /> */}
      <PopularProducts />
   
      {/* <TrendingProduct /> */}
      {/* Latest Product */}
      {/*!!!! <OnlyForYouProduct /> */}
      {/* <AdsSection /> */}
      {/* <SliderAd /> */}
      {/* <FeatureService /> */}
    </div>
  );
};

export default Home;
