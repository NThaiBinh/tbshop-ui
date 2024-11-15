import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import StoreContext from '../../../store/StoreContext'
import { deleteProduct, getAllProductsInfo } from '../../../services/productServices'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../../BlankPage/BlankPage'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import { setLocation, setShowToast } from '../../../store/actions'

function Product() {
   const navigate = useNavigate()
   const location = useLocation()
   const [state, dispatch] = useContext(StoreContext)
   const [products, setProducts] = useState([])

   async function handleGetAllProductsInPage(page) {
      const products = await getAllProductsInfo(page)
      if (products.code === 'SS') {
         setProducts(products.data)
      }
   }

   useEffect(() => {
      handleGetAllProductsInPage(state.page)
   }, [state.page, state.isShowToast])

   useEffect(() => {
      dispatch(setLocation(location.pathname))
   }, [])

   function handleEdit(productId, productConfigurationId) {
      navigate(`/dashbroad/products/edit?productId=${productId}&productConfigurationId=${productConfigurationId}`)
   }

   async function handleDelete(productId) {
      const result = await deleteProduct(productId)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xóa sản phẩm thành công!'))
         navigate('/dashbroad/products/page/1')
      } else {
         dispatch(setShowToast(true, 'error', 'Xóa sản phẩm thất bại!'))
      }
   }

   return (
      <Fragment>
         {products.length > 0 ? (
            <TableInfoDashbroad title="THÔNG TIN SẢN PHẨM" image={true}>
               {products.map((product, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={product.productId}
                     name={`${product.name} ${product.cpu} ${product.gpu}`}
                     image={product.productImage}
                     updateAt={product.updateAt}
                     handleEdit={() => handleEdit(product.productId, product.productConfigurationId)}
                     handleDelete={() => handleDelete(product.productId)}
                  />
               ))}
            </TableInfoDashbroad>
         ) : (
            <BlankPage />
         )}
      </Fragment>
   )
}

export default Product
