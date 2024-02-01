import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";

const CheckYourEmail = () => {
  return (
    <Card className="w-[300px]">
      <CardHeader className="flex gap-3">
        <img src={ process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" />
        <p className="text-md">Email</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Image src={ process.env.PUBLIC_URL + '/email.svg' } alt='email' />
      </CardBody>
      <Divider/>
      <CardFooter>
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href='/login'}} >
            Go back to Log in
          </Button> 
          <Button color="primary" variant="shadow" onClick={() => {window.location.href = 'mailto:'}} >
            Open email
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default CheckYourEmail;