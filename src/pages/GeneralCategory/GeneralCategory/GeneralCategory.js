import { Fragment, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { deleteCategory, getAllCategories } from '../../../services/categoryServices'
import StoreContext from '../../../store/StoreContext'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../../BlankPage/BlankPage'
import TabelBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'
import { setLocation, setShowToast } from '../../../store/actions'
import { deleteProductType, getAllProductTypes } from '../../../services/productTypeServices'

function GeneralCategory() {
   const location = useLocation()
   const navigate = useNavigate()
   const [state, dispatch] = useContext(StoreContext)
   const [categories, setCategories] = useState([])
   const [productTypes, setProductTypes] = useState([])

   async function handleGetAllCategories() {
      const categories = await getAllCategories()
      if (categories.code === 'SS') {
         setCategories(categories.data)
      }
   }

   function handleEditCategory(categoryId) {
      navigate(`/dashbroad/general-categories/category/edit/${categoryId}`)
   }

   async function handleDeleteCategory(categoryId) {
      const result = await deleteCategory(categoryId)
      if (result === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xóa danh mục thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Xóa danh mục thất bại!'))
      }
   }

   async function handleGetAllProductTypes() {
      const productTypes = await getAllProductTypes()
      if (productTypes.code === 'SS') {
         setProductTypes(productTypes.data)
      }
   }

   function handleEditProductType(productTypeId) {
      navigate(`/dashbroad/general-categories/product-type/edit/${productTypeId}`)
   }

   async function handleDeleteProductType(productTypeId) {
      const result = await deleteProductType(productTypeId)
      if (result === 'SS') {
         dispatch(setShowToast(true, 'success', 'Xóa loại sản phẩm thành công!'))
      } else {
         dispatch(setShowToast(true, 'error', 'Xóa loại sản phẩm thất bại!'))
      }
   }

   useEffect(() => {
      dispatch(setLocation(location.pathname))
   }, [])

   useEffect(() => {
      handleGetAllCategories()
      handleGetAllProductTypes()
   }, [state.isShowToast])

   return (
      <Fragment>
         {categories.length > 0 || productTypes.length > 0 ? (
            <Fragment>
               {categories.length > 0 && (
                  <TableInfoDashbroad
                     title="THÔNG TIN DANH MỤC SẢN PHẨM"
                     image={false}
                     pagination={false}
                     updatedAt={true}
                  >
                     {categories.map((category, index) => (
                        <TabelBodyDashbroad
                           key={index}
                           id={category.categoryId}
                           name={category.name}
                           updatedAt={category.updatedAt}
                           handleEdit={() => handleEditCategory(category.categoryId)}
                           handleDelete={() => handleDeleteCategory(category.categoryId)}
                        />
                     ))}
                  </TableInfoDashbroad>
               )}
               <div style={{ height: '40px' }}></div>
               {productTypes.length > 0 && (
                  <TableInfoDashbroad title="THÔNG TIN LOẠI SẢN PHẨM" image={false} pagination={false} updatedAt={true}>
                     {productTypes.map((productType, index) => (
                        <TabelBodyDashbroad
                           key={index}
                           id={productType.productTypeId}
                           name={productType.name}
                           updatedAt={productType.updatedAt}
                           handleEdit={() => handleEditProductType(productType.productTypeId)}
                           handleDelete={() => handleDeleteProductType(productType.productTypeId)}
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

export default GeneralCategory
