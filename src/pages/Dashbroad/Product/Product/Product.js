import { Fragment, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import StoreContext from '../../../../store/StoreContext'
import { deleteProduct, getAllProductsInfo, productFilterDashbroad } from '../../../../services/productServices'
import TableInfoDashbroad from '../../../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../../../BlankPage/BlankPage'
import TabelBodyDashbroad from '../../../components/TableBodyDashbroad/TableBodyDashbroad'
import { setIsUpdate, setShowToast } from '../../../../store/actions'
import exportExcel from '../../../../utils/exportExcel'

function Product() {
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [products, setProducts] = useState([])
   const [userInfo, setUserInfo] = useState()

   useEffect(() => {
      const storedUser = localStorage.getItem('userInfo')
      if (storedUser) {
         setUserInfo(JSON.parse(storedUser))
      }
   }, [])

   useEffect(() => {
      async function handleGetAllProductsInPage(page) {
         const products = await getAllProductsInfo(page)
         if (products.code === 'SS') {
            setProducts(products.data)
         }
      }

      navigate(`/dashbroad/products/page/${state.page}`, { replace: true })

      handleGetAllProductsInPage(state.page)
   }, [state.page, state.isUpdate])

   useEffect(() => {
      async function handleFilterProduct(q) {
         const searchResults = await productFilterDashbroad(q)
         if (searchResults.code === 'SS') {
            setProducts(searchResults.data)
         }
      }

      handleFilterProduct(state.searchValue)
   }, [state.searchValue])

   function handleEdit(productId, productConfigurationId) {
      navigate(`/dashbroad/products/edit?productId=${productId}&productConfigurationId=${productConfigurationId}`)
   }

   async function handleDelete(productId, productConfigurationId) {
      if (userInfo.roles.includes('admin')) {
         const result = await deleteProduct(productId, productConfigurationId)
         if (result.code === 'SS') {
            dispatch(setShowToast(true, 'success', 'Xóa sản phẩm thành công!'))
            dispatch(setIsUpdate(!state.isUpdate))
         } else {
            dispatch(setShowToast(true, 'error', 'Xóa sản phẩm thất bại!'))
         }
      } else {
         dispatch(setShowToast(true, 'error', 'Bạn không có quyền xóa!'))
      }
   }

   function handlePrint() {
      exportExcel(
         products.map((product) => {
            return {
               'Mã sản phẩm': product.productId,
               'Tên sản phẩm': product.name,
               'Nhà sản xuất': product.manufacName,
               CPU: product.cpu,
               GPU: product.GPU,
               'Màn hình': product.monitor,
               'Giá sản phẩm': product.price,
               'Giảm giá': product.discountPercentage,
               'Giá sau giảm': product.discountPrice,
               'Số lượng tồn': product.quantityInStock,
            }
         }),
      )
   }

   return (
      <Fragment>
         {products.length <= 0 && state.page === '1' ? (
            <BlankPage />
         ) : (
            <TableInfoDashbroad
               title="THÔNG TIN SẢN PHẨM"
               image={true}
               manufacName={true}
               updatedAt={true}
               quantityInStock={true}
               productPrice={true}
               pagination={true}
               print={true}
               handlePrint={handlePrint}
            >
               {products.map((product, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={product.productId}
                     manufacName={product.manufacName}
                     name={`${product.name} ${product.cpu} ${product.gpu}`}
                     image={product.productImage}
                     quantityInStock={product.quantityInStock}
                     productPrice={product.price}
                     updatedAt={product.updatedAt}
                     handleEdit={() => handleEdit(product.productId, product.productConfigurationId)}
                     handleDelete={() => handleDelete(product.productId, product.productConfigurationId)}
                  />
               ))}
            </TableInfoDashbroad>
         )}
      </Fragment>
   )
}

export default Product
