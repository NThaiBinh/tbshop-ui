import { Fragment, useEffect, useState } from 'react'
import cssProductsList from './ProductsList.module.css'
import { getAllProductsInfo } from '../../../services/productServices'
import currencyFormat from '../../../utils/currencyFormat'
import { imageApi } from '../../../services'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { getAllProductDiscountsValid } from '../../../services/productDiscountServices'

function Category() {
   const [products, setProducts] = useState([])
   const [productDiscounts, setProductDiscount] = useState([])
   const [isDiscount, setIsDiscount] = useState(false)
   async function handleGetAllProductInfo() {
      const products = await getAllProductsInfo('1')
      if (products.code === 'SS') {
         setProducts(products.data)
      }
   }

   async function getProductDiscount() {
      const productDiscountInfo = await getAllProductDiscountsValid()
      if (productDiscountInfo.code === 'SS') {
         setProductDiscount(productDiscountInfo.data)
      }
   }

   function handleProductPrice(productId, productPrice) {
      let discountPercentage = 0
      productDiscounts.forEach((productDiscount) => {
         if (productDiscount.productId === productId) {
            if (!`${productDiscount.price}`.includes('%')) {
               productPrice = productPrice - parseFloat(productDiscount.price)
            } else {
               discountPercentage +=
                  parseFloat(`${productDiscount.price}`.slice(0, `${productDiscount.price}`.length - 1)) / 100
            }
         }
      })
      return productPrice - productPrice * discountPercentage
   }

   useEffect(() => {
      handleGetAllProductInfo()
      getProductDiscount()
   }, [])

   return (
      <Fragment>
         <div className={cssProductsList.category}>
            <h2 className={cssProductsList.title}>Gợi ý cho bạn</h2>
            <div className={cssProductsList.product}>
               {products.map((product, index) => {
                  const oldPrice = product.price
                  const newPrice = handleProductPrice(product.productId, product.price)
                  const discountPercentage = 100 - newPrice / (oldPrice / 100)
                  return (
                     <Link
                        key={index}
                        className={cssProductsList.productItem}
                        to={`/product/detail?productId=${product.productId}&productConfigurationId=${product.productConfigurationId}`}
                     >
                        {
                           <div className={cssProductsList.sale}>
                              <i className={clsx('fa-solid fa-heart', cssProductsList.saleIcon)}></i>
                              Giảm {discountPercentage}%
                           </div>
                        }
                        <div className={cssProductsList.header}>
                           <img
                              className={cssProductsList.productImg}
                              src={`${imageApi}/${product.productImage}`}
                              alt="Ảnh sản phẩm"
                           />
                        </div>
                        <div className={cssProductsList.body}>
                           <h2 className={cssProductsList.productName}>{product.name}</h2>
                           <span>{product.monitor}</span>
                           <span>{product.resolution}</span>
                           <span>{product.refreshRate}</span>
                           <div className={cssProductsList.productPrice}>
                              <h4 className={cssProductsList.oldPrice}>{currencyFormat(product.price)}</h4>
                              <h4 className={cssProductsList.newPrice}>{currencyFormat(newPrice)}</h4>
                           </div>
                           <ul className={cssProductsList.outstanding}>
                              {product.ram && <li className={cssProductsList.outstandingItem}>RAM: {product.ram}</li>}
                              {product.cpu && <li className={cssProductsList.outstandingItem}>CPU: {product.cpu}</li>}
                              {product.gpu && <li className={cssProductsList.outstandingItem}>GPU: {product.gpu}</li>}
                              {product.storageCapacity && (
                                 <li className={cssProductsList.outstandingItem}>Bộ nhớ: {product.storageCapacity}</li>
                              )}
                              {product.pin && <li className={cssProductsList.outstandingItem}>PIN: {product.pin}</li>}
                              {product.charging && (
                                 <li className={cssProductsList.outstandingItem}>SẠC: {product.charging}</li>
                              )}
                           </ul>
                        </div>
                     </Link>
                  )
               })}
            </div>
         </div>
      </Fragment>
   )
}

export default Category
