import Carousel from 'react-bootstrap/Carousel';
import Image1 from './Images/img1.png';
import Image2 from './Images/img2.png';
import Image3 from './Images/img3.png';
import './MyCarousel.css';  // Import a separate CSS file for styling

function MyCarousel() {
  return (
    <Carousel className="my-carousel">
      <Carousel.Item interval={2000}>
        <img src={Image1} alt="First slide" className="carousel-image" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src={Image2} alt="Second slide" className="carousel-image" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2000}>
        <img src={Image3} alt="Third slide" className="carousel-image" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
