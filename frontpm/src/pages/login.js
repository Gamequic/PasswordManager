import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Image, Link } from "@nextui-org/react";

import Warning from './../componets/Warning'

import AuthService from './../services/AuthService';
const Service = new AuthService();

const Login = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const [warning, setWarning] = React.useState();

  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInput = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    }
  }

  const handleLogIn = async () => {
    try {
      await Service.LogIn({
        email,
        password
      });

      window.location.href = '/'
    } catch (error) {
      setWarning(error.response.data.message);
    }
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <img src={ process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" />
        <p className="text-md">Log in into Password Manager</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Input type="email" label="Email" placeholder="Enter your email" value={email} onChange={handleInput(setEmail)} />
        <div className="py-unit-xs" />
        <Input
          onChange={handleInput(setPassword)}
          value={password}
          label="Password"
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
              {isVisible ? (
                <Image className="icon" src={ process.env.PUBLIC_URL + '/noEyeOutline.svg'} alt='noEyeOutline' />
              ) : (
                <Image className="icon" src={ process.env.PUBLIC_URL + '/eyeOutline.svg' } alt='eyeOutline' />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />
        <div className="py-unit-xs" />
        <Link href="/recovery" underline="hover">Forgot password?</Link>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Warning message={warning} />
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href = '/signup'}}>
            Sign up
          </Button> 
          <Button color="primary" variant="shadow" onClick={handleLogIn}>
            Log In
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Login;