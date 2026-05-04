"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DeliveryDemo() {
  const [page, setPage] = useState("order");

  const renderOrderPage = () => (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Place an Order</h2>
        <input className="w-full border p-2" placeholder="Pickup Location" />
        <input className="w-full border p-2" placeholder="Delivery Location" />
        <input className="w-full border p-2" placeholder="Item Description" />
        <Button>Submit Order</Button>
      </CardContent>
    </Card>
  );

  const renderDashboard = () => (
    <Card className="max-w-2xl mx-auto mt-10">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <div className="border p-3">Order #001 - Pending</div>
        <div className="border p-3">Order #002 - In Transit</div>
        <div className="border p-3">Order #003 - Delivered</div>
      </CardContent>
    </Card>
  );

  const renderTracking = () => (
    <Card className="max-w-xl mx-auto mt-10">
      <CardContent className="p-6 space-y-4">
        <h2 className="text-xl font-bold">Live Tracking</h2>
        <div className="h-40 border flex items-center justify-center">
          Rider is on the way...
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="flex gap-2 justify-center">
        <Button onClick={() => setPage("order")}>Order Page</Button>
        <Button onClick={() => setPage("dashboard")}>Admin Dashboard</Button>
        <Button onClick={() => setPage("tracking")}>Tracking</Button>
      </div>

      {page === "order" && renderOrderPage()}
      {page === "dashboard" && renderDashboard()}
      {page === "tracking" && renderTracking()}
    </div>
  );
}
