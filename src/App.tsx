import UserTable from "Components/UserTable";
import "./App.css";
import "antd/dist/antd.css";

function App() {
  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="mt-10">
          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default App;
