import React, { useEffect, useState } from "react";
import { cancelOrder, getMyOrders, getOrderById } from "@/services/orderService";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [cancelLoading, setCancelLoading] = useState(false);
const [cancelError, setCancelError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getMyOrders();

        setOrders(response.data.data);
      } catch (error) {
        console.error(error);

        setError(error.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = async (orderId) => {
    try {
      setOrderLoading(true);

      const response = await getOrderById(orderId);

      setSelectedOrder(response.data.data);
      setDialogOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setOrderLoading(false);
    }
  };
const handleCancelOrder = async () => {
  if (!selectedOrder) {
    return;
  }

  try {
    setCancelLoading(true);
    setCancelError("");

    const response = await cancelOrder(selectedOrder._id);

    const cancelledOrder = response.data.data;

    setSelectedOrder(cancelledOrder);

    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order._id === cancelledOrder._id
          ? cancelledOrder
          : order
      )
    );
  } catch (error) {
    console.error(error);

    setCancelError(
      error.response?.data?.message ||
        "Failed to cancel order"
    );
  } finally {
    setCancelLoading(false);
  }
};

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (orders.length === 0) {
    return <div>You have no orders yet.</div>;
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.map((order) => (
        <div key={order._id}>
          <h2>Order ID: {order._id}</h2>

          <p>Placed On: {new Date(order.placedAt).toLocaleString()}</p>

          <p>Order Status: {order.orderStatus}</p>

          <p>Payment Method: {order.paymentMethod}</p>

          <p>Payment Status: {order.paymentStatus}</p>

          <h3>Items</h3>

          {order.items.map((item) => (
            <div key={item._id}>
              <img src={item.productImage} alt={item.productName} width="100" />

              <p>{item.productName}</p>

              <p>Price: ₹{item.priceAtPurchase}</p>

              <p>Quantity: {item.quantity}</p>

              <p>Subtotal: ₹{item.subtotal}</p>
            </div>
          ))}

          <p>Total Items: {order.totalItems}</p>

          <p>Total Price: ₹{order.totalPrice}</p>

          <p>Discount: ₹{order.discount}</p>

          <p>Tax: ₹{order.tax}</p>

          <h3>Final Amount: ₹{order.finalAmount}</h3>

          <button type="button" onClick={() => handleViewOrder(order._id)}>
            View Details
          </button>

          <hr />
        </div>
      ))}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>

            <DialogDescription>
              Complete information about your order.
            </DialogDescription>
          </DialogHeader>

          {orderLoading ? (
            <p>Loading order details...</p>
          ) : selectedOrder ? (
            <div>
              <h3>Order Information</h3>

              <p>Order ID: {selectedOrder._id}</p>

              <p>
                Placed On: {new Date(selectedOrder.placedAt).toLocaleString()}
              </p>

              <p>Order Status: {selectedOrder.orderStatus}</p>

              <p>Payment Method: {selectedOrder.paymentMethod}</p>

              <p>Payment Status: {selectedOrder.paymentStatus}</p>

              <h3>Shipping Address</h3>

              <p>{selectedOrder.shippingAddress.fullName}</p>

              <p>{selectedOrder.shippingAddress.phone}</p>

              <p>{selectedOrder.shippingAddress.addressLine1}</p>

              {selectedOrder.shippingAddress.addressLine2 && (
                <p>{selectedOrder.shippingAddress.addressLine2}</p>
              )}

              <p>
                {selectedOrder.shippingAddress.city},{" "}
                {selectedOrder.shippingAddress.state}
              </p>

              <p>{selectedOrder.shippingAddress.pincode}</p>

              <p>{selectedOrder.shippingAddress.country}</p>

              <h3>Items</h3>

              {selectedOrder.items.map((item) => (
                <div key={item._id}>
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    width="100"
                  />

                  <p>{item.productName}</p>

                  <p>Price: ₹{item.priceAtPurchase}</p>

                  <p>Quantity: {item.quantity}</p>

                  <p>Subtotal: ₹{item.subtotal}</p>
                </div>
              ))}

              <h3>Price Summary</h3>

              <p>Total Items: {selectedOrder.totalItems}</p>

              <p>Total Price: ₹{selectedOrder.totalPrice}</p>

              <p>Discount: ₹{selectedOrder.discount}</p>

              <p>Tax: ₹{selectedOrder.tax}</p>

              <h3>Final Amount: ₹{selectedOrder.finalAmount}</h3>
              {cancelError && (
  <p>{cancelError}</p>
)}

{selectedOrder.orderStatus !== "Delivered" &&
  selectedOrder.orderStatus !== "Cancelled" &&
  selectedOrder.orderStatus !== "Returned" && (
    <button
    className="border-2"
      type="button"
      onClick={handleCancelOrder}
      disabled={cancelLoading}
    >
      {cancelLoading
        ? "Cancelling..."
        : "Cancel Order"}
    </button>
  )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
