import { useEffect } from 'react';
import { BackendCommunication } from './api/BackendCommunication.ts';

function App() {
  useEffect(() => {
    BackendCommunication.getVersion().then((version) => {
      console.log(version);
    });
  }, []);
  return <>asdasd</>;
}

export default App;
