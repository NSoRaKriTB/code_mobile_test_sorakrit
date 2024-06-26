import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import './index.css'
import './utils/axiosConfig.tsx'
import { Provider } from 'react-redux';
import store from './redux/store.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <Router />
  </Provider>,
)
