import {
  Activity,
  Plus,
  Users,
} from "lucide-react";

import { Metric } from "../common/Metric";

import { UserRow } from "./UserRow";

import type {
  Role,
  Status,
  User,
} from "../../types";

type UserListProps = {
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

export function UserList({
  users,

  totalUsers,
  primeUsers,
  familyCount,

  statusFilter,
  roleFilter,

  setStatusFilter,
  setRoleFilter,

  openUser,
  patchUser,
  editUser,

  showAddUser,
}: UserListProps) {
  return (
    <>
      <div className="page-title-row">
        <div>
          <h1>
            User Management
          </h1>

          <p>
            Manage user accounts
            and permissions
          </p>
        </div>

        <button
          className="dark-button"
          onClick={
            showAddUser
          }
        >
          <Plus size={16} />

          Add User
        </button>
      </div>

      <section className="summary-grid">
        <Metric
          title="Total Users"
          value={totalUsers}
        />

        <Metric
          title="Prime Users"
          value={primeUsers}
          green
        />

        <Metric
          title="Non-Prime Users"
          value={
            totalUsers -
            primeUsers
          }
        />

        <Metric
          title="Family Members"
          value={
            familyCount
          }
          green
        />
      </section>

      <div className="filters-row">
        <label className="select-field">
          <Activity size={16} />

          <select
            value={statusFilter}
            onChange={(
              event
            ) =>
              setStatusFilter(
                event.target
                  .value as
                  | "All"
                  | Status
              )
            }
          >
            <option>
              All
            </option>

            <option>
              Active
            </option>

            <option>
              Inactive
            </option>
          </select>
        </label>

        <label className="select-field">
          <Users size={16} />

          <select
            value={roleFilter}
            onChange={(
              event
            ) =>
              setRoleFilter(
                event.target
                  .value as
                  | "All"
                  | Role
              )
            }
          >
            <option>
              All
            </option>

            <option>
              Patient
            </option>

            <option>
              Nurse
            </option>
          </select>
        </label>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <Users size={42} />

          <h3>
            No users found
          </h3>

          <p>
            Try changing search or
            filters.
          </p>
        </div>
      ) : (
        <section className="user-stack">
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              openUser={
                openUser
              }
              patchUser={
                patchUser
              }
              editUser={
                editUser
              }
            />
          ))}
        </section>
      )}
    </>
  );
}