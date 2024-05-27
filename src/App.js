import './App.css';
import CaseCards from './components/CaseCards';
import CasesChart from './components/CasesChart';
import CountryOption from './components/CountryOption';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
    <div id='container'>
      <Header/>
      <CaseCards/>
      <CountryOption/>
      <CasesChart/>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
