'use client';

export default function TestPage() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold">Test Page - {new Date().toLocaleTimeString()}</h1>
      <p className="mt-4">If you can see this page and the current time above, Next.js is working correctly.</p>
    </div>
  );
}
