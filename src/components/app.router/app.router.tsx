import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router";

const Login = lazy(() => import("../login/login"));
const Register = lazy(() => import("../register/register"));
const Home = lazy(() => import("../home/home"));
const AddPet = lazy(() => import("../add.pet/add.pet"));
// const Detail = lazy(() => import("../detail/detail");
const AddSymptoms = lazy(() => import("../symptoms.form/symptoms.form"));

export function AppRouter() {
  return (
    <Suspense>
      <Routes>
        <Route path={"/"} element={<Login></Login>}></Route>
        <Route path={"/login"} element={<Login></Login>}></Route>
        <Route path={"/register"} element={<Register></Register>}></Route>
        <Route path={"/home"} element={<Home></Home>}></Route>
        <Route path={"/add-pet"} element={<AddPet></AddPet>}></Route>{" "}
        {
          <Route
            path={"/symptoms"}
            element={<AddSymptoms></AddSymptoms>}
          ></Route>
        }
        {/* <Route path={"/detail"} element={<Detail></Detail>}></Route> */}
        {/* <Route path={"*"} element={<Error></Error>}></Route> */}
      </Routes>
    </Suspense>
  );
}
export default AppRouter;
