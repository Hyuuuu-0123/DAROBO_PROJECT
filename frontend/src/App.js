// import React, { useState } from "react";
// import Login from "./Login";
// import Dashboard from "./Dashboard"; // this now contains tabs + Rooms
// import "./App.css";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="app-container">
//       <h1 className="app-title">Robot Delivery Web Control</h1>

//       {isLoggedIn ? (
//         // ===== SHOW TABBED DASHBOARD AFTER LOGIN =====
//         <Dashboard onLogout={() => setIsLoggedIn(false)} />
//       ) : (
//         // ===== SHOW LOGIN FIRST =====
//         <div className="cards-container">
//           <div className="card">
//             <Login onLoginSuccess={() => setIsLoggedIn(true)} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import Login from "./Login";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="app-container">
      {/* <h1 className="app-title">Robot Delivery Web Control</h1> */}

      {isLoggedIn ? (
        <Dashboard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <div className="cards-container">
          <div className="card">
            <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

