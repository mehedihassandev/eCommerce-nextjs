import { Banner, TopProduct } from '@/app/home';
import { BannerCard } from '@/app/home/banner-card';

export default function Home() {
  return (
    <>
      <Banner />
      <TopProduct />
      <div className="grid grid-cols-2 gap-8 max-w-screen-2xl mx-auto px-6 py-2">
        <BannerCard
          backgroundImage="https://cdn.pixabay.com/photo/2019/07/14/16/27/pen-4337521_1280.jpg"
          title="Christmas Sale"
          subtitle="Up to 70% Off"
          descriptions='Get the best deals on our products during the Christmas Sale. "Limited Time Offer". Check out our collection now. Offer valid till 25th December.'
          buttonText="Shop Now"
        />
        <BannerCard
          backgroundImage="https://cdn.pixabay.com/photo/2018/01/16/10/18/headphones-3085681_1280.jpg"
          title="Special Offer"
          subtitle="Get 50% Off"
          descriptions='Get the best deals on our products with this Special Offer. "Limited Time Offer". Shop now and enjoy exclusive discounts. Offer valid till 31st December.'
          buttonText="Shop Now"
        />
      </div>
    </>
  );
}
