import Header from './components/Header/Header';
import BeerTable from './components/BeerTable/BeerTable';
import ErrorBoundary from './components/ErrorBoundary';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Header />
      <BeerTable />
      </ErrorBoundary>
    </div>
  );
}

export default App;
