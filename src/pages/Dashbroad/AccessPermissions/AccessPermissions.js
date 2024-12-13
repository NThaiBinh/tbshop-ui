import { useContext, useEffect, useState } from 'react'
import styles from './AccessPermissions.module.css'
import { getAllUserAndRoles, updateUserRole } from '../../../services/accessPermissionServices'
import StoreContext from '../../../store/StoreContext'
import { setShowToast } from '../../../store/actions'

function AccessPermissions() {
   const [state, dispatch] = useContext(StoreContext)
   const [userRoles, setUserRoles] = useState([])

   useEffect(() => {
      async function handleGetAllUserAndRoles() {
         const userRolesInfo = await getAllUserAndRoles()
         if (userRolesInfo.code === 'SS') {
            setUserRoles(userRolesInfo.data)
         }
      }

      handleGetAllUserAndRoles()
   }, [])

   async function handleRoleChange(accountId, roleInfo) {
      setUserRoles(
         userRoles.map((userRole) => {
            if (userRole.accountId === accountId)
               return {
                  ...userRole,
                  roleId: roleInfo,
               }
            else return userRole
         }),
      )
      const result = await updateUserRole(accountId, roleInfo)
      if (result.code === 'SS') {
         dispatch(setShowToast(true, 'success', 'Cập nhật quyền hạn thành công!'))
      }
   }

   return (
      <div className={styles.wrapper}>
         <div className={styles.header}>
            <h2 className={styles.title}>THÔNG TIN PHÂN QUYỀN</h2>
         </div>
         <div className={styles.body}>
            {userRoles.map((userRole, index) => (
               <div key={index} className={styles.infoEmployee}>
                  <div className={styles.info}>
                     <div className={styles.idEmployee}>{userRole.userId}</div>
                     <div className={styles.userName}>{userRole.userName}</div>
                     <div className={styles.position}>{userRole.name}</div>
                     <div className={styles.nameEmployee}>{userRole.positionName}</div>
                  </div>
                  <div className={styles.groupPermission}>
                     <label htmlFor="create">Quản trị</label>
                     <input
                        id="create"
                        type="radio"
                        name={userRole.userId}
                        value="admin"
                        checked={userRole.roleId === 'admin'}
                        onChange={(e) => handleRoleChange(userRole.accountId, e.target.value)}
                     />
                     <label htmlFor="update">Chỉnh sửa & thêm mới</label>
                     <input
                        id="update"
                        type="radio"
                        name={userRole.userId}
                        value="editor"
                        checked={userRole.roleId === 'editor'}
                        onChange={(e) => handleRoleChange(userRole.accountId, e.target.value)}
                     />
                     <label htmlFor="delete">Chỉ đọc</label>
                     <input
                        id="delete"
                        type="radio"
                        name={userRole.userId}
                        value="viewer"
                        checked={userRole.roleId === 'viewer'}
                        onChange={(e) => handleRoleChange(userRole.accountId, e.target.value)}
                     />
                  </div>
               </div>
            ))}
         </div>
      </div>
   )
}

export default AccessPermissions
