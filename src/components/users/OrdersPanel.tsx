import {
  ClipboardList,
} from "lucide-react";

import { StatusBadge } from "../common/StatusBadge";

import type {
  Order,
} from "../../types";

import { money } from "../../utils/money";

type OrdersPanelProps = {
  orders: Order[];

  openOrder: (
    id: string
  ) => void;
};

export function OrdersPanel({
  orders,
  openOrder,
}: OrdersPanelProps) {
  return (
    <section className="white-panel">
      <div className="panel-title">
        <h2>Order History</h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={42} />

          <h3>
            No orders available
          </h3>

          <p>
            This user has not placed
            any orders yet.
          </p>
        </div>
      ) : (
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>

                <th>Date</th>

                <th>Items</th>

                <th>
                  Total Amount
                </th>

                <th>Status</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>

                  <td>
                    {order.date}
                  </td>

                  <td>
                    {order.items
                      .map(
                        (item) =>
                          `${item.name} - ${item.quantity}`
                      )
                      .join(", ")}
                  </td>

                  <td>
                    {money(
                      order.payment.amount
                    )}
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        order.status
                      }
                    />
                  </td>

                  <td>
                    <button
                      className="outline-button"
                      onClick={() =>
                        openOrder(
                          order.id
                        )
                      }
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}