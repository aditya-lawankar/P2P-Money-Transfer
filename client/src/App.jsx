import { Welcome, Transactions } from "./components";
import AddressBook from "./components/AddressBook";
import GasPrice from "./components/GasPrice";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Welcome />
    </div>
    <GasPrice />
    <AddressBook />
    <Transactions />
  </div>
);

export default App;
