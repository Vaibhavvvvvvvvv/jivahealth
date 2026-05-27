import { FormEvent, useState } from "react";
import { X } from "lucide-react";

import { Label } from "../common/Label";

import type {
  Address,
  AddressFormValues,
} from "../../types";

type AddressModalProps = {
  close: () => void;

  saveAddress: (
    values: AddressFormValues
  ) => void;

  initialAddress?: Address;
};

export function AddressModal({
  close,
  saveAddress,
  initialAddress,
}: AddressModalProps) {
  const [error, setError] =
    useState("");

  const isEdit = Boolean(
    initialAddress
  );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    const form = new FormData(
      event.currentTarget
    );

    const values: AddressFormValues =
      {
        type: String(
          form.get("type")
        ) as AddressFormValues["type"],

        label: String(
          form.get("label")
        ).trim(),

        isDefault:
          form.get("isDefault") ===
          "on",
      };

    if (
      !values.label ||
      values.label.length < 8
    ) {
      setError(
        "Address must be at least 8 characters."
      );

      return;
    }

    saveAddress(values);
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
            ? "Edit Address"
            : "Add Address"}
        </h2>

        <p>
          {isEdit
            ? "Update this saved address"
            : "Add a saved address for this user"}
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <div className="modal-grid single">
          <Label name="Address Type">
            <select
              name="type"
              defaultValue={
                initialAddress?.type ??
                "Home"
              }
            >
              <option>Home</option>

              <option>Work</option>
            </select>
          </Label>

          <Label name="Full Address">
            <textarea
              name="label"
              required
              placeholder="Flat 301, Sunshine Apartments, MG Road"
              defaultValue={
                initialAddress?.label
              }
            />
          </Label>

          <label className="checkbox-field">
            <input
              name="isDefault"
              type="checkbox"
              defaultChecked={
                initialAddress?.isDefault
              }
            />

            <span>
              Set as default address
            </span>
          </label>
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
              : "Add Address"}
          </button>
        </div>
      </form>
    </div>
  );
}