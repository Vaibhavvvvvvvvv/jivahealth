import { create } from "zustand";

import { persist } from "zustand/middleware";

import { initialOrders } from "../data/orders";
import { initialUsers } from "../data/users";

import type {
  Address,
  FamilyMember,
  Order,
  Role,
  Status,
  Tab,
  User,
} from "../types";

type UserStore = {
  // DATA
  users: User[];

  orders: Order[];

  // UI STATE
  tab: Tab;

  // FILTERS
  query: string;

  statusFilter:
    | "All"
    | Status;

  roleFilter:
    | "All"
    | Role;

  // UI ACTIONS
  setTab: (
    tab: Tab
  ) => void;

  setQuery: (
    query: string
  ) => void;

  setStatusFilter: (
    status:
      | "All"
      | Status
  ) => void;

  setRoleFilter: (
    role:
      | "All"
      | Role
  ) => void;

  resetFilters: () => void;

  // USER CRUD
  addUser: (
    user: User
  ) => void;

  updateUser: (
    id: number,
    patch: Partial<User>
  ) => void;

  deleteUser: (
    id: number
  ) => void;

  togglePrime: (
    id: number
  ) => void;

  // FAMILY CRUD
  addFamilyMember: (
    userId: number,
    member: FamilyMember
  ) => void;

  updateFamilyMember: (
    userId: number,
    memberId: string,
    patch: Partial<FamilyMember>
  ) => void;

  deleteFamilyMember: (
    userId: number,
    memberId: string
  ) => void;

  // ADDRESS CRUD
  addAddress: (
    userId: number,
    address: Address
  ) => void;

  updateAddress: (
    userId: number,
    addressId: string,
    patch: Partial<Address>
  ) => void;

  deleteAddress: (
    userId: number,
    addressId: string
  ) => void;
};

export const useUserStore =
  create<UserStore>()(
    persist(
      (set) => ({
        // INITIAL DATA
        users: initialUsers,

        orders: initialOrders,

        // UI STATE
        tab: "overview",

        // FILTERS
        query: "",

        statusFilter: "All",

        roleFilter: "All",

        // UI ACTIONS
        setTab: (tab) =>
          set({ tab }),

        setQuery: (
          query
        ) =>
          set({
            query,
          }),

        setStatusFilter: (
          status
        ) =>
          set({
            statusFilter:
              status,
          }),

        setRoleFilter: (
          role
        ) =>
          set({
            roleFilter: role,
          }),

        resetFilters: () =>
          set({
            query: "",
            statusFilter:
              "All",
            roleFilter:
              "All",
          }),

        // USER CRUD
        addUser: (user) =>
          set((state) => ({
            users: [
              user,
              ...state.users,
            ],
          })),

        updateUser: (
          id,
          patch
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) =>
                  user.id === id
                    ? {
                        ...user,
                        ...patch,
                      }
                    : user
              ),
          })),

        deleteUser: (id) =>
          set((state) => ({
            users:
              state.users.filter(
                (user) =>
                  user.id !== id
              ),
          })),

        togglePrime: (id) =>
          set((state) => ({
            users:
              state.users.map(
                (user) =>
                  user.id === id
                    ? {
                        ...user,
                        prime:
                          !user.prime,
                      }
                    : user
              ),
          })),

        // FAMILY CRUD
        addFamilyMember: (
          userId,
          member
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) =>
                  user.id ===
                  userId
                    ? {
                        ...user,
                        family: [
                          member,
                          ...user.family,
                        ],
                      }
                    : user
              ),
          })),

        updateFamilyMember: (
          userId,
          memberId,
          patch
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) =>
                  user.id ===
                  userId
                    ? {
                        ...user,
                        family:
                          user.family.map(
                            (
                              member
                            ) =>
                              member.id ===
                              memberId
                                ? {
                                    ...member,
                                    ...patch,
                                  }
                                : member
                          ),
                      }
                    : user
              ),
          })),

        deleteFamilyMember: (
          userId,
          memberId
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) =>
                  user.id ===
                  userId
                    ? {
                        ...user,
                        family:
                          user.family.filter(
                            (
                              member
                            ) =>
                              member.id !==
                              memberId
                          ),
                      }
                    : user
              ),
          })),

        // ADDRESS CRUD
        addAddress: (
          userId,
          address
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) => {
                  if (
                    user.id !==
                    userId
                  ) {
                    return user;
                  }

                  const updatedAddresses =
                    address.isDefault
                      ? user.addresses.map(
                          (
                            item
                          ) => ({
                            ...item,
                            isDefault:
                              false,
                          })
                        )
                      : user.addresses;

                  return {
                    ...user,

                    addresses: [
                      address,
                      ...updatedAddresses,
                    ],
                  };
                }
              ),
          })),

        updateAddress: (
          userId,
          addressId,
          patch
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) => {
                  if (
                    user.id !==
                    userId
                  ) {
                    return user;
                  }

                  const updatedAddresses =
                    patch.isDefault
                      ? user.addresses.map(
                          (
                            address
                          ) => ({
                            ...address,
                            isDefault:
                              false,
                          })
                        )
                      : user.addresses;

                  return {
                    ...user,

                    addresses:
                      updatedAddresses.map(
                        (
                          address
                        ) =>
                          address.id ===
                          addressId
                            ? {
                                ...address,
                                ...patch,
                              }
                            : address
                      ),
                  };
                }
              ),
          })),

        deleteAddress: (
          userId,
          addressId
        ) =>
          set((state) => ({
            users:
              state.users.map(
                (user) => {
                  if (
                    user.id !==
                    userId
                  ) {
                    return user;
                  }

                  const remaining =
                    user.addresses.filter(
                      (
                        address
                      ) =>
                        address.id !==
                        addressId
                    );

                  if (
                    remaining.length >
                      0 &&
                    !remaining.some(
                      (
                        address
                      ) =>
                        address.isDefault
                    )
                  ) {
                    remaining[0].isDefault =
                      true;
                  }

                  return {
                    ...user,

                    addresses:
                      remaining,
                  };
                }
              ),
          })),
      }),
      {
        name:
          "jiva-health-storage",
      }
    )
  );