import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Image
} from "@nextui-org/react";

import { Card } from "@nextui-org/react";
import { Header, LeftHeader, RightHeader} from './../componets/header';
import FloatingWindow from './../componets/FloatingWindow';

import TableContent from "./SrcHome/TableContent";
import AddNewUser from "./SrcHome/NewUser";

const columns = [
  {name: "ID", uid: "id"},
  {name: "NAME", uid: "name"},
  {name: "EMAIL", uid: "email"},
  {name: "PASSWORD", uid: "password"},
];

export default function App() {
  const [users] = React.useState([]);
  const [activeWindow, setActiveWindow] = React.useState(false);
  const { bottomContent, selectedKeys, sortDescriptor, topContent, setSelectedKeys, setSortDescriptor, sortedItems, renderCell } = TableContent(users, setActiveWindow);

  return (
    <div style={{height: '100%'}}>
      <FloatingWindow active={activeWindow}>
        <AddNewUser setActiveWindow={setActiveWindow} />
      </FloatingWindow>
      <Header>
        <LeftHeader>
          <img src={ process.env.PUBLIC_URL + '/Logo.svg'} alt="Logo" />
          <p className="text-md">Password Manager</p>
        </LeftHeader>
        <RightHeader>
          <Button className="bg-default-500" isIconOnly variant="faded">
            <Image className="icon" src={ process.env.PUBLIC_URL + '/settings.svg'} alt='noEyeOutline' />
          </Button>
        </RightHeader>
      </Header>
      <main>
        <Card fillWidth fillHeight className={"bg-default boxShadow-large shadow-medium p-4 m-4 "}>
          <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            bottomContent={bottomContent}
            bottomContentPlacement="outside"
            classNames={{
              wrapper: "max-h-[382px]",
            }}
            selectedKeys={selectedKeys}
            selectionMode="multiple"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="outside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn
                  key={column.uid}
                  align={column.uid === "actions" ? "center" : "start"}
                  allowsSorting={column.sortable}
                >
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </main>
    </div>
  );
}
