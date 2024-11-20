import clsx from 'clsx'
import cssSlider from './Slider.module.css'
import { useEffect, useState } from 'react'
import { imageApi } from '../../../services'

function Slider({ imageArray = [], widthSlide, maxWidthSlide }) {
   const [position, setPosition] = useState(0)
   useEffect(() => {
      const timerId = setTimeout(() => {
         setPosition((prev) => {
            if (prev - widthSlide < maxWidthSlide) {
               return 0
            } else {
               return prev - widthSlide
            }
         })
      }, 3000)
      return () => clearTimeout(timerId)
   }, [position, widthSlide, maxWidthSlide])

   function handlePrevPanel() {
      setPosition((prev) => {
         if (prev + widthSlide > 0) return maxWidthSlide
         return prev + widthSlide
      })
   }

   function handleNexPanel() {
      setPosition((prev) => {
         if (prev - widthSlide < maxWidthSlide) {
            return 0
         } else {
            return prev - widthSlide
         }
      })
   }

   return (
      <div className={cssSlider.slider}>
         <button className={clsx(cssSlider.slideSwitch, cssSlider.prev)} onClick={handlePrevPanel}>
            <i className="fa-solid fa-chevron-left"></i>
         </button>
         <div className={cssSlider.slideList}>
            <div className={cssSlider.slide} style={{ transform: `translateX(${position}px)` }}>
               {imageArray.map((image, index) => (
                  <img
                     key={index}
                     className={cssSlider.imagePanel}
                     src={`${imageApi}/${image}`}
                     alt="Ảnh sale"
                     style={{ width: `${widthSlide}px` }}
                  />
               ))}
            </div>
         </div>
         <button className={clsx(cssSlider.slideSwitch, cssSlider.next)} onClick={handleNexPanel}>
            <i className="fa-solid fa-chevron-right"></i>
         </button>
      </div>
   )
}

export default Slider
