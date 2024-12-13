import { useEffect, useState } from 'react'
import styles from './SearchInput.module.css'
import clsx from 'clsx'
import { searchProduct } from '../../../../services/searchServices'
import { api, imageApi } from '../../../../services'
import { Link } from 'react-router-dom'
import currencyFormat from '../../../../utils/currencyFormat'
function SearchInput() {
   const [clearTextBtn, setClearTextBtn] = useState(false)
   const [searchValue, setSearchValue] = useState('')
   const [searchResults, setSearchResults] = useState([])

   useEffect(() => {
      let timerId
      if (searchValue.length > 0) {
         timerId = setTimeout(async () => {
            const results = await searchProduct(searchValue)
            if (results.code === 'SS' && results.data.length > 0) {
               setSearchResults(results.data)
            } else {
               setSearchResults([])
            }
         }, 800)
      } else {
         setSearchResults([])
      }
      return () => clearTimeout(timerId)
   }, [searchValue])

   function handleClear() {
      setClearTextBtn(false)
      setSearchValue('')
   }

   return (
      <div className={styles.body}>
         <i className="fa-solid fa-magnifying-glass icon-search"></i>
         <input
            value={searchValue}
            className={styles.searchInput}
            placeholder="Bạn cần tìm gì?"
            onChange={(e) => {
               setClearTextBtn(e.target.value !== '')
               setSearchValue(e.target.value)
            }}
         />
         <div
            className={clsx(styles.clearText, {
               [styles.visible]: clearTextBtn,
            })}
            onClick={handleClear}
         >
            x
         </div>
         <div className={clsx(styles.searchResult, { [styles.visible]: searchValue !== '' })}>
            <div className={styles.searchResultHeader}>
               <h4>Kết quả tìm kiếm cho: {searchValue}</h4>
            </div>
            <div className={styles.searchResultBody}>
               {searchResults.length > 0 &&
                  searchResults.map((searchResult, index) => (
                     <Link
                        key={index}
                        to={`/product/detail?productId=${searchResult.MASP}&productConfigurationId=${searchResult.MACAUHINH}`}
                        className={styles.result}
                     >
                        <img className={styles.productImg} src={`${imageApi}/${searchResult.ANHSP}`} />
                        <div className={styles.productInfo}>
                           <h3 className={styles.productName}>{searchResult.TENSP}</h3>
                           <h4 className={styles.productPrice}>{currencyFormat(searchResult.GIASP)}</h4>
                        </div>
                     </Link>
                  ))}
            </div>
         </div>
      </div>
   )
}

export default SearchInput
