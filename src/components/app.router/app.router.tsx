import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";
import { menuOptions } from "../app/app";

const Login = lazy(() => import("../login/login"));
const Register = lazy(() => import("../register/register"));
const AddPet = lazy(() => import("../add.pet/add.pet"));

export function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<Login></Login>}></Route>
        <Route path={"/login"} element={<Login></Login>}></Route>
        <Route path={"/register"} element={<Register></Register>}></Route>
        {/* <Route path={menuOptions[0].path} element={<Home></Home>}></Route> */}
        <Route path={menuOptions[1].path} element={<AddPet></AddPet>}></Route>
        {/* <Route path={menuOptions[2].path} element={<Logout></Logout>}></Route> */}
        {/* <Route path={"*"} element={<Error></Error>}></Route> */}
      </Routes>
    </Suspense>
  );
}
export default AppRouter;
