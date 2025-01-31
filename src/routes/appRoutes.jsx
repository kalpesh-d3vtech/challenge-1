import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { Suspense } from "react";
import AuthLayout from "../layouts/authLayout";
import DashboardLayout from "../layouts/dashboardLayout";
import Loader from "../components/loaders/loder";
import AuthProtected from "../utils/authProtected"
const Signin = React.lazy(() => import("../pages/signin"));
const Signup = React.lazy(() => import("../pages/signup"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const NotFound = React.lazy(() => import("../pages/notFound"));

const AppRoutes = () => (
    <Router>
        <Suspense fallback={<Loader />}>
            <Routes>
                <Route path="/" element={<AuthLayout />}>
                    <Route index element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                </Route>
                <Route
                    path="/dashboard"
                    element={
                        <AuthProtected>
                            <DashboardLayout />
                        </AuthProtected>
                    }
                >
                    <Route index element={<Dashboard />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    </Router>
);

export default AppRoutes;