// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div className="w-screen h-screen flex flex-col items-center justify-center">
//       <h1>Welcome to the homepage</h1>
//       <div>
//         <Link href="/signin">
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
//             Sign In
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// }
import Link from 'next/link';
export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <h1>Welcome to the homepage</h1>
      <div className="h-30 w-30 flex flex-col gap-4">
        <Link href="/signin">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign In
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}
