import {
  Button,
  Container,
  Text,
  Drawer,
  Label,
  Input,
  Table,
} from "@medusajs/ui";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAdminCustomQuery, useAdminCustomPost } from "medusa-react";
const SetPermission = () => {
  const { "*": id } = useParams();
  const [selectedPermissions, setSelectedPermissions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [newPermission, setNewPermission] = useState({
    name: "",
    metadata: "",
  });
  const [nameError, setNameError] = useState("");
  const [metadataError, setMetadataError] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerOpen1, setDrawerOpen1] = useState(false);
  const [drawerOpen2, setDrawerOpen2] = useState(false);

  // Hook#1 for getting all permission from database
  const {
    data: permissionsData,
    isLoading: permissionsLoading,
    error: permissionsError,
  } = useAdminCustomQuery("/roles/get-permission", []);
  // Hook#2 for getting all permission of a single role
  const {
    data: roleData,
    isLoading: roleIsloading,
    error: roleerror,
  } = useAdminCustomQuery(`/roles/get-rolepermissions/${id}`, [
    "getRolePermissions",
  ]);

  // Hook#3 for updating the role permissons
  const {
    mutate: updaterole,
    isLoading: isUpdating,
    error: iserror,
  } = useAdminCustomPost(`/roles/update-permissions/${id}`, [
    "updateRolesPermissions",
  ]);
  // Hook#4 for creating a new permission
  const { mutate: createnewpermission } = useAdminCustomPost(
    "/roles/createnewpermission",
    ["createPermissions"]
  );
  // Hook#5 list all users
  const {
    data: usersData,
    isLoading: userLoading,
    error: userError,
  } = useAdminCustomQuery("/roles/getAllUsers", []);

  // Hooks# 6 update the role_id inside the user entity

  const {
    mutate: updateRoleInUser,
    isLoading: updateroleLoading,
    error: updateroleError,
  } = useAdminCustomPost(`roles/${id}/user`, ["setRolestouser"]);

  // Hook 1
  if (permissionsLoading) {
    return <div>Loading...</div>;
  }

  if (permissionsError) {
    return <div>Error: {permissionsError.message}</div>;
  }
  // Hook 2
  if (roleIsloading) {
    return <div>Loading...</div>;
  }

  if (roleerror) {
    return <div>Error: {roleerror.message}</div>;
  }
  //Hook 3
  if (isUpdating) {
    return <div>Loading...</div>;
  }

  if (iserror) {
    return <div>Error: {iserror.message}</div>;
  }
  //Hook 4
  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (userError) {
    return <div>Error: {userError.message}</div>;
  }
  // Hook 5
  if (updateroleLoading) {
    return <div>Loading...</div>;
  }

  if (updateroleError) {
    return <div>Error: {updateroleError.message}</div>;
  }

  const permissions = roleData.role.permissions;
  const users = roleData.role.users;

  // hook 3 handle checkbox
  const handlePermissionToggle = (permission) => {
    const selectedPermissionIds = selectedPermissions.map((p) => p.id);

    if (selectedPermissionIds.includes(permission.id)) {
      // Permission is already selected, remove it
      const updatedPermissions = selectedPermissions.filter(
        (p) => p.id !== permission.id
      );
      setSelectedPermissions(updatedPermissions);
    } else {
      // Permission is not selected, add it
      setSelectedPermissions([...selectedPermissions, permission]);
    }
  };
  const handleUpdatePermissions = () => {
    updaterole(selectedPermissions);
    setSelectedPermissions([]);
    setDrawerOpen1(false);
  };

  // Here we handle the Selected Users
  const handleUsersToggle = (user) => {
    const selectedUserIds = selectedUser.map((p) => p.id);

    if (selectedUserIds.includes(user.id)) {
      // Permission is already selected, remove it
      const updatedUsers = selectedUser.filter((p) => p.id !== user.id);
      setSelectedUser(updatedUsers);
    } else {
      // Permission is not selected, add it
      setSelectedUser([...selectedUser, user]);
    }
  };
  // zzz
  const handleSelectedUser = () => {
    const newIds = selectedUser.map((user) => user.id);

    for (const singleId of newIds) {
      const abc = [singleId];
      console.log(abc);
      updateRoleInUser(abc);
    }

    // Clear selectedUser and close the drawer
    setSelectedUser([]);
    setDrawerOpen2(false);
  };

  // Handle function to create permission
  const handleCreatePermissions = () => {
    if (!newPermission.name && !newPermission.metadata) {
      setNameError("Name field is empty");
      setMetadataError("Metadata field is empty");
      return;
    }

    if (!newPermission.name) {
      setNameError("Name field is empty");
      return;
    }

    if (!newPermission.metadata) {
      setMetadataError("Metadata field is empty");
      return;
    }
    // Hook 4 creating new permissions
    const newMetadata = { [`${newPermission.metadata}`]: true };
    const updatedPermission = {
      name: newPermission.name,
      metadata: newMetadata,
    };
    try {
      createnewpermission(updatedPermission);
      setDrawerOpen(false);
    } catch (error) {
      console.error("Error creating page:", error);
    }
  };

  const handlecancel = () => {
    setNewPermission({
      name: "",
      metadata: "",
    });

    setMetadataError("");

    setNameError("");
    setDrawerOpen(false);
  };

  const handleNameChange = (e) => {
    const { value } = e.target;
    setNewPermission({
      ...newPermission,
      name: value,
    });
    if (nameError) {
      setNameError('');
    }
  };

  const handleMetadataChange = (e) => {
    const { value } = e.target;
    setNewPermission({
      ...newPermission,
      metadata: value,
    });
    if (metadataError) {
      setMetadataError('');
    }
  };

  return (
    <>
      <div>
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text size="base" weight="plus" family="sans">
              Role Name: {roleData.role.name}
              <br />
            </Text>

            <Drawer open={drawerOpen}>
              <Drawer.Trigger asChild>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDrawerOpen(true);
                  }}
                >
                  Create Permission
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>Add New Permission</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="p-4">
                  <br />
                  <Label>Enter permission name</Label>
                  <br />

                  <div className="w-[250px]">
                    <Input
                      placeholder="products"
                      id="role_name"
                      value={newPermission.name}
                      onChange={handleNameChange}
                    />
                  </div>
                  <div className="text-red-500">{nameError}</div>
                  <br />
                  <Label>Enter permission Route</Label>
                  <br />
                  <div className="w-[250px]">
                    <Input
                      placeholder="/products"
                      id="role_name"
                      value={newPermission.metadata}
                      onChange={handleMetadataChange}
                    />
                  </div>
                  <div className="text-red-500">{metadataError}</div>
                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.Close asChild>
                    <Button variant="secondary" onClick={handlecancel}>
                      Cancel
                    </Button>
                  </Drawer.Close>
                  <Button onClick={handleCreatePermissions}>Save</Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer>
          </div>
        </Container>
        <br />
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text size="base" weight="plus" family="sans">
              <h1> Permissions : </h1>
              <br />
            </Text>

            <Drawer open={drawerOpen1}>
              <Drawer.Trigger asChild>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDrawerOpen1(true);
                  }}
                >
                  Add Permissions
                </Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header>
                  <Drawer.Title>
                    Assign Permissions to selected Role
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body className="p-4">
                  <Text>List of all Permission&apos;s</Text>

                  <br />
                  <br />
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Permission</Table.HeaderCell>
                        <Table.HeaderCell>Route</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {permissionsData.permission.map((permission, index) => (
                        <Table.Row key={index}>
                          <Table.Cell
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <input
                              type="checkbox"
                              id={`permission-checkbox-${permission.id}`}
                              checked={selectedPermissions.some(
                                (p) => p.id === permission.id
                              )}
                              onChange={() =>
                                handlePermissionToggle(permission)
                              }
                              disabled={permissions.some(
                                (p) => p.id === permission.id
                              )}
                              style={{
                                width: "20px",
                                height: "20px",
                                border: "2px solid #FFFFFF",
                                marginRight: "10px",
                              }}
                            />
                            <Label
                              htmlFor={`permission-checkbox-${permission.id}`}
                            ></Label>
                            {permission.name}
                          </Table.Cell>
                          <Table.Cell>
                            {JSON.stringify(permission.metadata)}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                    </Table.Body>
                  </Table>
                </Drawer.Body>
                <Drawer.Footer>
                  <Drawer.Close asChild>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setSelectedPermissions([]);
                        setDrawerOpen1(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </Drawer.Close>
                  <Button onClick={handleUpdatePermissions}>Save</Button>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer>
          </div>
          {/* Table that display All permissions of a selected role */}
          <div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Route</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {permissions.map((permission, index) => (
                  <Table.Row key={permission.id}>
                    <Table.Cell>{index + 1}</Table.Cell>

                    <Table.Cell>{permission.name}</Table.Cell>
                    <Table.Cell>
                      {JSON.stringify(permission.metadata)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
        <br />
        <Container>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text size="base" weight="plus" family="sans">
              <h1>Users :</h1>
              <br />
            </Text>
            <div style={{ marginLeft: "75%" }}>
              <Drawer open={drawerOpen2}>
                <Drawer.Trigger asChild>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setDrawerOpen2(true);
                    }}
                  >
                    Add User
                  </Button>
                </Drawer.Trigger>
                <Drawer.Content>
                  <Drawer.Header>
                    <Drawer.Title>Assign Role</Drawer.Title>
                  </Drawer.Header>
                  <Drawer.Body className="p-4">
                    <Text>List of all user&apos;s</Text>
                    <br />

                    <br />
                    <br />
                    <Table>
                      <Table.Header>
                        <Table.Row>
                          <Table.HeaderCell>First Name</Table.HeaderCell>
                          <Table.HeaderCell>Last Name</Table.HeaderCell>
                          <Table.HeaderCell>Email</Table.HeaderCell>
                        
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {usersData.users.map((user, index) => (
                          <Table.Row key={index}>
                            <Table.Cell
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <input
                                type="checkbox"
                                id={`permission-checkbox-${user.id}`}
                                checked={selectedUser.some(
                                  (p) => p.id === user.id
                                )}
                                onChange={() => handleUsersToggle(user)}
                                disabled={users.some((p) => p.id === user.id)}
                                style={{
                                  width: "20px",
                                  height: "20px",
                                  border: "2px solid #FFFFFF",
                                  marginRight: "10px",
                                }}
                              />
                              <Label
                                htmlFor={`permission-checkbox-${user.id}`}
                              ></Label>
                              {user.name}
                            </Table.Cell>
                            <Table.Cell>{user.first_name}</Table.Cell>
                            <Table.Cell>{user.last_name}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                           
                          </Table.Row>
                        ))}
                      </Table.Body>
                    </Table>
                  </Drawer.Body>
                  <Drawer.Footer>
                    <Drawer.Close asChild>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setSelectedUser([]);
                          setDrawerOpen2(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </Drawer.Close>

                    <Button onClick={handleSelectedUser}>Save</Button>
                  </Drawer.Footer>
                </Drawer.Content>
              </Drawer>
            </div>

            <br />
          </div>
          <div>
            <Table>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>First Name</Table.HeaderCell>
                  <Table.HeaderCell>Last Name</Table.HeaderCell>
                  <Table.HeaderCell>Email</Table.HeaderCell>
                
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.map((user, index) => (
                  <Table.Row key={index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{user.first_name}</Table.Cell>
                    <Table.Cell>{user.last_name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                   
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
};
export default SetPermission;
