import { Fragment, useState } from 'react'
import TabelBodyDashbroad from '../components/TableBodyDashbroad/TableBodyDashbroad'
import TableInfoDashbroad from '../components/TableInfoDashbroad/TableInfoDashbroad'
import BlankPage from '../BlankPage/BlankPage'

function Position() {
   const [positions, setPositions] = useState([])
   return (
      <Fragment>
         {positions.length > 0 ? (
            <TableInfoDashbroad title="THÔNG TIN CHỨC VỤ">
               {positions.map((position, index) => (
                  <TabelBodyDashbroad
                     key={index}
                     id={position.MACV}
                     name={position.TENCV}
                     updatedAt={position.NGAYCAPNHAT}
                     objectHandle="positions"
                  />
               ))}
            </TableInfoDashbroad>
         ) : (
            <BlankPage />
         )}
      </Fragment>
   )
}

export default Position
