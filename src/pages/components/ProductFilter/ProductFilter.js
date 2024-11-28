import { useEffect, useState } from 'react'
import cssProductFilter from './ProductFilter.module.css'
import { getAllProductTypes } from '../../../services/productTypeServices'
import clsx from 'clsx'

function ProductFilter({
   children,
   manufacs = [],
   activeManufac,
   setActiveManufac,
   activeProductType,
   setActiveProductType,
}) {
   const [productTypes, setProductTypes] = useState([])

   useEffect(() => {
      async function handleGetAllProductTypes() {
         const productInfo = await getAllProductTypes()
         if (productInfo.code === 'SS') {
            setProductTypes(productInfo.data)
         }
      }
      handleGetAllProductTypes()
   }, [])

   return (
      <div className={cssProductFilter.wrapper}>
         <div className={cssProductFilter.header}>
            <h2 className={cssProductFilter.title}>
               Tiêu chí chọn sản phẩm:{' '}
               <button
                  className={cssProductFilter.btnClear}
                  onClick={() => {
                     setActiveManufac(null)
                     setActiveProductType(null)
                  }}
               >
                  Khôi phục
               </button>
            </h2>
            <div className={cssProductFilter.filter}>
               <div className={cssProductFilter.manufacList}>
                  <h4>Hãng sản xuất: </h4>
                  {manufacs.map((manufac) => (
                     <div
                        key={manufac.manufacId}
                        className={clsx(cssProductFilter.manufacItem, {
                           [cssProductFilter.active]: activeManufac === manufac.manufacId,
                        })}
                        onClick={() => setActiveManufac(manufac.manufacId)}
                     >
                        <strong>{manufac.name}</strong>
                     </div>
                  ))}
               </div>
               <div className={cssProductFilter.space}></div>
               <div className={cssProductFilter.manufacList}>
                  <h4>Loại sản phẩm: </h4>
                  {productTypes.map((productType) => (
                     <div
                        key={productType.productTypeId}
                        className={clsx(cssProductFilter.manufacItem, {
                           [cssProductFilter.active]: activeProductType === productType.productTypeId,
                        })}
                        onClick={() => setActiveProductType(productType.productTypeId)}
                     >
                        <strong>{productType.name}</strong>
                     </div>
                  ))}
               </div>
            </div>
         </div>
         <div className={cssProductFilter.body}>{children}</div>
      </div>
   )
}

export default ProductFilter
