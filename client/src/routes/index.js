import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Main from '../pages/index';

function DefaultRouter() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/">
            <Main />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default DefaultRouter;
