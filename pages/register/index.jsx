import React from "react";
import form from "../../src/components/common/Form";
import Joi from "joi-browser";
import Heading from "../../src/components/common/Heading";
import AnimeContext from "../../src/context/AnimeContext";


class RegisterForm extends form {
  state = {
    data: { nickname: "", username: "", password: "", comfirmPassword: "" },
    errors: {},
  };

  static contextType = AnimeContext;

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
    comfirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' } } })
    ,
    nickname: Joi.string().min(3).max(12).required().label("Nickname"),
  };

  doSubmit = async () => {
    const { nickname, username, password } = this.state.data;
    const { signup, insertUser } = this.context;
    const data = {
      nickname: nickname,
      email: username,
    };
    try {
      const id = Date.now().toString();
      await signup(username, password);
      await insertUser(id, data);
      window.location.href = "/" ;
    } catch (error) {
      alert(error);
    }
  };

  render() {
    if(this.context.currentUser) return <h1 style={{textAlign: "center", padding : ".8rem", color : "red"}}>Bạn đã đăng nhập rồi.</h1>

    return (
      <div className="register-section">
        <Heading name="đăng ký thành viên" />
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("nickname", "Biệt danh", "Biệt danh bạn muốn đặt")}
          {this.renderInput("username", "Email", "Nhập email của bạn", "email")}
          {this.renderInput("password", "Mật khẩu", "password", "password")}
          {this.renderInput(
            "comfirmPassword",
            "Comfirm Password",
            "comfirm Password",
            "password"
          )}
          {this.renderButton("Đăng ký", "Đăng nhập", "/login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm ; 
// export default (props) => <RegisterForm history={useNavigate()} />;
