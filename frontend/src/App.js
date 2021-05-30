import { useStore } from 'effector-react';
import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './App.css';
import { ProductsMainPage } from './features/products/page';
import { $token } from './features/users/api/model';
import AuthorizationWindow from './features/users/page/authorization';

export let cacheToken;

function App() {
  const [user, setUser] = useState(null);
  const token = useStore($token);

  useEffect(() => {
    if (token.user) {
      setUser(token.user);
      cacheToken = token.token;
    }
  }, [token]);

  return (
    <div className='App'>
      {user ? user : ''}
      {user ? <ProductsMainPage /> : <AuthorizationWindow />}
    </div>
  );
}

export default App;
