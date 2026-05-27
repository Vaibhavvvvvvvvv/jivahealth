import { Calendar, CreditCard, Edit2, HeartPulse, Home, Plus, Trash2, UserPlus, Activity } from "lucide-react";
import { Info } from "../common/Info";
import type { User } from "../../types";

type OverviewPanelProps = {
  user: User;
  patchUser: (id: number, patch: Partial<User>) => void;
  editUser: () => void;
  addAddress: () => void;
  editAddress: (id: string) => void;
  deleteAddress: (id: string) => void;
};

export function OverviewPanel({ user, editUser, addAddress, editAddress, deleteAddress }: OverviewPanelProps) {
  return (
    <section className="two-column">
      <div className="white-panel">
        <div className="panel-title">
          <h2>Personal Information</h2>
          <button className="outline-button" onClick={editUser}>
            <Edit2 size={15} /> Edit
          </button>
        </div>
        <Info icon={<CreditCard size={15} />} label="Email" value={user.email} />
        <Info icon={<Activity size={15} />} label="Phone" value={user.phone} />
        <Info icon={<Calendar size={15} />} label="Date of Birth" value={user.dob} />
        <Info icon={<UserPlus size={15} />} label="Gender" value={user.gender} />
        <Info icon={<HeartPulse size={15} />} label="Blood Group" value={user.bloodGroup} />
      </div>
      <div className="white-panel">
        <div className="panel-title">
          <h2>Addresses</h2>
          <button className="outline-button" onClick={addAddress}>
            <Plus size={15} /> Add
          </button>
        </div>
        <div className="address-list">
          {user.addresses.map((address) => (
            <div className="address-card" key={address.id}>
              <div className="address-icon">
                <Home size={18} />
              </div>
              <div>
                <h3>
                  {address.type} {address.isDefault && <span>Default</span>}
                </h3>
                <p>{address.label}</p>
              </div>
              <button className="mini-button" onClick={() => editAddress(address.id)}>
                <Edit2 size={15} />
              </button>
              <button className="mini-button danger" onClick={() => deleteAddress(address.id)}>
                <Trash2 size={15} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
