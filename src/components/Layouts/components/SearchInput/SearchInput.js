import { useState, useContext } from 'react'
import cssSearchInput from './SearchInput.module.css'
import clsx from 'clsx'
import StoreContext from '../../../../store/StoreContext'
import { setSearchValue } from '../../../../store/actions'
function SearchInput(props) {
   const [clearTextBtn, setClearTextBtn] = useState(false)
   const [state, dispatch] = useContext(StoreContext)

   function handleClear() {
      setClearTextBtn(false)
      dispatch(setSearchValue(''))
   }

   return (
      <div className={cssSearchInput.body}>
         <i className="fa-solid fa-magnifying-glass icon-search"></i>
         <input
            value={state.searchValue}
            className={cssSearchInput.searchInput}
            placeholder="Bạn cần tìm gì?"
            onChange={(e) => {
               setClearTextBtn(e.target.value !== '')
               dispatch(setSearchValue(e.target.value))
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
