import cssHome from './Home.module.css'
import ProductsList from '../components/ProductsList/ProductsList'
import img1 from '../imagePages/sale1.png'
import img2 from '../imagePages/sale2.png'
import Slider from '../components/Slider/Slider'

function Home() {
   const images = [img1, img2, img1, img2]
   const widthSlide = 1730
   const maxWidthSlide = (images.length - 1) * widthSlide * -1
   return (
      <div className={cssHome.wrapper}>
         <div className={cssHome.wrapperSlider}>
            <Slider imageArray={images} widthSlide={widthSlide} maxWidthSlide={maxWidthSlide} />
         </div>
         <ProductsList />
      </div>
   )
}

export default Home
