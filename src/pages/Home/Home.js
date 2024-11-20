import { useEffect, useState } from 'react'
import cssHome from './Home.module.css'
import ProductsList from '../components/ProductsList/ProductsList'
import Slider from '../components/Slider/Slider'
import { getAllStorewidePosterDiscounts } from '../../services/storewideDiscountServices'
import { getAllProductPosterDiscounts } from '../../services/productDiscountServices'

function Home() {
   const [posterDiscount, setPosterDiscount] = useState([])
   const widthSlide = 1730
   const maxWidthSlide = (posterDiscount.length - 1) * widthSlide * -1

   async function handleGetStorewidePosterDiscounts() {
      const storewidePosterDiscountsInfo = await getAllStorewidePosterDiscounts()
      if (storewidePosterDiscountsInfo.code === 'SS') {
         setPosterDiscount((prev) => [...prev, ...storewidePosterDiscountsInfo.data])
      }

      const productPosterDiscountsInfo = await getAllProductPosterDiscounts()
      if (productPosterDiscountsInfo.code === 'SS') {
         setPosterDiscount((prev) => [...prev, ...productPosterDiscountsInfo.data])
      }
   }

   useEffect(() => {
      handleGetStorewidePosterDiscounts()
   }, [])

   return (
      <div className={cssHome.wrapper}>
         <div className={cssHome.wrapperSlider}>
            <Slider imageArray={posterDiscount} widthSlide={widthSlide} maxWidthSlide={maxWidthSlide} />
         </div>
         <ProductsList />
      </div>
   )
}

export default Home
