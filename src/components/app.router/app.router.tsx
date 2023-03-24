import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

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
        <Route path={"/add-pet"} element={<AddPet></AddPet>}></Route>
      </Routes>
    </Suspense>
  );
}
export default AppRouter;
