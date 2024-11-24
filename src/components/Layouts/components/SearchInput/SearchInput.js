import { useState } from 'react'
import cssSearchInput from './SearchInput.module.css'
import clsx from 'clsx'
function SearchInput() {
   const [clearTextBtn, setClearTextBtn] = useState(false)
   const [searchValue, setSearchValue] = useState('')

   function handleClear() {
      setClearTextBtn(false)
      setSearchValue('')
   }

   return (
      <div className={cssSearchInput.body}>
         <i className="fa-solid fa-magnifying-glass icon-search"></i>
         <input
            value={searchValue}
            className={cssSearchInput.searchInput}
            placeholder="Bạn cần tìm gì?"
            onChange={(e) => {
               setClearTextBtn(e.target.value !== '')
               setSearchValue(e.target.value)
            }}
         />
         <div
            className={clsx(cssSearchInput.clearText, {
               [cssSearchInput.visible]: clearTextBtn,
            })}
            onClick={handleClear}
         >
            x
         </div>
      </div>
   )
}

export default SearchInput
