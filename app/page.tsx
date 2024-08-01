import Link from "next/link";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to OKX Racer</h1>
      <div className="flex space-x-4">
        <Link href="/pages/game">
          <p className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Start Game</p>
        </Link>
        <Link href="/pages/leaderboard">
          <p className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Leaderboard</p>
        </Link>
      </div>
    </div>
  );
};

export default Home;
