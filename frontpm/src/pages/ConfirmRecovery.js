import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Image } from "@nextui-org/react";

import Warning from './../componets/Warning';

import AuthService from './../services/AuthService';
const Service = new AuthService();

const ConfirmRecovery = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const [ warning, setWarning] = React.useState();

  const [ password, setPassword ] = React.useState();
  const [ confirmPassword, setConfirmPassword] = React.useState();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleInput = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    }
  }

  const handleConfirmRecovery = async () => {
    setWarning();
    if (!(password === confirmPassword)){
      setWarning('Passwords do not match');
      return;
    }

    const url = new URL(window.location.href);
    var token = url.searchParams.get('token');

    const body = {
      password,
      token
    }

    await Service.ApplyPasswordReset(body);

    window.location.href = '/login';
  }

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <p className="text-md">Confirm password recovery</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Hello!<br/>Please enter your new password</p>
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
          placeholder="Re-enter your password"
          type={isVisible ? "text" : "password"}
        />
      </CardBody>
      <Divider/>
      <CardFooter>
        <Warning message={warning} />
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href='/login';}} >
            Cancel
          </Button> 
          <Button color="primary" variant="shadow" onClick={() => {handleConfirmRecovery();}} >
            Confirm
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ConfirmRecovery;