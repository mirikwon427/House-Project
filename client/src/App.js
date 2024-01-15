import React from 'react';
// 리액트 컴포넌트들을 Provider 안에 넣으면 컴포넌트에서 store에 접근이 가능해진다.
import { Provider } from 'react-redux';
import store from './redux/configureStore';
import DefaultRouter from './routes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DefaultRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
