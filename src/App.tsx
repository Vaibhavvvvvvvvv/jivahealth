import { useMemo, useState } from "react";

import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

import { useUserStore } from "./store/useUserStore";

import { Header } from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";

import { AddressModal } from "./components/modals/AddressModal";
import { AddMemberModal } from "./components/modals/AddMemberModal";
import { AddUserModal } from "./components/modals/AddUserModal";

import { UserDetail } from "./components/users/UserDetail";

import { OrderDetailPage } from "./pages/OrderDetailPage";
import { UserManagementPage } from "./pages/UserManagementPage";

import type {
  Address,
  AddressFormValues,
  FamilyMember,
  FamilyMemberFormValues,
  User,
  UserFormValues,
} from "./types";

function UsersRoute() {
  const navigate = useNavigate();

  const {
    users,
    query,

    orders,

    tab,

    statusFilter,
    roleFilter,

    setTab,

    setStatusFilter,
    setRoleFilter,

    addUser,
    updateUser,
  } = useUserStore();

  const [showUserModal, setShowUserModal] =
    useState(false);

  const [editingUserId, setEditingUserId] =
    useState<number | null>(null);

  const editingUser = useMemo(
    () =>
      editingUserId
        ? users.find(
            (user) =>
              user.id === editingUserId
          )
        : undefined,
    [editingUserId, users]
  );

  const visibleUsers = useMemo(() => {
    const term = query.toLowerCase();

    return users.filter((user) => {
      const textMatch = [
        user.name,
        user.email,
        user.phone,
      ].some((value) =>
        value
          .toLowerCase()
          .includes(term)
      );

      const statusMatch =
        statusFilter === "All" ||
        user.status === statusFilter;

      const roleMatch =
        roleFilter === "All" ||
        user.role === roleFilter;

      return (
        textMatch &&
        statusMatch &&
        roleMatch
      );
    });
  }, [
    users,
    query,
    statusFilter,
    roleFilter,
  ]);

  const familyCount = useMemo(
    () =>
      users.reduce(
        (sum, user) =>
          sum + user.family.length,
        0
      ),
    [users]
  );

  const saveUser = (
    values: UserFormValues
  ) => {
    const addressLabel = [
      values.area,
      values.city,
      values.state,
      values.country,
    ]
      .filter(Boolean)
      .join(", ");

    if (editingUserId) {
      updateUser(editingUserId, {
        name: values.name,
        email: values.email,
        phone: values.phone,
        dob: values.dob,
        gender: values.gender,
        bloodGroup: values.bloodGroup,
        role: values.role,
        status: values.status,
      });

      setShowUserModal(false);

      setEditingUserId(null);

      return;
    }

    const newUser: User = {
      id:
        Math.max(
          ...users.map(
            (user) => user.id
          )
        ) + 1,

      name: values.name,

      email: values.email,

      phone: values.phone,

      dob: values.dob,

      gender: values.gender,

      bloodGroup:
        values.bloodGroup,

      role: values.role,

      status: values.status,

      prime: false,

      joined:
        new Date().toLocaleDateString(
          "en-IN"
        ),

      lastActive: "Today",

      appointments: 0,

      addresses: [
        {
          id: `A${Date.now()}`,

          type: "Home",

          label:
            addressLabel,

          isDefault: true,
        },
      ],

      family: [],
    };

    addUser(newUser);

    setShowUserModal(false);
  };

  return (
    <>
      <UserManagementPage
        users={visibleUsers}
        totalUsers={
          users.length
        }
        primeUsers={
          users.filter(
            (user) =>
              user.prime
          ).length
        }
        familyCount={
          familyCount
        }
        statusFilter={
          statusFilter
        }
        roleFilter={
          roleFilter
        }
        setStatusFilter={
          setStatusFilter
        }
        setRoleFilter={
          setRoleFilter
        }
        openUser={(id) => {
          setTab("overview");

          navigate(
            `/users/${id}`
          );
        }}
        patchUser={
          updateUser
        }
        editUser={(id) => {
          setEditingUserId(
            id
          );

          setShowUserModal(
            true
          );
        }}
        showAddUser={() => {
          setEditingUserId(
            null
          );

          setShowUserModal(
            true
          );
        }}
      />

      {showUserModal && (
        <AddUserModal
          close={() => {
            setShowUserModal(
              false
            );

            setEditingUserId(
              null
            );
          }}
          saveUser={saveUser}
          initialUser={
            editingUser
          }
        />
      )}
    </>
  );
}

function UserDetailRoute() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    users,
    orders,

    tab,
    setTab,

    updateUser,

    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,

    addAddress,
    updateAddress,
    deleteAddress,
  } = useUserStore();

  const [showMemberModal, setShowMemberModal] =
    useState(false);

  const [showAddressModal, setShowAddressModal] =
    useState(false);

  const [editingMemberId, setEditingMemberId] =
    useState<string | null>(null);

  const [editingAddressId, setEditingAddressId] =
    useState<string | null>(null);

  const user = users.find(
    (user) =>
      user.id === Number(id)
  );

  if (!user) {
    return <Navigate to="/" />;
  }

  const userOrders =
    orders.filter(
      (order) =>
        order.userId === user.id
    );

  const totalSpent =
    userOrders.reduce(
      (sum, order) =>
        sum + order.payment.amount,
      0
    );

  const editingMember =
    editingMemberId
      ? user.family.find(
          (member) =>
            member.id ===
            editingMemberId
        )
      : undefined;

  const editingAddress =
    editingAddressId
      ? user.addresses.find(
          (address) =>
            address.id ===
            editingAddressId
        )
      : undefined;

  const saveFamilyMember = (
    values: FamilyMemberFormValues
  ) => {
    if (editingMemberId) {
      updateFamilyMember(
        user.id,
        editingMemberId,
        values
      );

      setEditingMemberId(null);

      setShowMemberModal(false);

      return;
    }

    const member: FamilyMember = {
      id: `F${Date.now()}`,
      ...values,
    };

    addFamilyMember(
      user.id,
      member
    );

    setShowMemberModal(false);
  };

  const saveAddress = (
    values: AddressFormValues
  ) => {
    if (editingAddressId) {
      updateAddress(
        user.id,
        editingAddressId,
        values
      );

      setEditingAddressId(null);

      setShowAddressModal(false);

      return;
    }

    const address: Address = {
      id: `A${Date.now()}`,
      ...values,
    };

    addAddress(
      user.id,
      address
    );

    setShowAddressModal(false);
  };

  return (
    <>
      <UserDetail
        user={user}
        orders={userOrders}
        totalSpent={
          totalSpent
        }
        tab={tab}
        setTab={setTab}
        back={() =>
          navigate("/")
        }
        patchUser={
          updateUser
        }
        editUser={() => {}}
        openOrder={(id) =>
          navigate(
            `/orders/${id}`
          )
        }
        addMember={() => {
          setEditingMemberId(
            null
          );

          setShowMemberModal(
            true
          );
        }}
        editFamilyMember={(
          id
        ) => {
          setEditingMemberId(
            id
          );

          setShowMemberModal(
            true
          );
        }}
        removeFamilyMember={(
          id
        ) =>
          deleteFamilyMember(
            user.id,
            id
          )
        }
        addAddress={() => {
          setEditingAddressId(
            null
          );

          setShowAddressModal(
            true
          );
        }}
        editAddress={(id) => {
          setEditingAddressId(
            id
          );

          setShowAddressModal(
            true
          );
        }}
        deleteAddress={(id) =>
          deleteAddress(
            user.id,
            id
          )
        }
      />

      {showMemberModal && (
        <AddMemberModal
          close={() => {
            setShowMemberModal(
              false
            );

            setEditingMemberId(
              null
            );
          }}
          saveMember={
            saveFamilyMember
          }
          initialMember={
            editingMember
          }
        />
      )}

      {showAddressModal && (
        <AddressModal
          close={() => {
            setShowAddressModal(
              false
            );

            setEditingAddressId(
              null
            );
          }}
          saveAddress={
            saveAddress
          }
          initialAddress={
            editingAddress
          }
        />
      )}
    </>
  );
}

function OrderRoute() {
  const navigate = useNavigate();

  const { id } = useParams();

  const {
    orders,
    users,
  } = useUserStore();

  const order = orders.find(
    (order) =>
      order.id === id
  );

  if (!order) {
    return <Navigate to="/" />;
  }

  const user = users.find(
    (user) =>
      user.id === order.userId
  );

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <OrderDetailPage
      order={order}
      user={user}
      back={() =>
        navigate(
          `/users/${user.id}`
        )
      }
    />
  );
}

export default function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <section className="workspace">
        <Header />

        <main className="page">
          <Routes>
            <Route
              path="/"
              element={
                <UsersRoute />
              }
            />

            <Route
              path="/users/:id"
              element={
                <UserDetailRoute />
              }
            />

            <Route
              path="/orders/:id"
              element={
                <OrderRoute />
              }
            />
          </Routes>
        </main>
      </section>
    </div>
  );
}