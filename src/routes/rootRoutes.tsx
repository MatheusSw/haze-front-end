import { Route, Routes } from "react-router-dom";
import Layout from "../layouts/layout";
import ClustersPage from "../pages/clusters/clusters";
import ClusterCreate from "../pages/clusters/create";
import Home from "../pages/home/home";
import PlantsIndexPage from "../pages/plants";
import PlantsCreatePage from "../pages/plants/create";

export const RootRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="clusters" element={<ClustersPage />} />
        <Route path="clusters/create" element={<ClusterCreate />} />

        <Route path="plants" element={<PlantsIndexPage />} />
        <Route path="plants/create" element={<PlantsCreatePage />} />
      </Route>
    </Routes>
  );
};
