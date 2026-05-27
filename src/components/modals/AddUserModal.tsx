import { FormEvent, useState } from "react";
import { X } from "lucide-react";

import { Label } from "../common/Label";

import type {
  User,
  UserFormValues,
} from "../../types";

type AddUserModalProps = {
  close: () => void;

  saveUser: (
    values: UserFormValues
  ) => void;

  initialUser?: User;
};

const emailPattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const phonePattern =
  /^[+()\-\d\s]{8,}$/;

export function AddUserModal({
  close,
  saveUser,
  initialUser,
}: AddUserModalProps) {
  const [error, setError] =
    useState("");

  const isEdit = Boolean(
    initialUser
  );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const form = new FormData(
      event.currentTarget
    );

    const values: UserFormValues = {
      name: String(
        form.get("name")
      ).trim(),

      email: String(
        form.get("email")
      ).trim(),

      phone: String(
        form.get("phone")
      ).trim(),

      dob: String(form.get("dob")),

      gender: String(
        form.get("gender")
      ),

      bloodGroup: String(
        form.get("bloodGroup")
      ),

      role: String(
        form.get("role")
      ) as UserFormValues["role"],

      status: String(
        form.get("status")
      ) as UserFormValues["status"],

      area: String(
        form.get("area")
      ).trim(),

      pin: String(
        form.get("pin")
      ).trim(),

      city: String(
        form.get("city")
      ).trim(),

      state: String(
        form.get("state")
      ).trim(),

      country:
        String(
          form.get("country")
        ).trim() || "India",
    };

    if (
      !values.name ||
      values.name.length < 3
    ) {
      setError(
        "Full name must be at least 3 characters."
      );

      return;
    }

    if (
      !emailPattern.test(values.email)
    ) {
      setError(
        "Enter a valid email address."
      );

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

    if (!values.dob) {
      setError(
        "Date of birth is required."
      );

      return;
    }

    if (!values.area) {
      setError(
        "Address area detail is required."
      );

      return;
    }

    saveUser(values);
  };

  return (
    <div className="modal-backdrop">
      <form
        className="modal"
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
            ? "Edit User"
            : "Add New User"}
        </h2>

        <p>
          {isEdit
            ? "Update user account, contact, and profile information"
            : "Create a new user account with role and permissions"}
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="modal-grid">
          <Label name="Full Name *">
            <input
              name="name"
              required
              autoFocus
              autoComplete="name"
              placeholder="John Smith"
              defaultValue={
                initialUser?.name
              }
            />
          </Label>

          <Label name="Email *">
            <input
              name="email"
              required
              type="email"
              autoComplete="email"
              placeholder="john@email.com"
              defaultValue={
                initialUser?.email
              }
            />
          </Label>

          <Label name="Phone Number">
            <input
              name="phone"
              required
              type="tel"
              autoComplete="tel"
              placeholder="+91 98765 43210"
              defaultValue={
                initialUser?.phone
              }
            />
          </Label>

          <Label name="Date of Birth">
            <input
              name="dob"
              type="date"
              required
              defaultValue={
                initialUser?.dob
              }
            />
          </Label>

          <Label name="Role">
            <select
              name="role"
              defaultValue={
                initialUser?.role ??
                "Patient"
              }
            >
              <option>Patient</option>

              <option>Nurse</option>
            </select>
          </Label>

          <Label name="Status">
            <select
              name="status"
              defaultValue={
                initialUser?.status ??
                "Active"
              }
            >
              <option>Active</option>

              <option>Inactive</option>
            </select>
          </Label>

          <Label name="Gender">
            <select
              name="gender"
              defaultValue={
                initialUser?.gender ??
                "Male"
              }
            >
              <option>Male</option>

              <option>Female</option>

              <option>Other</option>
            </select>
          </Label>

          <Label name="Blood Group">
            <select
              name="bloodGroup"
              defaultValue={
                initialUser?.bloodGroup ??
                "O+"
              }
            >
              <option>O+</option>
              <option>A+</option>
              <option>B+</option>
              <option>AB+</option>
              <option>O-</option>
              <option>A-</option>
              <option>B-</option>
              <option>AB-</option>
            </select>
          </Label>

          <Label
            name="Area Detail"
            wide
          >
            <textarea
              name="area"
              required
              placeholder="House/Flat No., Building Name, Street"
              defaultValue={
                initialUser?.addresses[0]
                  ?.label
              }
            />
          </Label>

          <Label name="Pin Code">
            <input
              name="pin"
              placeholder="400001"
            />
          </Label>

          <Label name="City">
            <input
              name="city"
              placeholder="Mumbai"
            />
          </Label>

          <Label name="State">
            <input
              name="state"
              placeholder="Maharashtra"
            />
          </Label>

          <Label name="Country">
            <input
              name="country"
              defaultValue="India"
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
              : "Add User"}
          </button>
        </div>
      </form>
    </div>
  );
}