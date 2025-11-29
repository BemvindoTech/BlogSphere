
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import index from './views/core/Index.jsx';
import MainWrapper from "../src/layouts/MainWrapper.jsx";
import Index from "./views/core/Index.jsx";

function App() {

  return (
      <>
      <BrowserRouter>
          <MainWrapper>
             <Routes>
                 <Route path="/" element={<Index />} />
             </Routes>
          </MainWrapper>
      </BrowserRouter></>
  )

}

export default App
