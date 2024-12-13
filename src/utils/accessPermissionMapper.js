function accessPermissionMapper(userRolesInfo) {
   return {
      userId: userRolesInfo.MANV,
      accountId: userRolesInfo.MATK,
      userName: userRolesInfo.TENDN,
      name: userRolesInfo.TENNV,
      positionName: userRolesInfo.TENCV,
      roleId: userRolesInfo.MAVAITRO,
      accountType: userRolesInfo.LOAITAIKHOAN,
   }
}

export { accessPermissionMapper }
