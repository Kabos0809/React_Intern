import { Route, BrowserRouter } from 'react-router-dom'
import Login from 'Login'
import App from 'App'

;<BrowserRouter>
  <div>
    <Route path="/">
      <App />
    </Route>
    <Route path="/login">
      <Login />
    </Route>
  </div>
</BrowserRouter>
