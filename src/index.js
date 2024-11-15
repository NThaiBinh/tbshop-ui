import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import StoreProvider from './store/Provider'
import GlobalStyles from './components/GlobalStyles/GlobalStyles'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
   //<React.StrictMode>
   <BrowserRouter>
      <GlobalStyles>
         <StoreProvider>
            <App />
         </StoreProvider>
      </GlobalStyles>
   </BrowserRouter>,
   // </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
