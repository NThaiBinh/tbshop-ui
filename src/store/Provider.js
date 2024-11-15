import { useReducer } from 'react'
import Context from './StoreContext'
import reducer, { initState } from './reducer'
function Provider({ children }) {
   const [state, dispatch] = useReducer(reducer, initState)
   return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

export default Provider
