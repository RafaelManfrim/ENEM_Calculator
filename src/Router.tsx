import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/Home";
import { DefaultLayout } from "./pages/layouts/Default";
import { LoginRegister } from "./pages/LoginRegister";
import { MyAmbitions } from "./pages/MyAmbitions";
import { MySimulations } from "./pages/MySimulations";

export function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginRegister />} />
      <Route path="/register" element={<LoginRegister />} />
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/metas" element={<MyAmbitions />} />
        <Route path="/simulacoes" element={<MySimulations />} />
      </Route>
    </Routes>
  )
}
