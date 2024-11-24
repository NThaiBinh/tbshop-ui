import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import StoreProvider from './store/Provider'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   <BrowserRouter>
      <GlobalStyles>
         <StoreProvider>
            <App />
         </StoreProvider>
      </GlobalStyles>
   </BrowserRouter>,
)
reportWebVitals()
