import { Route, Switch } from "react-router-dom";
import AuthForm from "./AuthForm";
import Navbar from "./Navbar";
import Home from "./Home";
import Verification from "./Verification";

function PaymentGetwayApp() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path={"/"} exact>
          <AuthForm />
        </Route>
        <Route path={"/home"} exact>
          <Home />
        </Route>
        <Route path={"/verification/:token"} exact component={Verification} />
      </Switch>
    </>
  );
}

export default PaymentGetwayApp;
