import HomePage from "../pages/home";
import MovieDetailPage from "../pages/movie-detail";
import AuthTemplate from "../templates/AuthTemplate";
import HomeTemplate from "../templates/HomeTemplate";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import { Route } from "react-router-dom";
import { AuthCheck, roleUser } from "../HOC/AuthCheck";
import UserInfoPage from "../pages/info-user";
import AdminTemplate from "../templates/AdminTemplate";
import AdminHomePage from "../pages/admin/home";
import MovieAdminPage from "../pages/admin/movie";

const routers = [
  {
    path: "",
    element: <HomeTemplate />,
    child: [
      {
        path: "",
        element: <HomePage />,
      },

      {
        path: "/detail/:movieId",
        // element: <MovieDetailPage />,
        element: (
          <AuthCheck needLogin={true}>
            <MovieDetailPage />,
          </AuthCheck>
        ),
      },
      {
        path: "/info",
        // element: <MovieDetailPage />,
        element: (
          <AuthCheck needLogin={true}>
            <UserInfoPage />,
          </AuthCheck>
        ),
      },
    ],
  },
  {
    path: "",
    element: <AuthTemplate />,
    child: [
      {
        path: "/login",
        element: (
          <AuthCheck needLogin={false}>
            <LoginPage />,
          </AuthCheck>
        ),
      },
      {
        path: "/register",
        element: (
          <AuthCheck needLogin={false}>
            <RegisterPage />,
          </AuthCheck>
        ),
      },
    ],
  },
  {
    path: "admin",
    element: <AdminTemplate />,
    child: [
      {
        path: "",
        element: (
          <AuthCheck needLogin={true} pagePermission={roleUser.ADMIN}>
            <AdminHomePage />
          </AuthCheck>
        ),
      },
      {
        path: "movie",
        element: (
          <AuthCheck isNeedLogin={true} pagePermission={roleUser.ADMIN}>
            <MovieAdminPage />,
          </AuthCheck>
        ),
      },
    ],
  },
];

const renderRoutes = () => {
  return routers.map((route, index) => {
    const { path, element, child } = route;
    return (
      <Route key={index} path={path} element={element}>
        {child &&
          child.map((subRoute, subIndex) => (
            <Route
              key={subIndex}
              path={subRoute.path}
              element={subRoute.element}
            />
          ))}
      </Route>
    );
  });
};
export default renderRoutes;
