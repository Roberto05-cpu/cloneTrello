import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BowArrowIcon, MenuIcon, Trash2 } from "lucide-react";
import superman from "../assets/superman.jpg";

const NewBoard = () => {
  const boardId = useParams();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [titleList, setTitleList] = useState("");
  const [activeListId, setActiveListId] = useState(null);
  const [titleCard, setTitleCard] = useState("");
  const [descriptionCard, setDescriptionCard] = useState("");
  const [cards, setCards] = useState([]);

  const navigate = useNavigate()

  const fetchBoardDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/board/get-board/${boardId.boardId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setBoard(response.data.board);
    } catch (error) {
      console.error("Erreur lors de la récupération du board", error);
    }
  };

  const deleteBoard = async (boardId) => {
    try {
      await axios.delete(
        `http://localhost:3000/board/delete-board/${boardId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      alert("Board deleted successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Erreur lors de la suppression du board", error);
    }
  }

  const handleCreateList = (e) => {
    e.preventDefault();
    console.log("Créer une nouvelle liste avec le titre :", titleList);

    axios
      .post(
        "http://localhost:3000/list/create-list",
        { title: titleList, boardId: boardId.boardId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("List créée avec succès", response.data);
        setTitleList("");
        alert("List created successfully!");
        fetchBoardDetails();
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la list", error);
      });
  };

  const fetchAllLists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/list/get-lists/${boardId.boardId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setLists(response.data.lists);
    } catch (error) {
      console.error("Erreur lors de la récupération des listes", error);
    }
  };

  const handleCreateCard = async (e) => {
    e.preventDefault();
    console.log("Card créée avec succès", titleCard);

    axios
      .post(
        "http://localhost:3000/card/create-card",
        {
          title: titleCard,
          description: descriptionCard,
          listId: activeListId,
          boardId: boardId.boardId,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Card créée avec succès", response.data);
        setTitleCard("");
        setDescriptionCard("");
        setActiveListId(null);
        alert("Card created successfully!");
        fetchBoardDetails();
        fetchAllLists();
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la card", error);
      });
  };

  const fetchAllCardsForBoard = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/card/get-cards-by-board/${boardId.boardId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setCards(response.data.cards);
    } catch (error) {
      console.error("Erreur lors de la récupération des cartes", error);
    }
  };

  const deleteList = async (listId) => {
    try {
      await axios.delete(
        `http://localhost:3000/list/delete-list/${listId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      alert("List deleted successfully!");
      fetchAllLists();
    } catch (error) {
      console.error("Erreur lors de la suppression de la liste", error);
    }
  }

  const deleteCard = async (cardId) => {
    try {
      await axios.delete(
        `http://localhost:3000/card/delete-card/${cardId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      alert("Card deleted successfully!");
      fetchAllCardsForBoard();
    } catch (error) {
      console.error("Erreur lors de la suppression de la carte", error);
    }
  }

  useEffect(() => {
    fetchBoardDetails();
    fetchAllLists();
    fetchAllCardsForBoard();
  }, []);

  return (
    <div>
      <div className="w-full flex items-center justify-between p-3 bg-blue-300 text-white">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-[50%] bg-green-500"></div>
            <div className="w-3 h-3 rounded-[50%] bg-red-500"></div>
            <div className="w-3 h-3 rounded-[50%] bg-yellow-500"></div>
          </div>
          <div className="flex items-center gap-2 object-cover p-2 bg-blue-400 rounded-[5px]">
            <BowArrowIcon />
            <p>Board</p>
          </div>
        </div>
        <h1 className="text-[20px] font-bold">{board?.title}</h1>
        <div className="flex items-center gap-3 mr-[40px]">
          <img src={superman} className="w-10 h-10 rounded-[50%]" alt="" />
          <Trash2 onClick={() => deleteBoard(boardId.boardId)} />
        </div>
      </div>
      <div className="flex items-center mt-3">
        <p className="font-bold">New List :</p>
        <input
          onChange={(e) => setTitleList(e.target.value)}
          type="text"
          name="title"
          value={titleList}
          className="w-100 h-10 bg-blue-100 rounded-[5px] ml-[50px] pl-4 font-semibold focus:outline-none"
          placeholder="Enter title of the List"
        />
        <button
          onClick={handleCreateList}
          className="px-3 h-10 bg-blue-500 ml-2 rounded-[5px] font-bold text-white"
        >
          creer
        </button>
      </div>
      <div className="flex gap-5 mt-5 overflow-x-auto whitespace-nowrap ">
        {lists.map((item) => (
          <div
            key={item._id}
            className=" bg-violet-100 w-[250px] min-w-[250px] rounded-[5px] h-auto"
          >
            <div className="w-full bg-violet-300 p-2 font-bold text-white flex items-center justify-between">
              {item.title}
              <Trash2  onClick={() => deleteList(item._id)}/>
            </div>
            <ul className="flex flex-col justify-center items-center">
              {cards
                .filter((card) => card.listId.toString() === item._id)
                .map((cardItem) => (
                  <li
                    key={cardItem._id}
                    className="w-[90%] h-auto rounded-[5px] p-2 bg-violet-200 m-2 break-words text-center flex items-center"
                  >
                    <div className="w-[90%]">
                      <span>{cardItem.title}</span>
                      <p className="text-[12px] opacity-75 text-center break-words">
                        {cardItem.description}
                      </p>
                    </div>
                    <Trash2 onClick={() => deleteCard(cardItem._id)} className="ml-5" size={15} />
                  </li>
                ))}
            </ul>
            <div className="flex justify-center items-center mt-5">
              <button
                onClick={() => setActiveListId(item._id)}
                className="w-[90%] m-2 bg-violet-200 rounded-[5px] font-bold p-2"
              >
                Add Card
              </button>
            </div>
            {activeListId === item._id && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                onClick={() => setActiveListId(null)}
              >
                <div
                  className="w-[400px] bg-zinc-900 text-white rounded-xl p-6 shadow-lg flex flex-col"
                  onClick={(e) => e.stopPropagation()}
                >
                  <p>List : {item.title}</p>
                  <input
                    onChange={(e) => setTitleCard(e.target.value)}
                    type="text"
                    name="title"
                    placeholder="Titre de la card"
                    className="w-full h-[40px] rounded-md px-3 text-white mb-4"
                  />
                  <input
                    onChange={(e) => setDescriptionCard(e.target.value)}
                    type="text"
                    name="description"
                    placeholder="Description de la card"
                    className="w-full h-[40px] rounded-md px-3 text-white mb-4"
                  />
                  <button
                    onClick={handleCreateCard}
                    className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold"
                  >
                    Créer
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewBoard;
