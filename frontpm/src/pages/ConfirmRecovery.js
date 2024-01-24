import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input, Image } from "@nextui-org/react";

const ConfirmRecovery = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <p className="text-md">Confirm password recovery</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>Hi Demian Calleros!<br/>Please enter your new password</p>
        <div className="py-unit-xs" />
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
        />
        <div className="py-unit-xs" />
        <Input
          label="Password"
          variant="bordered"
          placeholder="Re-enter your password"
          type={isVisible ? "text" : "password"}
        />
      </CardBody>
      <Divider/>
      <CardFooter>
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href='/login'}} >
            Cancel
          </Button> 
          <Button color="primary" variant="shadow" onClick={() => {window.location.href='/'}} >
            Confirm
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ConfirmRecovery;