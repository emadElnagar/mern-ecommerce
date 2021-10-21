import './App.css';
import Header from './components/header';
import Home from './pages/Home';
import ProductScreen from './pages/ProductScreen';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main>
          <Route path="/products/:id" component={ProductScreen}></Route>
          <Route exact path="/" component={Home}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;