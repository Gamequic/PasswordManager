import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";

const Recovery = () => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <img src={ process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" />
        <p className="text-md">Recover password</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Input type="email" label="Email" placeholder="Enter your email" />
      </CardBody>
      <Divider/>
      <CardFooter>
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href='/login'}} >
            Cancel
          </Button> 
          <Button color="primary" variant="shadow" onClick={() => {window.location.href='/confirmrecovery'}} >
            Send Email
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Recovery;