import React from "react";
import { useRouter } from "next/router";
import AnimeContext from "../../src/context/AnimeContext";
import Joi from "joi-browser";
import Heading from "../../src/components/common/Heading";
import Form from "../../src/components/common/Form";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  static contextType = AnimeContext;

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    const { username, password } = this.state.data;
    const { login } = this.context;
    try {
      await login(username, password);
      //   this.props.history("/");
      window.location.href= '/' ; 
    } catch (error) {
      this.setState({
        errors: { username: "Email hoặc Mật khẩu không hợp lệ." },
      });
    }
  };

  render() {
    if (this.context.currentUser)
      return (
        <h1 style={{ textAlign: "center", padding: ".8rem", color: "red" }}>
          Bạn đã đăng nhập rồi.
        </h1>
      );

    return (
      <div className="login-section">
        <Heading name="đăng nhập thành viên" />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "Email của bạn")}
          {this.renderInput("password", "Password", "password", "password")}
          {this.renderButton("Đăng nhập", "Đăng ký", "/register")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
// export default (props) => <LoginForm history={useNavigate()} />;
