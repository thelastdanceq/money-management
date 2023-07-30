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

  async function login() {
    await BackendCommunication.loginViaGoogle();

  }
  return <>
    <button onClick={login}> Login </button>
  </>;
}

export default App;
