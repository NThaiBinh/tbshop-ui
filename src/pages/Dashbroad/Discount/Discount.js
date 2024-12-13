import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import BlankPage from '../../BlankPage/BlankPage'
import { getAllProductDiscountsInPage } from '../../../services/productDiscountServices'
import StoreContext from '../../../store/StoreContext'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'

function Discount() {
   const params = useParams()
   const [state, dispatch] = useContext(StoreContext)
   const location = useLocation()
   const [productDiscounts, setProductDiscounts] = useState([])

   function handleEditProductDiscount(productDiscountId) {}
   function handleDeleteProductDiscount(productDiscountId) {}

   useEffect(() => {
      async function handleGetAllProductDiscount(page) {
         const productDiscountInfo = await getAllProductDiscountsInPage(page)
         if (productDiscountInfo.code === 'SS') {
            setProductDiscounts(productDiscountInfo.data)
         }
      }

      handleGetAllProductDiscount(params.page)
   }, [params.page])
   return (
      <Fragment>
         {productDiscounts.length > 0 ? (
            <Fragment>
               {productDiscounts.length > 0 && (
                  <TableInfoDashbroad
                     title="THÔNG TIN LOẠI SẢN PHẨM"
                     image={false}
                     pagination={false}
                     startDate={true}
                     enddate={true}
                     refId={true}
                  >
                     {productDiscounts.map((productDiscount, index) => (
                        <TabelBodyDashbroad
                           key={index}
                           id={productDiscount.productDiscountId}
                           refId={productDiscount.productName}
                           name={productDiscount.name}
                           startDate={productDiscount.startDate}
                           endDate={productDiscount.endDate}
                           handleEdit={() => handleEditProductDiscount(productDiscount.productDiscountId)}
                           handleDelete={() => handleDeleteProductDiscount(productDiscount.productDiscountId)}
                        />
                     ))}
                  </TableInfoDashbroad>
               )}
            </Fragment>
         ) : (
            <BlankPage />
         )}
      </Fragment>
   )
}

export default Discount
