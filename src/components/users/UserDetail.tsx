import {
  Activity,
  Calendar,
  ClipboardList,
  CreditCard,
  Stethoscope,
  UserPlus,
  Users,
  WalletCards,
} from "lucide-react";

import { Metric } from "../common/Metric";

import { FamilyPanel } from "./FamilyPanel";
import { OrdersPanel } from "./OrdersPanel";
import { OverviewPanel } from "./OverviewPanel";
import { PaymentsPanel } from "./PaymentsPanel";

import type {
  Status,
  Tab,
} from "../../types";

import { initials } from "../../utils/initials";
import { money } from "../../utils/money";

type UserDetailProps = {
  user: any;

  orders: any[];

  totalSpent: number;

  tab: Tab;

  setTab: (
    tab: Tab
  ) => void;

  back: () => void;

  patchUser: (
    id: number,
    patch: any
  ) => void;

  editUser: (
    id: number
  ) => void;

  openOrder: (
    id: string
  ) => void;

  addMember: () => void;

  editFamilyMember: (
    id: string
  ) => void;

  removeFamilyMember: (
    id: string
  ) => void;

  addAddress: () => void;

  editAddress: (
    id: string
  ) => void;

  deleteAddress: (
    id: string
  ) => void;
};

export function UserDetail({
  user,
  orders,
  totalSpent,

  tab,
  setTab,

  back,

  patchUser,
  editUser,

  openOrder,

  addMember,
  editFamilyMember,
  removeFamilyMember,

  addAddress,
  editAddress,
  deleteAddress,
}: UserDetailProps) {
  const tabs: Array<
    [Tab, string, React.ElementType]
  > = [
    [
      "overview",
      "Overview",
      UserPlus,
    ],

    [
      "orders",
      "Orders & Bookings",
      ClipboardList,
    ],

    [
      "payments",
      "Payments",
      CreditCard,
    ],

    [
      "family",
      "Family Members",
      Users,
    ],
  ];

  return (
    <>
      <button
        className="back-button"
        onClick={back}
      >
        ← Back to User Management
      </button>

      <section className="profile-header">
        <div className="profile-left">
          <div className="avatar mint">
            {initials(user.name)}
          </div>

          <div>
            <h1>{user.name}</h1>

            <div className="tag-row">
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
                {user.role}
              </span>

              <span>
                {user.prime
                  ? "Prime User"
                  : "Normal User"}
              </span>

              <b>
                ID: #{user.id}
              </b>
            </div>

            <div className="profile-meta">
              <span>
                <Calendar size={14} />

                Joined{" "}
                {user.joined}
              </span>

              <span>
                <Activity size={14} />

                Last active{" "}
                {user.lastActive}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
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
              Upgrade to Prime
            </button>
          )}

          <select
            value={user.status}
            onChange={(
              event
            ) =>
              patchUser(
                user.id,
                {
                  status:
                    event
                      .target
                      .value as Status,
                }
              )
            }
          >
            <option>
              Active
            </option>

            <option>
              Inactive
            </option>
          </select>
        </div>
      </section>

      <section className="summary-grid detail-metrics">
        <Metric
          title="Total Orders"
          value={orders.length}
          icon={
            <ClipboardList size={22} />
          }
        />

        <Metric
          title="Total Booking & Appointment"
          value={
            user.appointments
          }
          green
          icon={
            <Stethoscope size={22} />
          }
        />

        <Metric
          title="Total Family Member"
          value={
            user.family.length
          }
          icon={
            <Users size={22} />
          }
        />

        <Metric
          title="Total Spent"
          value={money(totalSpent)}
          icon={
            <WalletCards size={22} />
          }
        />
      </section>

      <div className="tabs">
        {tabs.map(
          ([key, label, Icon]) => (
            <button
              className={
                tab === key
                  ? "active"
                  : ""
              }
              key={key}
              onClick={() =>
                setTab(key)
              }
            >
              <Icon size={16} />

              {label}
            </button>
          )
        )}
      </div>

      {tab === "overview" && (
        <OverviewPanel
          user={user}
          patchUser={patchUser}
          editUser={() =>
            editUser(user.id)
          }
          addAddress={
            addAddress
          }
          editAddress={
            editAddress
          }
          deleteAddress={
            deleteAddress
          }
        />
      )}

      {tab === "orders" && (
        <OrdersPanel
          orders={orders}
          openOrder={
            openOrder
          }
        />
      )}

      {tab === "payments" && (
        <PaymentsPanel
          orders={orders}
        />
      )}

      {tab === "family" && (
        <FamilyPanel
          members={user.family}
          addMember={
            addMember
          }
          editFamilyMember={
            editFamilyMember
          }
          removeFamilyMember={
            removeFamilyMember
          }
        />
      )}
    </>
  );
}