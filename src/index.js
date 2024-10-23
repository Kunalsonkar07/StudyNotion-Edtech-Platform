import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { rootReducer } from "./reducer"
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
// import { Toast } from "react-hot-toast";
// import { Toast } from "react-toastify/dist/components";
import { Toaster } from "react-hot-toast";

const store = configureStore({
    reducer:rootReducer ,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <ReactDOM>

    <Provider store= {store}>
      <BrowserRouter>
          <App/>
          <Toaster></Toaster>
          {/* <Toast></Toast> */}
      </BrowserRouter>
    </Provider>

);
