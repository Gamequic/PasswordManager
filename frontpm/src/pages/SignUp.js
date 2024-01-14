import React from "react";

import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

import Warning from './../componets/Warning'

import AuthService from './../services/AuthService';
const Service = new AuthService();

const SignUp = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const [warning, setWarning] = React.useState();

  const [name, setName] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInput = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    }
  }

  const handleSignUp = async () => {
    try {
      if (!(confirmPassword === password)) {
        setWarning("Paswords do not match");
        return;
      }

      await Service.SignUp({
        name,
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
        <p className="text-md">Sign up into Password Manager</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Input label="Name" placeholder="Enter your name" value={name} onChange={handleInput(setName)} />
        <div className="py-unit-xs" />
        <Input type="email" label="Email" placeholder="Enter your email" value={email} onChange={handleInput(setEmail)} />
        <div className="py-unit-xs" />
        <Input
          value={password}
          onChange={handleInput(setPassword)}
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
        <Input
          value={confirmPassword}
          onChange={handleInput(setConfirmPassword)}
          label="Password"
          variant="bordered"
          placeholder="Confirm your password"
          type={isVisible ? "text" : "password"}
        />
      </CardBody>
      <Divider/>
      <CardFooter>
        <Warning message={warning} />
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href = '/login'}}>
            Log in
          </Button> 
          <Button color="primary" variant="shadow" onClick={handleSignUp}>
            Sign up
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SignUp;