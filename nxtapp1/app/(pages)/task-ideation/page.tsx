import Link from "next/link";

export default function TaskIdeation() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Ideation</h1>
        <Link href="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Return to Dashboard
          </button>
        </Link>
      </div>
      <p>This is the Task Ideation page.</p>
    </div>
  );
}