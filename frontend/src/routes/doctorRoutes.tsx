import DoctorPatientsPage from "../pages/doctor/Patients";
import PatientDetail from "../pages/doctor/Patients/PatientDetail";

export const doctorRoutes = [
  {
    path: "/doctor/patients",
    element: <DoctorPatientsPage />,
  },
  {
    path: "/doctor/patients/:patientId",
    element: <PatientDetail />,
  },
];
