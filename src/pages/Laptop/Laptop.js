import { useEffect, useState } from 'react'
import ProductFilter from '../components/ProductFilter/ProductFilter'
import ProductsList from '../components/ProductsList/ProductsList'
import { filterProduct } from '../../services/productServices'
import { getAllManufacsByCategoryId } from '../../services/manufacturerServices'
function Laptop() {
   const [phones, setPhones] = useState([])
   const [manufacs, setManufacts] = useState([])
   const [activeManufac, setActiveManufac] = useState(null)
   const [activeProductType, setActiveProductType] = useState(null)

   useEffect(() => {
      async function handleGetAllManufacs() {
         const manufacsInfo = await getAllManufacsByCategoryId('laptop')
         if (manufacsInfo.code === 'SS') {
            setManufacts(manufacsInfo.data)
         }
      }
      handleGetAllManufacs()
   }, [])

   useEffect(() => {
      async function handleFilterProduct(categoryId, manufacId, productTypeId, page) {
         const result = await filterProduct(categoryId, manufacId, productTypeId, page)
         if (result.code === 'SS') {
            setPhones(result.data)
         }
      }

      handleFilterProduct('laptop', activeManufac, activeProductType)
   }, [activeManufac, activeProductType])

   return (
      <ProductFilter
         manufacs={manufacs}
         activeManufac={activeManufac}
         setActiveManufac={setActiveManufac}
         activeProductType={activeProductType}
         setActiveProductType={setActiveProductType}
      >
         <ProductsList title="Danh mục laptop" products={phones} page="laptops" />
      </ProductFilter>
   )
}

export default Laptop
