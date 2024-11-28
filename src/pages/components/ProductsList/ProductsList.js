import { Fragment } from 'react'
import cssProductsList from './ProductsList.module.css'
import currencyFormat from '../../../utils/currencyFormat'
import { imageApi } from '../../../services'
import clsx from 'clsx'
import { Link } from 'react-router-dom'

function ProductList({ title, products = [], page = 'product' }) {
   return (
      <Fragment>
         <div className={cssProductsList.category}>
            <h2 className={cssProductsList.title}>{title}</h2>
            <div className={cssProductsList.product}>
               {products.map((product, index) => (
                  <Link
                     key={index}
                     className={cssProductsList.productItem}
                     to={`/${page}/detail?productId=${product.productId}&productConfigurationId=${product.productConfigurationId}`}
                  >
                     {product.discountPrice && (
                        <div className={cssProductsList.sale}>
                           <i className={clsx('fa-solid fa-heart', cssProductsList.saleIcon)}></i>
                           Giảm {product.discountPercentage}%
                        </div>
                     )}
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
                           {product.discountPrice && (
                              <h4 className={cssProductsList.oldPrice}>{currencyFormat(product.price)}</h4>
                           )}
                           <h4 className={cssProductsList.newPrice}>
                              {currencyFormat(product.discountPrice ? product.discountPrice : product.price)}
                           </h4>
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
               ))}
            </div>
         </div>
      </Fragment>
   )
}

export default ProductList
