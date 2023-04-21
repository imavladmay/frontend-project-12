import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageNotFound from './PageNotFound';
import SignInPage from './SignInPage';
import routes from '../routes/routes';

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <Routes>
        <Route path={routes.mainPage()} element={<SignInPage />} />
        <Route path={routes.signInPage()} element={<SignInPage />} />
        <Route path={routes.pageNotFound()} element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
