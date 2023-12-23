import React from "react";

import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

const SignUp = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <img src={ process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" />
        <p className="text-md">Sign up into Password Manager</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Input label="Name" placeholder="Enter your name" />
        <div style={{marginBottom:'var(--nextui-spacing-unit-xs)'}} />
        <Input type="email" label="Email" placeholder="Enter your email" />
        <div style={{marginBottom:'var(--nextui-spacing-unit-xs)'}} />
        <Input
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
          className="max-w-xs"
        />
        <div style={{marginBottom:'var(--nextui-spacing-unit-xs)'}} />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Confirm your password"
          type={isVisible ? "text" : "password"}
          className="max-w-xs"
        />
      </CardBody>
      <Divider/>
      <CardFooter>
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}}>
            Sign up
          </Button> 
          <Button color="primary" variant="shadow">
            Log In
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default SignUp;