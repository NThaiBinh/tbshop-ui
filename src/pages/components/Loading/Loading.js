import Modal from '../../../components/Layouts/components/Modal/Modal'

function Loading({ isVisible }) {
   if (!isVisible) return null // Không hiển thị nếu isVisible = false

   return (
      <Modal>
         <div className="loading-modal-overlay">
            <div className="loading-modal-content">
               <div className="spinner"></div>
               <p>Loading, please wait...</p>
            </div>
         </div>
      </Modal>
   )
}

export default Loading
