import './App.css';
import CaseCards from './components/CaseCards';
import CasesChart from './components/CasesChart';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header/>
      <CaseCards/>
      <CasesChart/>
      <Footer/>
    </div>
  );
}

export default App;
