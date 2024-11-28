import { useEffect, useState } from 'react'
import ProductFilter from '../components/ProductFilter/ProductFilter'
import ProductsList from '../components/ProductsList/ProductsList'
import cssPhone from './Phone.module.css'
import { filterPrtoduct } from '../../services/productServices'
import { getAllManufacsByCategoryId } from '../../services/manufacturerServices'
function Phone() {
   const [phones, setPhones] = useState([])
   const [manufacs, setManufacts] = useState([])
   const [activeManufac, setActiveManufac] = useState(null)
   const [activeProductType, setActiveProductType] = useState(null)

   useEffect(() => {
      async function handleGetAllManufacs() {
         const manufacsInfo = await getAllManufacsByCategoryId('phone')
         if (manufacsInfo.code === 'SS') {
            setManufacts(manufacsInfo.data)
         }
      }
      handleGetAllManufacs()
   }, [])

   useEffect(() => {
      async function handleFilterProduct(categoryId, manufacId, productTypeId, page) {
         const result = await filterPrtoduct(categoryId, manufacId, productTypeId, page)
         if (result.code === 'SS') {
            setPhones(result.data)
         }
      }
      handleFilterProduct('phone', activeManufac, activeProductType)
   }, [activeManufac, activeProductType])

   return (
      <ProductFilter
         manufacs={manufacs}
         activeManufac={activeManufac}
         setActiveManufac={setActiveManufac}
         activeProductType={activeProductType}
         setActiveProductType={setActiveProductType}
      >
         <ProductsList title="Danh mục điện thoại" products={phones} page="phones" />
      </ProductFilter>
   )
}

export default Phone
