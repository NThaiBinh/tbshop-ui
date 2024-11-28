function positionMapper(positionInfo) {
   return {
      positionId: positionInfo.MACV,
      name: positionInfo.TENCV,
   }
}

export { positionMapper }
