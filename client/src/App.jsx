import { Navbar, Welcome, Footer, NFTs, Transactions } from "./components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
    </div>
    <NFTs />
    <Transactions />
    <Footer />
  </div>
);

export default App;
