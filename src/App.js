import styled from "styled-components";
import Input from "./components/Input";
import List from "./components/List";
import Playbar from "./components/Playbar";

const StyledApp = styled.div`
  background-color: var(--color-bg);
`;

function App() {
  return (
    <StyledApp>
      <Input />
      <List />
      <Playbar />
    </StyledApp>
  );
}

export default App;
