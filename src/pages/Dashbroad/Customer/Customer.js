import { Fragment, useEffect, useState } from 'react'

import { getAllCustomers } from '../../../services/customerServices'

import BlankPage from '../../BlankPage/BlankPage'
import TableInfoDashbroad from '../../components/TableInfoDashbroad/TableInfoDashbroad'
import TableBodyDashbroad from '../../components/TableBodyDashbroad/TableBodyDashbroad'

function Customer() {
   const [customers, setCustomers] = useState([])

   useEffect(() => {
      async function handleGetAllCustomers() {
         const results = await getAllCustomers()
         if (results.code === 'SS') {
            setCustomers(results.data)
         }
      }

      handleGetAllCustomers()
   }, [])

   return (
      <Fragment>
         {customers.length > 0 ? (
            <TableInfoDashbroad image={true} updatedAt={true}>
               {customers.map((customers) => (
                  <TableBodyDashbroad
                     key={customers.userId}
                     id={customers.userId}
                     name={customers.name}
                     image={customers.image}
                     updatedAt={customers.updatedAt}
                  />
               ))}
            </TableInfoDashbroad>
         ) : (
            <BlankPage />
         )}
      </Fragment>
   )
}

export default Customer
