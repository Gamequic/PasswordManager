import axios from "axios";

class AuthService {
  // constructor ({ isLogged }) {
  constructor () {
    this.apiURl = 'http://localhost:2999/api/v1';
    this.userKey = "userData";
    
    // if (!isLogged) {
    //   window.location.href = '/login'
    // }
  }

  async GetUserData () {    // Only for self use
    const data = await JSON.parse(sessionStorage.getItem(this.userKey));
    return data;
  }

  async SaveUserData (data) {   // Only for self use
    await sessionStorage.setItem(
      this.userKey,
      JSON.stringify({
        ...data,
        time: await new Date(),
      })
    );
  }

  async GetToken () {
    const data = await this.GetUserData();
    const time = await new Date(await data.time);
    const nowTime = await new Date();
    const differenceInMinutes = (nowTime - time) / (1000 * 60);

    var user;
    if (differenceInMinutes > 25) {
      this.LogIn();
      user = this.GetUserData();
      return user.token;
    } else {
      return user.token;
    }
  }

  async AskPasswordReset ({ email }) {
    const body = {
      email,
    };

    const rta = await axios.post(this.apiURl + '/auth/askresetpassword', body);
  }

  async SignUp ({ name, email, password }) {
    const body = {
      name,
      email,
      password,
    };

    const rta = await axios.post(this.apiURl + '/user/create', body);

    await this.LogIn({ email, password })

    return rta
  }

  async LogIn ({ email, password }) {
    const body = {
      email,
      password,
    };

    const rta = await axios.post(this.apiURl + '/auth/login', body);

    this.SaveUserData({
      ...rta.data.userData,
      password
    })
  }
}

export default AuthService;
