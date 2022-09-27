import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/layout";
import ClusterCreate from "../pages/clusters/create";
import Home from "../pages/home/home";

export const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="clusters/create" element={<ClusterCreate />} />
      </Route>
    </Routes>
  );
};
