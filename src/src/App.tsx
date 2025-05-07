
import './App.css'
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="p-4 bg-white shadow-md">TeacherUC</header>
      <main className="p-6">
        
        <Outlet />
      </main>
    </div>
  );
}
