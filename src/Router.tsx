import { Route, Routes } from "react-router-dom";
import React from "react";
import { Create } from "./components/create/Create";
import { List } from "./components/list/List";

export const Router = () => {
  return (
    <div className="routes-container">
      <div className="routes-container-pages">
        <Routes>
          <Route path="/" element={<Create />} />
          <Route path="/list" element={<List />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
    </div>
  );
};
