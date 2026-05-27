import {
  Crown,
  Edit2,
  Eye,
} from "lucide-react";

import type {
  User,
} from "../../types";

import { initials } from "../../utils/initials";

type UserRowProps = {
  user: User;

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
};

export function UserRow({
  user,
  openUser,
  patchUser,
  editUser,
}: UserRowProps) {
  return (
    <article className="user-row">
      <div className="person-block">
        <div className="avatar blue">
          {initials(user.name)}
        </div>

        <div>
          <h3>{user.name}</h3>

          <div className="tag-row">
            <span>
              {user.role}
            </span>

            <span
              className={
                user.status ===
                "Active"
                  ? "tag-green"
                  : "tag-muted"
              }
            >
              {user.status}
            </span>

            <span>
              {user.prime
                ? "Prime User"
                : "Normal User"}
            </span>
          </div>
        </div>
      </div>

      <div className="contact-lines">
        <span>
          {user.email}
        </span>

        <span>
          {user.phone}
        </span>
      </div>

      <div>
        <span className="muted-label">
          Joined
        </span>

        <strong>
          {user.joined}
        </strong>

        <small>
          Last:{" "}
          {user.lastActive}
        </small>
      </div>

      <div>
        <span className="muted-label">
          Appointments
        </span>

        <strong className="blue-number">
          {
            user.appointments
          }
        </strong>
      </div>

      <div className="row-actions">
        {!user.prime && (
          <button
            className="prime-button"
            onClick={() =>
              patchUser(
                user.id,
                {
                  prime: true,
                }
              )
            }
          >
            <Crown size={15} />

            Upgrade
          </button>
        )}

        <button
          className="outline-button"
          onClick={() =>
            openUser(user.id)
          }
        >
          <Eye size={15} />

          View
        </button>

        <button
          className="outline-button"
          onClick={() =>
            editUser(user.id)
          }
        >
          <Edit2 size={15} />

          Edit
        </button>
      </div>
    </article>
  );
}