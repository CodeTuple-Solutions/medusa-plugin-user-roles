import type { SettingConfig } from "@medusajs/admin";
import { Adjustments, PlusMini } from "@medusajs/icons";
import {
  Container,
  Text,
  Table,
  Button,
  Drawer,
  Input,
  Label,
} from "@medusajs/ui";
import {
  useAdminCustomQuery,
  useAdminCustomPost,
  useAdminCustomDelete,
} from "medusa-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const CustomSettingPage = () => {
  // Create New ROle
  const [name, setRoleName] = useState<any>("");
  const { mutate } = useAdminCustomPost("/roles/create-role", []);
  const [mendatory, setMendatory] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [refetchFlag, setRefetchFlag] = useState(false);

  const { data, isLoading, error, refetch } = useAdminCustomQuery(
    "/roles/get-roles",
    []
  );
  const { mutate: deleteMutate } = useAdminCustomPost("/roles/delete-role", [
    "DeleteRole",
  ]);

  const handleRoleNameChange = (e) => {
    setRoleName(e.target.value);
    if (mendatory) {
      setMendatory("");
    }
  };

  const handleSave = async () => {
    if (!name) {
      setMendatory("Name field is empty");
      return;
    }
    try {
      const response = await mutate({ name });
      setRoleName("");

      setDrawerOpen(false);
      setRefetchFlag(true);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };
  useEffect(() => {
    if (refetchFlag) {
      refetch();
      setRefetchFlag(false);
    }
  }, [refetchFlag]);
  const handlecancle = () => {
    setRoleName("");
    setMendatory("");
    setDrawerOpen(false);
  };
  // Handle delete roles

  const handleDeleteRole = (id): void => {
    deleteMutate({ id });
    setRefetchFlag(true);
  };
  // Here we get all the Roles

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text size="xlarge" weight="plus" family="sans">
            Manage the user roles and Permissions
          </Text>

          <Drawer open={drawerOpen}>
            <Drawer.Trigger asChild>
              <Button
                variant="secondary"
                onClick={() => {
                  setDrawerOpen(true);
                }}
              >
                <PlusMini />
                Create Role
              </Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>Add New Role</Drawer.Title>
              </Drawer.Header>
              <Drawer.Body className="p-4">
                <br />
                <Label>Enter role name</Label>
                <br />

                <div className="w-[250px]">
                  <Input
                    placeholder="Content Manager"
                    id="role_name"
                    value={name}
                    onChange={handleRoleNameChange}
                  />
                </div>
                <div className="text-red-500">{mendatory}</div>
              </Drawer.Body>
              <Drawer.Footer>
                <Drawer.Close asChild>
                  <Button variant="secondary" onClick={handlecancle}>
                    Cancel
                  </Button>
                </Drawer.Close>
                <Button onClick={handleSave}>Save</Button>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer>
        </div>
        <br />
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Role Name</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.role.map((role, index) => (
              <Table.Row key={role.id}>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{role.name}</Table.Cell>
                <Table.Cell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Link to={`/a/role/${role.id}`}>
                    <Button variant="secondary">Edit</Button>
                  </Link>
                  <div style={{ marginLeft: "30px" }}>
                    <Button
                      variant="secondary"
                      onClick={() => handleDeleteRole(role.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
      <br />
    </>
  );
};

export const config: SettingConfig = {
  card: {
    label: "Roles & Permissions",
    description: "Manage User roles and Permission",
    icon: Adjustments,
  },
};

export default CustomSettingPage;
