import { useEffect } from 'react';
import { BackendCommunication } from './api/BackendCommunication.ts';

function App() {
  useEffect(() => {
    async function test() {
      const data = await BackendCommunication.getUserData();
      console.log(data);
    }
    test();
  }, []);
  return <>asdasd</>;
}

export default App;
