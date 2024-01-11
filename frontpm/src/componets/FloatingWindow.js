import "./FloatingWindow.css"
import { Card } from "@nextui-org/react";

export default function FloatingWindow ({ active, children }) {
  return (
    <div className="floatingBackground" style={{display: active ? 'flex' : 'none'}}>
      <div>
        {/* <Card
          component="li"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          bgColor={darkMode ? "transparent" : "grey-100"}
          borderRadius="lg"
          p={3}
          mt={2}
        > */}
        {children}
      </div>
    </div>
  )
}