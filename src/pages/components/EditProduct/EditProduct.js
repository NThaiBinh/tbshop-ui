import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './EditProduct.module.css'
import Modal from '../../../components/Layouts/components/Modal/Modal'
import EditMultipleImages from '../EditMultipleImages/EditMultipleImages'
import InputValue from '../InputValue/InputValue'
import SelectOptions from '../SelectOptions/SelectOptions'
import { getAllCategories } from '../../../services/categoryServices'
import { getAllManufacs } from '../../../services/manufacturerServices'
import { getAllProductTypes } from '../../../services/productTypeServices'
import { getProductInfoWidthoutConfig } from '../../../services/productServices'
import { objProductImages, objProductInfo, objProductConfiguration } from '../../Dashbroad/Product/objectProduct'

function EditProduct({
   isCreate,
   productImages,
   setProductImages,
   productDetails,
   setProductDetails,
   productColors = [],
   setProductColors,
   handleSubmit,
}) {
   const navigate = useNavigate()
   const [manufacs, setManufacs] = useState([])
   const [categories, setCategories] = useState([])
   const [productTypes, setProductTypes] = useState([])
   const [isAddConfig, setIsAddConfig] = useState(false)
   const [isDisableInput, setIsDisableInput] = useState(false)
   const [productHandleId, setProductHandleId] = useState('')
   const [colorPickerValue, setColorPickerValue] = useState('')
   const [colorName, setColorName] = useState('')

   useEffect(() => {
      async function handleGetValueSelect() {
         const categories = await getAllCategories()
         if (categories.code === 'SS') {
            setCategories(
               categories.data.map((category) => {
                  return {
                     valueMember: category.categoryId,
                     displayMember: category.name,
                  }
               }),
            )
         }

         const productTypes = await getAllProductTypes()
         if (productTypes.code === 'SS') {
            setProductTypes(
               productTypes.data.map((productType) => {
                  return {
                     valueMember: productType.productTypeId,
                     displayMember: productType.name,
                  }
               }),
            )
         }

         const manufacs = await getAllManufacs()
         if (manufacs.code === 'SS') {
            setManufacs(
               manufacs.data.map((manufac) => {
                  return {
                     valueMember: manufac.manufacId,
                     displayMember: manufac.name,
                  }
               }),
            )
         }
      }
      handleGetValueSelect()
   }, [])

   function handleAddColor(e) {
      setProductColors([
         ...productColors,
         { id: productColors.length, color: colorPickerValue, name: colorName, state: 'add' },
      ])
      setColorName('')
   }

   function handleDeleteColor(e) {
      setProductColors(
         productColors.map((productColor, index) => {
            if (index.toString() === e.target.id) {
               return {
                  ...productColor,
                  state: 'delete',
               }
            }
            return productColor
         }),
      )
   }

   useEffect(() => {
      if (isAddConfig) {
         async function handleGetProductInfoWithoutConfig(productHandleId) {
            if (productHandleId) {
               const productInfo = await getProductInfoWidthoutConfig(productHandleId)
               if (productInfo.code === 'SS') {
                  setProductImages(productInfo.data.productImages)
                  setProductDetails({
                     productInfo: productInfo.data.productInfo,
                     productConfiguration: {
                        ...productDetails.productConfiguration,
                        productId: productHandleId,
                     },
                  })
               } else {
                  setProductImages(objProductImages)
                  setProductDetails({
                     productInfo: objProductInfo,
                     productConfiguration: objProductConfiguration,
                  })
               }
            }
         }
         handleGetProductInfoWithoutConfig(productHandleId)
      } else {
         setProductImages(objProductImages)
         setProductDetails({
            productInfo: objProductInfo,
            productConfiguration: objProductConfiguration,
         })
      }
   }, [isAddConfig, productHandleId])

   function handleExit() {
      navigate(-1)
   }

   return (
      <Modal>
         <EditMultipleImages
            images={productImages}
            setImages={setProductImages}
            handleExit={handleExit}
            handleSubmit={handleSubmit}
            isDisableInput={isDisableInput}
         >
            <div className={styles.columnLeft}>
               <div className={styles.columnHeader}>
                  <h4 className={styles.title}>THÔNG TIN SẢN PHẨM</h4>
               </div>
               <div className={styles.columnBody}>
                  <div className={styles.groupColumn}>
                     <div className={styles.input}>
                        <SelectOptions
                           id="manufacturer"
                           title="Nhà sản xuất:"
                           values={manufacs}
                           defaultValue={productDetails.productInfo.manufacId}
                           isRequire={true}
                           isDisabled={isDisableInput}
                           handleOptionChange={(e) => {
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo, manufacId: e.target.value },
                                 productConfiguration: { ...productDetails.productConfiguration },
                              })
                           }}
                        />
                     </div>
                     <div className={styles.input}>
                        <SelectOptions
                           id="category"
                           title="Danh mục:"
                           values={categories}
                           defaultValue={productDetails.productInfo.categoryId}
                           isRequire={true}
                           isDisabled={isDisableInput}
                           handleOptionChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo, categoryId: e.target.value },
                                 productConfiguration: { ...productDetails.productConfiguration },
                              })
                           }
                        />
                     </div>
                     <div className={styles.input}>
                        <SelectOptions
                           id="productType"
                           title="Loại sản phẩm:"
                           values={productTypes}
                           defaultValue={productDetails.productInfo.productTypeId}
                           isRequire={true}
                           isDisabled={isDisableInput}
                           handleOptionChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo, productTypeId: e.target.value },
                                 productConfiguration: { ...productDetails.productConfiguration },
                              })
                           }
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="name"
                           title="Tên sản phẩm:"
                           value={productDetails.productInfo.name}
                           isDisabled={isDisableInput}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo, name: e.target.value },
                                 productConfiguration: { ...productDetails.productConfiguration },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="price"
                           title="Giá sản phẩm:"
                           value={productDetails.productInfo.price}
                           type="number"
                           min="0"
                           isDisabled={isDisableInput}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo, price: e.target.value },
                                 productConfiguration: { ...productDetails.productConfiguration },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="quantity"
                           title="Số lượng tồn:"
                           value={productDetails.productInfo.quantity}
                           type="number"
                           min="0"
                           isDisabled={isDisableInput}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo, quantity: e.target.value },
                                 productConfiguration: { ...productDetails.productConfiguration },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                  </div>
               </div>
            </div>
            <div className={styles.columnRight}>
               <div className={styles.columnHeader}>
                  <h4 className={styles.title}>CẤU HÌNH SẢN PHẨM</h4>
               </div>
               <div className={styles.columnBody}>
                  <div className={styles.groupColumn}>
                     {isCreate && (
                        <div className={styles.groupCheckBox}>
                           <input
                              id="addConfig"
                              type="checkbox"
                              checked={isAddConfig}
                              onChange={() => {
                                 setIsAddConfig(!isAddConfig)
                                 setIsDisableInput(!isDisableInput)
                              }}
                           />
                           <label htmlFor="addConfig" className={styles.labelAddConfig}>
                              Thêm cấu hình cho sản phẩm có sẳn
                           </label>
                           {isAddConfig && (
                              <div className={styles.input}>
                                 <InputValue
                                    id="productHandleId"
                                    title="Nhập mã sản phẩm cần thêm:"
                                    value={productHandleId}
                                    onChange={(e) => setProductHandleId(e.target.value)}
                                    isRequire={true}
                                 />
                              </div>
                           )}
                        </div>
                     )}
                     <div className={styles.input}>
                        <InputValue
                           id="cpu"
                           title="CPU:"
                           value={productDetails.productConfiguration.cpu}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    cpu: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="gpu"
                           title="GPU:"
                           value={productDetails.productConfiguration.gpu}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    gpu: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="cpuSpeed"
                           title="Tốc độ CPU:"
                           value={productDetails.productConfiguration.cpuSpeed}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    cpuSpeed: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="maxSpeed"
                           title="Tốc độ tối đa:"
                           value={productDetails.productConfiguration.maxSpeed}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    maxSpeed: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="core"
                           title="Số nhân:"
                           value={productDetails.productConfiguration.core}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    core: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="threads"
                           title="Số luồng:"
                           value={productDetails.productConfiguration.threads}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    threads: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="ram"
                           title="RAM:"
                           value={productDetails.productConfiguration.ram}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    ram: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="ramType"
                           title="Loại RAM:"
                           value={productDetails.productConfiguration.ramType}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    ramType: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="cacheCPU"
                           title="Bộ nhớ đệm:"
                           value={productDetails.productConfiguration.caheCPU}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    cacheCPU: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="operatingSystem"
                           title="Hệ điều hành:"
                           value={productDetails.productConfiguration.operatingSystem}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    operatingSystem: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="monitor"
                           title="Màn hình:"
                           value={productDetails.productConfiguration.monitor}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    monitor: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="resolution"
                           title="Độ phân giải:"
                           value={productDetails.productConfiguration.resolution}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    resolution: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="refreshRate"
                           title="Tầng số quét:"
                           value={productDetails.productConfiguration.refreshRate}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    refreshRate: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="brightness"
                           title="Độ sáng:"
                           value={productDetails.productConfiguration.brightness}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    brightness: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="colorCoverage"
                           title="Độ phủ màu:"
                           value={productDetails.productConfiguration.colorCoverage}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    colorCoverage: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="monitorTechnology"
                           title="Công nghệ màn hình:"
                           value={productDetails.productConfiguration.monitorTechnology}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    monitorTechnology: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="port"
                           title="Cổng giao tiếp:"
                           value={productDetails.productConfiguration.port}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    port: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     {!isAddConfig && (
                        <div className={styles.input}>
                           <InputValue
                              id="wireless"
                              title="Kết nối không dây:"
                              value={productDetails.productConfiguration.wireless}
                              onChange={(e) =>
                                 setProductDetails({
                                    productInfo: { ...productDetails.productInfo },
                                    productConfiguration: {
                                       ...productDetails.productConfiguration,
                                       wireless: e.target.value,
                                    },
                                 })
                              }
                              isRequire={true}
                           />
                           <InputValue
                              id="storageCapacity"
                              title="Dung lượng:"
                              value={productDetails.productConfiguration.storageCapacity}
                              onChange={(e) =>
                                 setProductDetails({
                                    productInfo: { ...productDetails.productInfo },
                                    productConfiguration: {
                                       ...productDetails.productConfiguration,
                                       storageCapacity: e.target.value,
                                    },
                                 })
                              }
                              isRequire={true}
                           />
                           <InputValue
                              id="availableStoregaCapatity"
                              title="Khả dụng:"
                              value={productDetails.productConfiguration.availableStorageCapacity}
                              onChange={(e) =>
                                 setProductDetails({
                                    productInfo: { ...productDetails.productInfo },
                                    productConfiguration: {
                                       ...productDetails.productConfiguration,
                                       availableStorageCapacity: e.target.value,
                                    },
                                 })
                              }
                              isRequire={true}
                           />
                        </div>
                     )}
                  </div>
                  <div className={styles.groupColumn}>
                     {isAddConfig && (
                        <div className={styles.input}>
                           <InputValue
                              id="wireless"
                              title="Kết nối không dây:"
                              value={productDetails.productConfiguration.wireless}
                              onChange={(e) =>
                                 setProductDetails({
                                    productInfo: { ...productDetails.productInfo },
                                    productConfiguration: {
                                       ...productDetails.productConfiguration,
                                       wireless: e.target.value,
                                    },
                                 })
                              }
                              isRequire={true}
                           />
                           <InputValue
                              id="storageCapacity"
                              title="Dung lượng:"
                              value={productDetails.productConfiguration.storageCapacity}
                              onChange={(e) =>
                                 setProductDetails({
                                    productInfo: { ...productDetails.productInfo },
                                    productConfiguration: {
                                       ...productDetails.productConfiguration,
                                       storageCapacity: e.target.value,
                                    },
                                 })
                              }
                              isRequire={true}
                           />
                           <InputValue
                              id="availableStoregaCapatity"
                              title="Khả dụng:"
                              value={productDetails.productConfiguration.availableStorageCapacity}
                              onChange={(e) =>
                                 setProductDetails({
                                    productInfo: { ...productDetails.productInfo },
                                    productConfiguration: {
                                       ...productDetails.productConfiguration,
                                       availableStorageCapacity: e.target.value,
                                    },
                                 })
                              }
                              isRequire={true}
                           />
                        </div>
                     )}
                     <div className={styles.input}>
                        <InputValue
                           id="frontCamera"
                           title="Camera trước:"
                           value={productDetails.productConfiguration.frontCamera}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    frontCamera: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="backCamera"
                           title="Camerasau:"
                           value={productDetails.productConfiguration.backCamera}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    backCamera: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="frontCameraTechnology"
                           title="Công nghệ camera trước:"
                           value={productDetails.productConfiguration.frontCameraTechnology}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    frontCameraTechnology: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="backCameraTechnology"
                           title="Công nghệ camera sau:"
                           value={productDetails.productConfiguration.backCameraTechnology}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    backCameraTechnology: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <InputValue
                           id="charging"
                           title="Sạc:"
                           value={productDetails.productConfiguration.charging}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    charging: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="keyboardLight"
                           title="Đèn bàn phím:"
                           value={productDetails.productConfiguration.keyboardLight}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    keyboardLight: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="material"
                           title="Chất liệu:"
                           value={productDetails.productConfiguration.material}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    material: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                        <InputValue
                           id="weight"
                           title="Khối lượng:"
                           value={productDetails.productConfiguration.weight}
                           onChange={(e) =>
                              setProductDetails({
                                 productInfo: { ...productDetails.productInfo },
                                 productConfiguration: {
                                    ...productDetails.productConfiguration,
                                    weight: e.target.value,
                                 },
                              })
                           }
                           isRequire={true}
                        />
                     </div>
                     <div className={styles.input}>
                        <div className={styles.productColor}>
                           <div className={styles.groupChooseColor}>
                              <input
                                 id="colorPicker"
                                 className={styles.colorPicker}
                                 type="color"
                                 value={colorPickerValue}
                                 onChange={(e) => setColorPickerValue(e.target.value)}
                              />{' '}
                              Chọn màu sản phẩm, Tên màu:
                              <input
                                 id="colorName"
                                 className={styles.productColorName}
                                 value={colorName}
                                 onChange={(e) => setColorName(e.target.value)}
                              />
                              <button className={styles.btnChooseColor} onClick={handleAddColor}>
                                 Chọn
                              </button>
                           </div>
                           <div className={styles.groupProductColor}>
                              {productColors?.map((productColor, index) => {
                                 if (productColor.state !== 'delete') {
                                    return (
                                       <div key={index} className={styles.groupColor}>
                                          <div
                                             className={styles.color}
                                             style={{ backgroundColor: `${productColor.color}` }}
                                          ></div>
                                          <strong>{productColor.name}</strong>
                                          <span id={index} onClick={handleDeleteColor}>
                                             x
                                          </span>
                                       </div>
                                    )
                                 }
                              })}
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </EditMultipleImages>
      </Modal>
   )
}

export default EditProduct
