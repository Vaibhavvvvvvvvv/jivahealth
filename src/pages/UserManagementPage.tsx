import type {
  Role,
  Status,
  User,
} from "../types";

import { UserList } from "../components/users/UserList";

type UserManagementPageProps = {
  users: User[];

  totalUsers: number;

  primeUsers: number;

  familyCount: number;

  statusFilter:
    | "All"
    | Status;

  roleFilter:
    | "All"
    | Role;

  setStatusFilter: (
    value:
      | "All"
      | Status
  ) => void;

  setRoleFilter: (
    value:
      | "All"
      | Role
  ) => void;

  openUser: (
    id: number
  ) => void;

  patchUser: (
    id: number,
    patch: Partial<User>
  ) => void;

  editUser: (
    id: number
  ) => void;

  showAddUser: () => void;
};

export function UserManagementPage(
  props: UserManagementPageProps
) {
  return (
    <div className="user-management-page">
      <UserList
        {...props}
      />
    </div>
  );
}