/* eslint-disable @typescript-eslint/no-unused-vars */

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export function GET(request) {
  // return new Response(`Hello from a Vercel Serverless Function!`);
  return new Response(
    JSON.stringify({ message: 'Hello from a Vercel Serverless Function!' }),
    { status: 200 }
  );
}
