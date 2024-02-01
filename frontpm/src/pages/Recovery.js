import React from "react";

import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Input } from "@nextui-org/react";

import Warning from './../componets/Warning'

import AuthService from './../services/AuthService';
const Service = new AuthService();

const Recovery = () => {
  const [ email, setEmail ] = React.useState('');
  const [ warning, setWarning ] = React.useState([]);
  const [ loading, setLoading ] = React.useState(false);

  const handleInput = (setValue) => {
    return (event) => {
      setValue(event.target.value);
    }
  }

  const handleRecovery = async () => {
    setLoading(true);
    setWarning();
    try {
      await Service.AskPasswordReset({email});
      window.location.href = '/checkyouremail';
    } catch (error) {
      setWarning(error.response.data.message);
    }
    setLoading(false);
  }

  return (
    <Card className="w-[300px]">
      <CardHeader className="flex gap-3">
        <img src={ process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" />
        <p className="text-md">Recover password</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <Input type="email" label="Email" placeholder="Enter your email" value={email} onChange={handleInput(setEmail)} />
      </CardBody>
      <Divider/>
      <CardFooter>
        <Warning message={warning} />
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}} onClick={() => {window.location.href='/login'}} >
            Cancel
          </Button> 
          <Button color="primary" variant="shadow" onClick={() => {handleRecovery()}} isLoading={loading} >
            Send Email
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default Recovery;