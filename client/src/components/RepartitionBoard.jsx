import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RepartitionBoard = () => {
  const [allBoards, setAllBoards] = useState([]);
  const navigate = useNavigate()

  const getAllBoards = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/board/get-user-board",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );

      const boardsData = response.data.boards;

      // pour chaque board, récupérer ses stats
      const boardsWithStats = await Promise.all(
        boardsData.map(async (board) => {
          const statsResp = await axios.get(
            `http://localhost:3000/board/get-board/${board._id}`,
            {
              headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          return {
            ...board,
            totalLists: statsResp.data.data.totalLists,
            totalCards: statsResp.data.data.totalCards,
          };
        })
      );

      setAllBoards(boardsWithStats);
    } catch (error) {
      console.error("Erreur lors de la récupération des boards", error);
    }
  };

  useEffect(() => {
    getAllBoards();
  }, []);

  return (
    <div className="mt-5">
      <h2 className="font-bold text-2xl">Repartition par Boards</h2>
      <div className=" mt-5 flex items-center gap-5">
        {allBoards.length > 0 ? (
          allBoards.map((board) => (
            <div onClick={() => navigate(`/dashboard/board/${board._id}`)} className="w-[200px] h-[100px] cursor-pointer shadow shadow-blue-200 rounded-[10px]">
              <h3 className="text-center p-2 text-blue-500 font-bold text-[16px]">
                {board.title}
              </h3>
              <p className="text-center p-2">
                Lists : <span className="font-bold text-blue-500">{board.totalLists}</span>
              </p>
              <p className="text-center">
                Cards : <span className="font-bold text-blue-500">{board.totalCards}</span>
              </p>
            </div>
          ))
        ) : (
          <p>Loading boards...</p>
        )}
      </div>
    </div>
  );
};

export default RepartitionBoard;
