
import './App.css'
import useAOS from './hooks/useAOS';
import Home from './pages/Home';

function App() {

  useAOS()

  return (
    <>
      <Home />
    </>
  )
}

export default App
