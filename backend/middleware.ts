import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // ✅ Fix CORS: Allow frontend at http://localhost:3001
  res.headers.set("Access-Control-Allow-Origin", "http://localhost:3001");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // ✅ Handle CORS Preflight (OPTIONS request)
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: res.headers });
  }

  return res;
}
