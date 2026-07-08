import './App.css';
import Header from './myComponents/header';
import Todos from './myComponents/todos';
import Footer from './myComponents/footer';

const TODOS = [
  {
    sno: 1,
    title: 'Go to the market',
    desc: 'You need to go to the market to get this job done.'
  },
  {
    sno: 2,
    title: 'Go to the mall',
    desc: 'You need to go to the mall to get this job done.'
  },
  {
    sno: 3,
    title: 'Go to the school',
    desc: 'You need to go to the school to get this job done.'
  }
];

const App = () => (
  <>
    <Header />
    <Todos todos={TODOS} ONDelete={true} />
    <Footer />
  </>
);

export default App;