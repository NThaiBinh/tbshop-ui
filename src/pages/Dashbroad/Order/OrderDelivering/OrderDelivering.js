import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderList from '../../../components/OrderList/OrderList'
import { getAllInvoices } from '../../../../services/invoiceServices'
import { getSearchResults } from '../../../../services/orderServices'
import StoreContext from '../../../../store/StoreContext'

function InvoiceDelivering() {
   const [state, dispatch] = useContext(StoreContext)
   const navigate = useNavigate()

   const [orderDeliverings, setOrderDeliverings] = useState([])
   const [searchResults, setSearchResults] = useState([])

   useEffect(() => {
      async function handleGetAllOrders() {
         const invoiceInfo = await getAllInvoices('delivering')
         if (invoiceInfo?.code === 'SS') {
            setOrderDeliverings(invoiceInfo.data)
         }
      }

      handleGetAllOrders()
   }, [])

   useEffect(() => {
      async function handleGetSearchResults(query) {
         const searchResults = await getSearchResults(query)
         if (searchResults?.code === 'SS') {
            setOrderDeliverings(searchResults.data)
         }
      }

      handleGetSearchResults(state.searchValue)
   }, [state.searchValue])

   function handleConfirm(index) {
      navigate(`/dashbroad/orders-delivering/print/${orderDeliverings[index].invoiceId}`)
   }

   return <OrderList orders={orderDeliverings} handleConfirm={handleConfirm} titleBtnAction="In hóa đơn" />
}

export default InvoiceDelivering
