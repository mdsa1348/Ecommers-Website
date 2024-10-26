import "../App";
import MyCarousel from "./home/Carousel";
import ProductList from "./ProductList";

function Home() {
    return (
        <div className="mb-5">
            <div className="mb-4">
                <h1>Home Page</h1>
            </div>
            <MyCarousel/>
            <div className="mb-5 mt-5">
                <h1>Show All Product</h1>
            </div>
            <ProductList/>
        </div>
    )
}

export default Home;