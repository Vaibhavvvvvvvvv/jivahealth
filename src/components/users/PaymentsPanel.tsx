import {
  CreditCard,
} from "lucide-react";

import { StatusBadge } from "../common/StatusBadge";

import type {
  Order,
} from "../../types";

import { money } from "../../utils/money";

type PaymentsPanelProps = {
  orders: Order[];
};

export function PaymentsPanel({
  orders,
}: PaymentsPanelProps) {
  return (
    <section className="white-panel">
      <div className="panel-title">
        <h2>
          Payment History
        </h2>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state">
          <CreditCard size={42} />

          <h3>
            No payment records
          </h3>

          <p>
            Payments will appear
            here once orders are
            placed.
          </p>
        </div>
      ) : (
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>
                  Payment ID
                </th>

                <th>Date</th>

                <th>Amount</th>

                <th>Method</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr
                  key={
                    order.payment.id
                  }
                >
                  <td>
                    {
                      order.payment.id
                    }
                  </td>

                  <td>
                    {
                      order.payment.date
                    }
                  </td>

                  <td>
                    {money(
                      order.payment
                        .amount
                    )}
                  </td>

                  <td>
                    {
                      order.payment
                        .method
                    }
                  </td>

                  <td>
                    <StatusBadge
                      status={
                        order.payment
                          .status
                      }
                    />
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