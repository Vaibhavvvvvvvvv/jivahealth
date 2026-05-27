export type Status = "Active" | "Inactive";
export type Role = "Patient" | "Nurse";
export type OrderStatus = "Delivered" | "Pending" | "Cancelled";
export type PaymentStatus = "Paid" | "Pending" | "Refunded";
export type Tab = "overview" | "orders" | "payments" | "family";
export type View = "users" | "detail" | "order";

export type Address = {
  id: string;
  type: "Home" | "Work";
  label: string;
  isDefault?: boolean;
};

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  dob: string;
  phone: string;
};

export type User = {
  id: number;
  name: string;
  role: Role;
  status: Status;
  prime: boolean;
  email: string;
  phone: string;
  joined: string;
  lastActive: string;
  appointments: number;
  dob: string;
  gender: string;
  bloodGroup: string;
  addresses: Address[];
  family: FamilyMember[];
};

export type Order = {
  id: string;
  userId: number;
  date: string;
  status: OrderStatus;
  shippingAddress: string;
  payment: {
    id: string;
    date: string;
    amount: number;
    method: "Card" | "UPI" | "Cash";
    status: PaymentStatus;
  };
  items: Array<{ name: string; quantity: number; price: number }>;
};

export type UserFormValues = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  role: Role;
  status: Status;
  area: string;
  pin: string;
  city: string;
  state: string;
  country: string;
};

export type FamilyMemberFormValues = {
  name: string;
  relation: string;
  dob: string;
  phone: string;
};

export type AddressFormValues = {
  type: "Home" | "Work";
  label: string;
  isDefault: boolean;
};
