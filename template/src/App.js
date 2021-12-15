import './App.css';
import Header from './components/header';
import Home from './pages/Home';
import Cart from './pages/Cart'
import ProductScreen from './pages/ProductScreen';
import { BrowserRouter, Route } from 'react-router-dom';
import Signin from './pages/signin';
import Signup from './pages/signup';
import Shipping from './pages/shipping';
import Placeorder from './pages/placeorder';
import OrderScreen from './pages/orderScreen';
import OrderHistory from './pages/orderHistory';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <main>
          <Route path="/cart/:id?" component={Cart}></Route>
          <Route path="/products/:id" component={ProductScreen}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/shipping" component={Shipping}></Route>
          <Route path="/placeorder" component={Placeorder}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistory}></Route>
          <Route exact path="/" component={Home}></Route>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;