import cssInfoCunstomer from './CustomerInfo.module.css'
import defaultAvatar from '../images/default_avatar.jpg'
const imageLink = 'http://localhost:3001'

function InfoCustomer(props) {
   return (
      <div className={cssInfoCunstomer.info}>
         <h2 className="user-name">{props.name}</h2>
         <img
            className={cssInfoCunstomer.userImg}
            src={props.image ? `${imageLink}/images/${props.image}` : defaultAvatar}
         />
      </div>
   )
}

export default InfoCustomer
