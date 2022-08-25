import { Routes, Route } from "react-router-dom";
import { Editor } from "./pages/Editor";
import { Home } from "./pages/Home";

export function Router() {
  return (
    <Routes>
      <Route path={"/project/:id"} element={<Editor />} />
      <Route path={"*"} element={<Home />} />
    </Routes>
  );
}
