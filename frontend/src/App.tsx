import { useEffect } from 'react';
import { BackendCommunication } from './api/BackendCommunication.ts';
import { setAccessToken } from "./api/token.ts";

function App() {
  useEffect(() => {
    async function test() {
      const data = await BackendCommunication.getUserData();
      console.log(data);
    }
    test();
  }, []);

  useEffect(() => {
    function handleInit() {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');

      if (token) {
        setAccessToken(token);
        localStorage.setItem('jwtToken', token);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    handleInit();

  }, []);

  async function login() {
    await BackendCommunication.loginViaGoogle();

  }
  return <>
    <button onClick={login}> Login </button>
  </>;
}

export default App;
