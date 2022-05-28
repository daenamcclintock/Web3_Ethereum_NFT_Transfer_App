import { Navbar, Crypto, Footer, NFTs, Transactions } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Crypto />
    </div>
    <NFTs />
    <Transactions />
    <Footer />
  </div>
);

export default App;
