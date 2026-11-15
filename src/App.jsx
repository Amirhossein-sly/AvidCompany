import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import useAOS from './hooks/useAOS';
import ScrollManager from './components/ScrollManager';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';

function App() {

  useAOS()

  return (
    <>
      <ScrollManager />
      <Routes>
        {/* هدر و فوتر مشترک برای همه‌ی صفحه‌ها */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
        </Route>
        {/* آدرس‌های ناشناخته به صفحه اصلی برمی‌گردند */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App