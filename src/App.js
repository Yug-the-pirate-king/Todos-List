import logo from './logo.svg';
import './App.css';
import Header from './myComponents/header';
import { Todos } from './myComponents/todo';
import Footer from './myComponents/footer';
function App() {
  return ( <>
  <Header/>
  <Todos/>
  <Footer/>
  </>
   );
}

export default App;
