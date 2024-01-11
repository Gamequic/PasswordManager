import React from "react";

import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Image} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import {User} from "@nextui-org/react";
import ImageUploader from "../../componets/UploadPhoto";

const AddNewUser = ({ setActiveWindow }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const [username, setUsername] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [confirmPassword, setConfirmPassword] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(null);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card className="max-w-[400px] p-4">
      <CardHeader className="flex gap-3">
        <p className="text-md">Add new user</p>
      </CardHeader>
      <Divider/>
      <div className="py-unit-xs" />
      <User
        avatarProps={{radius: "lg", src: selectedImage}}
        description={'demiancalleros0@gmail.com'}
        name={'Demiancalleros0'}
      >
        {'demiancalleros0@gmail.com'}
      </User>
      <div className="py-unit-xs" />
      <Divider/>
      <CardBody>
        <Input label="Username" placeholder="Enter your username" />
        <div className="py-unit-xs" />
        <Input type="email" label="Email" placeholder="Enter your email" />
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
          placeholder="Confirm your password"
          type={isVisible ? "text" : "password"}
        />
        <div className="py-unit-xs" />
        <ImageUploader 
          selectedImage = {selectedImage}
          setSelectedImage = {setSelectedImage}
        />
      </CardBody>
      <Divider/>
      <CardFooter>
        <div style={{ 
          width:"100%", height:"100%"
        }}>
          <Button onClick={() => {setActiveWindow(false)}} color="primary" variant="ghost" style={{marginRight:'var(--nextui-spacing-unit-xs)'}}>
            Cancel
          </Button> 
          <Button color="primary" variant="shadow">
            Add
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AddNewUser;