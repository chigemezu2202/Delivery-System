"use client";
// import { useState } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function DeliveryDemo() {
//   const [page, setPage] = useState("order");

//   const renderOrderPage = () => (
//     <Card className="max-w-xl mx-auto mt-10">
//       <CardContent className="p-6 space-y-4">
//         <h2 className="text-xl font-bold">Place an Order</h2>
//         <input className="w-full border p-2" placeholder="Pickup Location" />
//         <input className="w-full border p-2" placeholder="Delivery Location" />
//         <input className="w-full border p-2" placeholder="Item Description" />
//         <Button>Submit Order</Button>
//       </CardContent>
//     </Card>
//   );

//   const renderDashboard = () => (
//     <Card className="max-w-2xl mx-auto mt-10">
//       <CardContent className="p-6 space-y-4">
//         <h2 className="text-xl font-bold">Admin Dashboard</h2>
//         <div className="border p-3">Order #001 - Pending</div>
//         <div className="border p-3">Order #002 - In Transit</div>
//         <div className="border p-3">Order #003 - Delivered</div>
//       </CardContent>
//     </Card>
//   );

//   const renderTracking = () => (
//     <Card className="max-w-xl mx-auto mt-10">
//       <CardContent className="p-6 space-y-4">
//         <h2 className="text-xl font-bold">Live Tracking</h2>
//         <div className="h-40 border flex items-center justify-center">
//           Rider is on the way...
//         </div>
//       </CardContent>
//     </Card>
//   );

//   return (
//     <div className="p-6">
//       <div className="flex gap-2 justify-center">
//         <Button onClick={() => setPage("order")}>Order Page</Button>
//         <Button onClick={() => setPage("dashboard")}>Admin Dashboard</Button>
//         <Button onClick={() => setPage("tracking")}>Tracking</Button>
//       </div>

//       {page === "order" && renderOrderPage()}
//       {page === "dashboard" && renderDashboard()}
//       {page === "tracking" && renderTracking()}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DeliveryDemo() {
  const [page, setPage] = useState("login");
  const [role, setRole] = useState("customer");
  const [notify, setNotify] = useState("");
  const [pos, setPos] = useState({ x: 10, y: 50 });

  // Fake rider movement (map simulation)
  useEffect(() => {
    if (page !== "tracking") return;
    const id = setInterval(() => {
      setPos((p) => ({ x: Math.min(p.x + 5, 90), y: p.y }));
    }, 800);
    return () => clearInterval(id);
  }, [page]);

  // Fake notifications
  useEffect(() => {
    if (page === "dashboard") {
      setNotify("New order received!");
      setTimeout(() => setNotify(""), 3000);
    }
  }, [page]);

  const renderLogin = () => (
    <Card className="max-w-sm mx-auto mt-20 bg-zinc-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>
        <Input placeholder="Email" />
        <Input placeholder="Password" type="password" />
        <Button onClick={() => setPage("order")} className="w-full">Enter</Button>
      </CardContent>
    </Card>
  );

  const renderOrder = () => (
    <Card className="max-w-xl mx-auto mt-10 bg-zinc-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Place an Order</h2>
        <Input placeholder="Pickup Location" />
        <Input placeholder="Delivery Location" />
        <Input placeholder="Item Description" />
        <Button onClick={() => setPage("payment")}>Proceed</Button>
      </CardContent>
    </Card>
  );

  const renderPayment = () => (
    <Card className="max-w-xl mx-auto mt-10 bg-zinc-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Payment</h2>
        <p>Card / Transfer simulation</p>
        <Button onClick={() => setPage("tracking")}>Pay Now</Button>
      </CardContent>
    </Card>
  );

  const renderDashboard = () => (
    <Card className="max-w-2xl mx-auto mt-10 bg-zinc-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <div className="border p-3">Order #001 - Pending</div>
        <div className="border p-3">Order #002 - In Transit</div>
        <div className="border p-3">Order #003 - Delivered</div>
      </CardContent>
    </Card>
  );

  const renderTracking = () => (
    <Card className="max-w-xl mx-auto mt-10 bg-zinc-900 text-white">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Live Tracking (Map Simulation)</h2>
        <div className="relative h-56 border bg-black">
          <div
            className="absolute w-4 h-4 bg-green-500 rounded-full"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          />
          <p className="absolute bottom-2 left-2 text-xs">Rider moving...</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      {/* Notification */}
      {notify && (
        <div className="fixed top-4 right-4 bg-green-600 px-4 py-2 rounded shadow">
          {notify}
        </div>
      )}

      {/* Role Switch */}
      {page !== "login" && (
        <div className="flex flex-col items-center gap-3 mb-6">
          <div className="flex gap-2">
            <Button onClick={() => setRole("customer")}>Customer</Button>
            <Button onClick={() => setRole("admin")}>Admin</Button>
            <Button onClick={() => setRole("rider")}>Rider</Button>
          </div>

          <div className="flex gap-2">
            {role === "customer" && (
              <>
                <Button onClick={() => setPage("order")}>Order</Button>
                <Button onClick={() => setPage("tracking")}>Track</Button>
              </>
            )}
            {role === "admin" && (
              <Button onClick={() => setPage("dashboard")}>Dashboard</Button>
            )}
            {role === "rider" && (
              <Button onClick={() => setPage("tracking")}>Delivery View</Button>
            )}
          </div>
        </div>
      )}

      {page === "login" && renderLogin()}
      {page === "order" && renderOrder()}
      {page === "payment" && renderPayment()}
      {page === "dashboard" && renderDashboard()}
      {page === "tracking" && renderTracking()}
    </div>
  );
}

