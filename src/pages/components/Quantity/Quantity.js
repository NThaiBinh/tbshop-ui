import cssQuantity from './Quantity.module.css'

function Quantity({ quantity, onIncrease, onDecrease, onChange }) {
   function handleKeyDown(e) {
      if (
         !/[0-9]/.test(e.key) && // Phím số
         e.key !== 'Backspace' && // Xóa
         e.key !== 'ArrowLeft' && // Di chuyển trái
         e.key !== 'ArrowRight' && // Di chuyển phải
         e.key !== 'Tab' // Chuyển đổi focus
      ) {
         e.preventDefault()
      }
   }

   return (
      <div className={cssQuantity.wrapper}>
         <button className={cssQuantity.btnChangeQuantity} onClick={onDecrease}>
            <i className="fa-solid fa-minus"></i>
         </button>
         <input
            className={cssQuantity.productQuantity}
            type="text"
            value={quantity}
            onChange={onChange}
            onKeyDown={handleKeyDown}
         />
         <button className={cssQuantity.btnChangeQuantity} onClick={onIncrease}>
            <i className="fa-solid fa-plus"></i>
         </button>
      </div>
   )
}

export default Quantity
