import { useContext } from 'react'
import StoreContext from '../store/StoreContext'

function useStore() {
   const store = useContext(StoreContext)
   return store
}

export { useStore }
