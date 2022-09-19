// import { useState } from "react";
// import Auth from "./api/Auth";

// function App() {

//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")

//   const login = async(e) => {
//     e.preventDefault();
//     let response = await new Auth().login({username, password})
//     console.log({response})
//     if(response.ok){
//       alert("Success")
//     }else{
//       alert(response.data.errorMessage)
//     }
//   }

//   return (
//     <div className="App">
//       <form onSubmit={login}>
//         <input type="text" name="username" onChange={(e) => setUsername(e.target.value)}></input>
//         <input type="password" name="password" onChange={(e) => setPassword(e.target.value)}></input>
//         <input type="submit" ></input>
//       </form>
//     </div>
//   );
// }

// export default App;

import React from "react";
import Routes from "../src/routes/Routes";

export default function App() {
  return (
      <Routes/>
  );
}
