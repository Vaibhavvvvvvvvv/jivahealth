import {
  Edit2,
  Plus,
  Trash2,
  Users,
} from "lucide-react";

import type {
  FamilyMember,
} from "../../types";

import { initials } from "../../utils/initials";

type FamilyPanelProps = {
  members: FamilyMember[];

  addMember: () => void;

  editFamilyMember: (
    id: string
  ) => void;

  removeFamilyMember: (
    id: string
  ) => void;
};

export function FamilyPanel({
  members,
  addMember,
  editFamilyMember,
  removeFamilyMember,
}: FamilyPanelProps) {
  const handleDelete = (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to remove this family member?"
      );

    if (!confirmed) return;

    removeFamilyMember(id);
  };

  return (
    <section className="white-panel">
      <div className="panel-title">
        <h2>Family Members</h2>

        <button
          className="dark-button"
          onClick={addMember}
        >
          <Plus size={16} />
          Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <div className="empty-state">
          <Users size={42} />

          <h3>
            No family members added
          </h3>

          <p>
            Add linked family members
            for this user profile.
          </p>
        </div>
      ) : (
        <div className="family-stack">
          {members.map((member) => (
            <article
              className="family-card"
              key={member.id}
            >
              <div className="avatar blue">
                {initials(member.name)}
              </div>

              <div>
                <h3>
                  {member.name}
                </h3>

                <span>
                  {member.relation}
                </span>

                <p>
                  {member.phone}
                </p>

                <p>{member.dob}</p>
              </div>

              <div className="family-actions">
                <button
                  className="mini-button"
                  onClick={() =>
                    editFamilyMember(
                      member.id
                    )
                  }
                  aria-label="Edit family member"
                >
                  <Edit2 size={15} />
                </button>

                <button
                  className="mini-button danger"
                  onClick={() =>
                    handleDelete(
                      member.id
                    )
                  }
                  aria-label="Delete family member"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}