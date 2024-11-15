import DropFile from '../DropFile/DropFile'
import cssEditMultipleImages from './EditMultipleImages.module.css'
import ButtonMedium from '../ButtonMedium/ButtonMedium'

function EditMultipleImages({ children, images, setImages, handleSubmit, handleExit, isDisableInput }) {
   function updateImages(imageArr = [], id, file) {
      return imageArr.map((image, index) => {
         if (index === id)
            return {
               imageId: image.imageId || file.name,
               image: file,
            }
         return image
      })
   }

   function handleDropDetailImage(id, file) {
      setImages(updateImages(images, id, file))
   }

   function handleDetailImageChange(id, file) {
      setImages(updateImages(images, id, file))
   }

   return (
      <div className={cssEditMultipleImages.wrapper}>
         <div className={cssEditMultipleImages.header}>
            <h3>THÔNG TIN SẢN PHẨM</h3>
         </div>
         <div className={cssEditMultipleImages.container}>
            <div className={cssEditMultipleImages.productImages}>
               <div className={cssEditMultipleImages.mainProductImage}>
                  <DropFile
                     id={0}
                     image={images[0].image}
                     handleDropFile={handleDropDetailImage}
                     handleImageChange={handleDetailImageChange}
                     isDisabled={isDisableInput}
                  />
               </div>
               <div className={cssEditMultipleImages.detailProductImages}>
                  <div className={cssEditMultipleImages.groupImageDetail}>
                     <DropFile
                        id={1}
                        image={images[1].image}
                        handleDropFile={handleDropDetailImage}
                        handleImageChange={handleDetailImageChange}
                        isDisabled={isDisableInput}
                     />
                  </div>
                  <div className={cssEditMultipleImages.groupImageDetail}>
                     <DropFile
                        id={2}
                        image={images[2].image}
                        handleDropFile={handleDropDetailImage}
                        handleImageChange={handleDetailImageChange}
                        isDisabled={isDisableInput}
                     />
                  </div>
                  <div className={cssEditMultipleImages.groupImageDetail}>
                     <DropFile
                        id={3}
                        image={images[3].image}
                        handleDropFile={handleDropDetailImage}
                        handleImageChange={handleDetailImageChange}
                        isDisabled={isDisableInput}
                     />
                  </div>
                  <div className={cssEditMultipleImages.groupImageDetail}>
                     <DropFile
                        id={4}
                        image={images[4].image}
                        handleDropFile={handleDropDetailImage}
                        handleImageChange={handleDetailImageChange}
                        isDisabled={isDisableInput}
                     />
                  </div>
               </div>
            </div>
            <div className={cssEditMultipleImages.content}>{children}</div>
            <div className={cssEditMultipleImages.footer}>
               <ButtonMedium title="Thoát" type="exit" handleClick={handleExit} />
               <ButtonMedium title="Đồng ý" type="submit" handleClick={handleSubmit} />
            </div>
         </div>
      </div>
   )
}

export default EditMultipleImages
