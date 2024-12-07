import { Route, Routes } from "react-router-dom";
import routes from './constants/routes';
import Home from './views/pages/home/Home';

function App() {
  return (
    <Routes>
      <Route
        path={`${routes.ROOT}/*`}
        element={<Home />}
      />
    </Routes>
  )
}

export default App
