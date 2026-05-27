import {
  CalendarDays,
  CreditCard,
  MapPin,
  PackageCheck,
  Pill,
} from "lucide-react";

import { StatusBadge } from "../components/common/StatusBadge";

import type {
  Order,
  User,
} from "../types";

import { money } from "../utils/money";

type OrderDetailPageProps = {
  order: Order;

  user: User;

  back: () => void;
};

export function OrderDetailPage({
  order,
  user,
  back,
}: OrderDetailPageProps) {
  const subtotal =
    order.items.reduce(
      (sum, item) =>
        sum +
        item.price *
          item.quantity,
      0
    );

  return (
    <>
      <button
        className="back-button"
        onClick={back}
      >
        ← Back to User Management
      </button>

      <section className="white-panel order-detail">
        <div className="panel-title">
          <div>
            <h2>
              Order Detail
            </h2>

            <p>
              {order.id} for{" "}
              {user.name}
            </p>
          </div>

          <StatusBadge
            status={
              order.status
            }
          />
        </div>

        <div className="order-grid">
          <div>
            <span>
              <MapPin size={15} />
              Shipping Address
            </span>

            <strong>
              {
                order.shippingAddress
              }
            </strong>
          </div>

          <div>
            <span>
              <CreditCard size={15} />
              Payment Method
            </span>

            <strong>
              {
                order.payment
                  .method
              }
            </strong>
          </div>

          <div>
            <span>
              <PackageCheck size={15} />
              Payment ID
            </span>

            <strong>
              {
                order.payment.id
              }
            </strong>
          </div>

          <div>
            <span>
              <CalendarDays size={15} />
              Order Date
            </span>

            <strong>
              {order.date}
            </strong>
          </div>
        </div>

        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>
                  Medicine Name
                </th>

                <th>
                  Quantity
                </th>

                <th>
                  Price
                </th>

                <th>
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {order.items.map(
                (item) => (
                  <tr
                    key={item.name}
                  >
                    <td>
                      <div className="medicine-cell">
                        <Pill
                          size={
                            16
                          }
                        />

                        {
                          item.name
                        }
                      </div>
                    </td>

                    <td>
                      {
                        item.quantity
                      }
                    </td>

                    <td>
                      {money(
                        item.price
                      )}
                    </td>

                    <td>
                      {money(
                        item.price *
                          item.quantity
                      )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        <div className="order-summary">
          <div>
            <span>
              Subtotal
            </span>

            <strong>
              {money(
                subtotal
              )}
            </strong>
          </div>

          <div>
            <span>
              Delivery Fee
            </span>

            <strong>
              ₹0
            </strong>
          </div>

          <div className="grand-total">
            <span>
              Grand Total
            </span>

            <strong>
              {money(
                order.payment
                  .amount
              )}
            </strong>
          </div>
        </div>
      </section>
    </>
  );
}