import { useAuth } from "./context/AuthProvider";
import axios from 'axios';

export const Landing = () => {

  return (
    <>
      <h2>Landing (Protected)</h2>

      {/* REMOVED FOR SECURITY PURPOSES? */}
      {/* <div> Authenticated as {value.token}</div> */}
    </>
  );
};