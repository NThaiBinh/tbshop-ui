import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import BlankPage from '../../BlankPage/BlankPage'
import { getAllStorewideDiscountsInPage } from '../../../services/storewideDiscountServices'
import { getAllProductDiscountsInPage } from '../../../services/productDiscountServices'
import StoreContext from '../../../store/StoreContext'

function Discount() {
   const params = useParams()
   const [state, dispatch] = useContext(StoreContext)
   const location = useLocation()
   const [storewideDiscounts, setStorewideDiscounts] = useState([])
   const [productDiscounts, setProductDiscounts] = useState([])

   function handleEditStorewideDiscount(storewideDiscountId) {}
   function handleDeleteStorewideDiscount(storewideDiscountId) {}
   function handleEditProductDiscount(productDiscountId) {}
   function handleDeleteProductDiscount(productDiscountId) {}

   async function handleGetAllStorewideDiscount(page) {
      const storewideDiscountInfo = await getAllStorewideDiscountsInPage(page)
      if (storewideDiscountInfo.code === 'SS') {
         setStorewideDiscounts(storewideDiscountInfo.data)
      }
   }

   async function handleGetAllProductDiscount(page) {
      const productDiscountInfo = await getAllProductDiscountsInPage(page)
      if (productDiscountInfo.code === 'SS') {
         setProductDiscounts(productDiscountInfo.data)
      }
   }

   useEffect(() => {
      handleGetAllStorewideDiscount(params.page)
      handleGetAllProductDiscount(params.page)
   }, [params.page])
   return (
      <Fragment>
         {storewideDiscounts.length > 0 || productDiscounts.length > 0 ? (
            <Fragment>
               {storewideDiscounts.length > 0 && (
                  <TableInfoDashbroad
                     title="THÔNG TIN KHUYẾN MÃI CHUNG"
                     image={false}
                     pagination={false}
                     startDate={true}
                     enddate={true}
                  >
                     {storewideDiscounts.map((storewideDiscount, index) => (
                        <TabelBodyDashbroad
                           key={index}
                           id={storewideDiscount.storewideDiscountId}
                           name={storewideDiscount.name}
                           startDate={storewideDiscount.startDate}
                           endDate={storewideDiscount.endDate}
                           handleEdit={() => handleEditStorewideDiscount(storewideDiscount.storewideDiscountId)}
                           handleDelete={() => handleDeleteStorewideDiscount(storewideDiscount.storewideDiscountId)}
                        />
                     ))}
                  </TableInfoDashbroad>
               )}
               <div style={{ height: '40px' }}></div>
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
                           refId={productDiscount.productId}
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
