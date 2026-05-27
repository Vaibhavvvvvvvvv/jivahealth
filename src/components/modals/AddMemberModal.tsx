import { FormEvent, useState } from "react";
import { X } from "lucide-react";

import { Label } from "../common/Label";

import type {
  FamilyMember,
  FamilyMemberFormValues,
} from "../../types";

type AddMemberModalProps = {
  close: () => void;
  saveMember: (
    values: FamilyMemberFormValues
  ) => void;
  initialMember?: FamilyMember;
};

const phonePattern =
  /^[+()\-\d\s]{8,}$/;

export function AddMemberModal({
  close,
  saveMember,
  initialMember,
}: AddMemberModalProps) {
  const [error, setError] =
    useState("");

  const isEdit = Boolean(
    initialMember
  );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const form = new FormData(
      event.currentTarget
    );

    const values: FamilyMemberFormValues =
      {
        name: String(
          form.get("name")
        ).trim(),

        relation: String(
          form.get("relation")
        ).trim(),

        dob: String(
          form.get("dob")
        ).trim(),

        phone: String(
          form.get("phone")
        ).trim(),
      };

    if (
      !values.name ||
      values.name.length < 3
    ) {
      setError(
        "Family member name must be at least 3 characters."
      );

      return;
    }

    if (!values.relation) {
      setError(
        "Relationship is required."
      );

      return;
    }

    if (!values.dob) {
      setError("DOB is required.");

      return;
    }

    if (
      !phonePattern.test(values.phone)
    ) {
      setError(
        "Enter a valid phone number."
      );

      return;
    }

    saveMember(values);
  };

  return (
    <div className="modal-backdrop">
      <form
        className="modal small-modal"
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          className="close-button"
          onClick={close}
        >
          <X size={18} />
        </button>

        <h2>
          {isEdit
            ? "Edit Family Member"
            : "Add Family Member"}
        </h2>

        <p>
          {isEdit
            ? "Update linked family member details"
            : "Link a family member to this user profile"}
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="modal-grid single">
          <Label name="Name">
            <input
              name="name"
              required
              autoFocus
              autoComplete="name"
              placeholder="John Williams"
              defaultValue={
                initialMember?.name
              }
            />
          </Label>

          <Label name="Relationship">
            <input
              name="relation"
              required
              placeholder="Son"
              defaultValue={
                initialMember?.relation
              }
            />
          </Label>

          <Label name="DOB">
            <input
              name="dob"
              type="date"
              required
              defaultValue={
                initialMember?.dob
              }
            />
          </Label>

          <Label name="Phone">
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="+91 98765 43210"
              defaultValue={
                initialMember?.phone
              }
            />
          </Label>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="outline-button"
            onClick={close}
          >
            Cancel
          </button>

          <button className="dark-button">
            {isEdit
              ? "Save Changes"
              : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
}