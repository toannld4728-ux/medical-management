import { Routes, Route } from "react-router-dom";
import ClinicOverview from "../pages/clinic/overview";
import SubscriptionPage from "../pages/clinic/subscription";
import ClinicAnalytics from "../pages/clinic/analytics";




export default function ClinicRoutes() {
  return (
    <Routes>
      <Route index element={<ClinicOverview />} />
      <Route path="subscription" element={<SubscriptionPage />} />

      <Route index element={<ClinicOverview />} />
      <Route path="analytics" element={<ClinicAnalytics />} />    
    </Routes>
  );
}
