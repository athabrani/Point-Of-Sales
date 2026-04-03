export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const query = searchParams.toString();

  const res = await fetch(
    `https://pos-system-be-pi.vercel.app/orders?${query}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();

  return Response.json(data);
}
