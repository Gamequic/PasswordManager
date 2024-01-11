import React from "react";
import './Header.css';

const Header = ({children}) => {
  return (
    <header className="bg-default py-unit-2xl">{children}</header>
  )
}

const LeftHeader = ({children}) => {
  return (
    <div className="leftHeader">{children}</div>
  )
}

const RightHeader = ({children}) => {
  return (
    <div className="rightHeader">{children}</div>
  )
}

export { Header, LeftHeader, RightHeader};