import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import FuturePage from "./pages/FuturePage";
import AboutPage from "./pages/AboutPage";
import CompletedPage from "./pages/CompletedPage";
import FavoritePage from "./pages/FavoritePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import LoginPage from "./pages/LoginPage";
// import LogOut from "./components/Logout";
import Register from "./pages/Register";
import DashboardPage from "./pages/DashboardPage";
import TaskDetailPage from "./pages/TaskDetailPage";
import ProtectedRoute from "./components/ProtectedRoute";
import PriorityPage from "./pages/PriorityPage";
import Account from "./components/Account";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";
import AdminRoute from "./components/AdminRoute";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "/contact",
        element: (
          <ProtectedRoute>
            <ContactPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/about",
        element: (
          <ProtectedRoute>
            <AboutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/tasks/:id",
        element: <TaskDetailPage />,
      },
      {
        path: "/futureTask",
        element: (
          <ProtectedRoute>
            <FuturePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/completedTask",
        element: (
          <ProtectedRoute>
            <CompletedPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/favoriteTask",
        element: (
          <ProtectedRoute>
            <FavoritePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/priority",
        element: (
          <ProtectedRoute>
            <PriorityPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/adminPanel",
        element: (
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
        ),
      },
      { path: "/privacyPolicy", element: <PrivacyPolicyPage /> },
      { path: "/logIn", element: <LoginPage /> },
      { path: "/register", element: <Register /> },
      { path: "/account", element: <Account /> },
      {path :"*" , element :<ErrorPage />}
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
