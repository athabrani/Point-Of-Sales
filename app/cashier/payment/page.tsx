"use client";
import { ProcessPayment } from "@/components/cashier/processpayment";

export default function PaymentPage() {
  return (
    <ProcessPayment
      orderItems={[]}
      subtotal={0}
      tax={0}
      total={0}
      onBack={() => {}}
      onPaymentComplete={() => {}}
    />
  );
}
