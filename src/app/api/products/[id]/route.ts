import { NextResponse } from "next/server";

type Params = {
  params: Promise<{ id: string }>;
};

export async function GET(req: Request, { params }: Params) {
  const { id } = await params;

  const res = await fetch(
    `https://fakestoreapi.com/products/${id}`,
    {
      headers: { Accept: "application/json" },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return NextResponse.json(null, { status: 404 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
