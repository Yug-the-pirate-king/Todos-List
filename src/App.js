import './App.css';
import Header from './myComponents/header';
import Todos from './myComponents/todos';
import Footer from './myComponents/footer';

function App() {

  let todos = [
    {
      sno:1,
      title:"Go to the market",
      desc:"You need to go to the market to get this job done."
    },
    {
      sno:2,
      title:"Go to the mall",
      desc:"You need to go to the mall to get this job done."
    },
    {
      sno:3,
      title:"Go to the school",
      desc:"You need to go to the school to get this job done."
    }
  ] 
  return ( <>
  <Header/>
  <Todos todos={todos} ONDelete={true}/>
  <Footer/>
  </>
   );
}

export default App;
