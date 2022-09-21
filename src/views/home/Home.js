import '../../assets/index.css';
import HeaderMain from '../headers/header';

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <HeaderMain/>
      </header>
      <div className="container">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="/other_page"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </div>
    </div>
  );
}

export default Home;