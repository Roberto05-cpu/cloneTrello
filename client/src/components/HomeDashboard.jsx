import React, { useState } from "react";
import { BarChart3, Gauge, Target, Timer } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HomeDashboard = () => {
  const navigate = useNavigate();
  const [showImputBoard, setShowImputBoard] = useState(false);

  return (
    <div className="m-5 max-h-screen overflow-y-auto pb-10">
      <div className="flex justify-between items-center">
        <h1 className="md:text-3xl text-[20px] font-bold">Dashboard</h1>
        <button
          onClick={() => setShowImputBoard(true)}
          className="bg-blue-800 text-white py-2 px-8 text-center font-semibold rounded-[5px] mr-5 md:mr-0"
        >
          New Board
        </button>
      </div>
      <div className=" mt-5 max-w-[2000px] overflow-x-auto flex items-center gap-5">
        <div className="w-[300px] h-[150px] bg-blue-200 rounded-[10px] hover:bg-blue-500 hover:text-white ">
          <div className="p-3 flex items-center justify-between">
            <p className="text-sm">Total Boards</p>
            <BarChart3 size={26} />
          </div>
          <p className="text-center mt-5 font-bold text-3xl">10</p>
        </div>
        <div className="w-[300px] h-[150px] bg-blue-200 rounded-[10px] hover:bg-blue-500 hover:text-white">
          <div className="p-3 flex items-center justify-between">
            <p className="text-sm">Total Lists</p>
            <BarChart3 size={26} />
          </div>
          <p className="text-center mt-5 font-bold text-3xl">10</p>
        </div>
        <div className="w-[300px] h-[150px] bg-blue-200 rounded-[10px] hover:bg-blue-500 hover:text-white">
          <div className="p-3 flex items-center justify-between">
            <p className="text-sm">Total Cards</p>
            <BarChart3 size={26} />
          </div>
          <p className="text-center mt-5 font-bold text-3xl">10</p>
        </div>
        <div className="w-[300px] h-[150px] bg-blue-200 rounded-[10px] hover:bg-blue-500 hover:text-white">
          <div className="p-3 flex items-center justify-between">
            <p className="text-sm">Fiabiliy App</p>
            <BarChart3 size={26} />
          </div>
          <p className="text-center mt-5 font-bold text-3xl">90%</p>
        </div>
      </div>
      <div className="mt-5">
        <h2 className="font-bold text-2xl">Repartition par Boards</h2>
        <div className=" mt-5 flex items-center gap-5">
          <div className="w-[200px] h-[100px] cursor-pointer shadow shadow-blue-200 rounded-[10px]">
            <h3 className="text-center p-2 text-blue-500 font-bold text-[16px">
              Mon physique
            </h3>
            <p className="text-center p-2">
              Lists : <span className="font-bold text-blue-500">10</span>
            </p>
            <p className="text-center">
              Cards : <span className="font-bold text-blue-500">20</span>
            </p>
          </div>
          <div className="w-[200px] h-[100px] cursor-pointer shadow shadow-blue-200 rounded-[10px]">
            <h3 className="text-center p-2 text-blue-500 font-bold text-[16px">
              Mon physique
            </h3>
            <p className="text-center p-2">
              Lists : <span className="font-bold text-blue-500">10</span>
            </p>
            <p className="text-center">
              Cards : <span className="font-bold text-blue-500">20</span>
            </p>
          </div>
          <div className="w-[200px] h-[100px] cursor-pointer shadow shadow-blue-200 rounded-[10px]">
            <h3 className="text-center p-2 text-blue-500 font-bold text-[16px">
              Mon physique
            </h3>
            <p className="text-center p-2">
              Lists : <span className="font-bold text-blue-500">10</span>
            </p>
            <p className="text-center">
              Cards : <span className="font-bold text-blue-500">20</span>
            </p>
          </div>
          <div className="w-[200px] h-[100px] cursor-pointer shadow shadow-blue-200 rounded-[10px]">
            <h3 className="text-center p-2 text-blue-500 font-bold text-[16px">
              Mon physique
            </h3>
            <p className="text-center p-2">
              Lists : <span className="font-bold text-blue-500">10</span>
            </p>
            <p className="text-center">
              Cards : <span className="font-bold text-blue-500">20</span>
            </p>
          </div>
          <div className="w-[200px] h-[100px] cursor-pointer shadow shadow-blue-200 rounded-[10px]">
            <h3 className="text-center p-2 text-blue-500 font-bold text-[16px">
              Mon physique
            </h3>
            <p className="text-center p-2">
              Lists : <span className="font-bold text-blue-500">10</span>
            </p>
            <p className="text-center">
              Cards : <span className="font-bold text-blue-500">20</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-2xl">Details Cards</h2>
          <button
            onClick={() => navigate("/dashboard_card_details")}
            className="py-2 px-6 bg-blue-800 text-white font-semibold rounded-[10px] cursor-pointer"
          >
            Show More
          </button>
        </div>
        <table className="w-full text-left mt-3">
          <thead>
            <tr className="border-b border-blue-800">
              <th className="py-3">Order</th>
              <th className="py-3">Card</th>
              <th className="py-3">List</th>
              <th className="py-3">Board</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-blue-800/50">
              <td className="py-3 font-medium">0</td>
              <td className="py-3">Aller a la salle</td>
              <td className="py-3">A faire</td>
              <td className="py-3">Mon Physique</td>
            </tr>
            <tr className="border-b border-blue-800/50">
              <td className="py-3 font-medium">0</td>
              <td className="py-3">Aller a la salle</td>
              <td className="py-3">A faire</td>
              <td className="py-3">Mon Physique</td>
            </tr>
            <tr className="border-b border-blue-800/50">
              <td className="py-3 font-medium">0</td>
              <td className="py-3">Aller a la salle</td>
              <td className="py-3">A faire</td>
              <td className="py-3">Mon Physique</td>
            </tr>
            <tr className="border-b border-blue-800/50">
              <td className="py-3 font-medium">0</td>
              <td className="py-3">Aller a la salle</td>
              <td className="py-3">A faire</td>
              <td className="py-3">Mon Physique</td>
            </tr>
          </tbody>
        </table>
      </div>
      {showImputBoard && (
        <>
          {/* Overlay (fond flou) */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            onClick={() => setShowImputBoard(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="w-[400px] bg-zinc-900 text-white rounded-xl p-6 shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-center mb-4">
                Nouveau Board
              </h2>

              <input
                type="text"
                placeholder="Titre du tableau"
                className="w-full h-[40px] rounded-md px-3 text-white mb-4"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowImputBoard(false)}
                  className="px-4 py-2 rounded-md bg-gray-600 hover:bg-gray-700"
                >
                  Annuler
                </button>

                <button className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold">
                  Créer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomeDashboard;
