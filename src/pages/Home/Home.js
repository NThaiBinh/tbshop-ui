import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import ProductsList from '../components/ProductsList/ProductsList'
import Slider from '../components/Slider/Slider'
import { getAllProductPosterDiscounts } from '../../services/productDiscountServices'
import { getAllProductsInfo } from '../../services/productServices'

function Home() {
   const [products, setProducts] = useState([])
   const [posterDiscount, setPosterDiscount] = useState([])
   const widthSlide = 1730
   const maxWidthSlide = (posterDiscount.length - 1) * widthSlide * -1

   useEffect(() => {
      async function handleGetAllPosterDiscount() {
         const productPosterDiscountsInfo = await getAllProductPosterDiscounts()
         if (productPosterDiscountsInfo.code === 'SS') {
            setPosterDiscount((prev) => [...prev, ...productPosterDiscountsInfo.data])
         }
      }

      async function handleGetAllProductInfo() {
         const products = await getAllProductsInfo('1')
         if (products.code === 'SS') {
            setProducts(products.data)
         }
      }

      handleGetAllProductInfo()

      handleGetAllPosterDiscount()
   }, [])

   return (
      <div className={styles.wrapper}>
         <div className={styles.wrapperSlider}>
            <Slider imageArray={posterDiscount} widthSlide={widthSlide} maxWidthSlide={maxWidthSlide} />
         </div>
         <ProductsList title="Gợi ý cho bạn" products={products} />
      </div>
   )
}

export default Home
