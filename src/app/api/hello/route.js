/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */

export const dynamic = 'force-dynamic'; // static by default, unless reading the request

export function GET(request) {
  return new Response(`Hello from a Vercel Serverless Function!`);
}
