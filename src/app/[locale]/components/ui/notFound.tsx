"use client";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-gray-100">
        404 - Page Not Found APP [lang]
        {/* {dictionary["server-component"].welcome} */}
      </h1>
      <p className="text-lg text-center text-gray-500 dark:text-gray-400">
        Sorry, the page you are looking for might have been removed or is
        temporarily unavailable.
      </p>
    </div>
  );
}
