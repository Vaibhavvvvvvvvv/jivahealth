import type { Order } from "../types";

export const initialOrders: Order[] = [
  {
    id: "ORD-2401",
    userId: 1,
    date: "March 30, 2026",
    status: "Delivered",
    shippingAddress: "Flat 301, Sunshine Apartments, MG Road, Mumbai",
    payment: { id: "PAY-8001", date: "March 30, 2026", amount: 8400, method: "UPI", status: "Paid" },
    items: [
      { name: "Paracetamol 500mg", quantity: 30, price: 250 },
      { name: "Vitamin D3", quantity: 10, price: 590 },
    ],
  },
  {
    id: "ORD-2402",
    userId: 1,
    date: "March 28, 2026",
    status: "Pending",
    shippingAddress: "Flat 301, Sunshine Apartments, MG Road, Mumbai",
    payment: { id: "PAY-8002", date: "March 28, 2026", amount: 5200, method: "Card", status: "Pending" },
    items: [{ name: "Glucose Test Strips", quantity: 2, price: 2600 }],
  },
  {
    id: "ORD-2403",
    userId: 2,
    date: "March 18, 2026",
    status: "Delivered",
    shippingAddress: "14 Lake View Road, Pune",
    payment: { id: "PAY-8003", date: "March 18, 2026", amount: 3900, method: "Cash", status: "Paid" },
    items: [{ name: "BP Monitor", quantity: 1, price: 3900 }],
  },
  {
    id: "ORD-2404",
    userId: 3,
    date: "February 14, 2026",
    status: "Cancelled",
    shippingAddress: "88 Pearl Avenue, Delhi",
    payment: { id: "PAY-8004", date: "February 14, 2026", amount: 1200, method: "UPI", status: "Refunded" },
    items: [{ name: "Cough Syrup", quantity: 2, price: 600 }],
  },
  {
    id: "ORD-2405",
    userId: 1,
    date: "February 1, 2026",
    status: "Delivered",
    shippingAddress: "Flat 301, Sunshine Apartments, MG Road, Mumbai",
    payment: { id: "PAY-8005", date: "February 1, 2026", amount: 10900, method: "Card", status: "Paid" },
    items: [
      { name: "Omega 3 Capsules", quantity: 1, price: 1490 },
      { name: "Insulin Pen Needles", quantity: 2, price: 4705 },
    ],
  },
];
