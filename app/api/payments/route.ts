// app/api/payments/route.ts
export async function GET() {
  const res = await fetch("http://localhost:3001/getPayments", { cache: "no-store" });
  const payload = await res.json(); // { success, payments }
  return new Response(
    JSON.stringify({
      success: payload.success,
      data: payload.payments || [],
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
