import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CardContext = createContext()

const CardContextProvider = (props) => {

    const [cards, setCards] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
    
      useEffect(() => {
        const fetchAllCards = async () => {
          try {
            const headers = { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    
            const boardsRes = await axios.get('http://localhost:3000/board/get-user-board', { headers })
            const boards = boardsRes.data.boards || []
    
            const allCards = []
    
            for (const board of boards) {
              const [listsRes, cardsRes] = await Promise.all([
                axios.get(`http://localhost:3000/list/get-lists/${board._id}`, { headers }),
                axios.get(`http://localhost:3000/card/get-cards-by-board/${board._id}`, { headers })
              ])
    
              const lists = listsRes.data.lists || []
              const cards = cardsRes.data.cards || []
    
              const listMap = {}
              lists.forEach((l) => { listMap[l._id] = l.title })
    
              cards.forEach((c) => {
                allCards.push({
                  _id: c._id,
                  title: c.title,
                  description: c.description,
                  boardTitle: board.title,
                  listTitle: listMap[c.listId] || '',
                  order: c.order,
                })
              })
            }
    
            setCards(allCards)
          } catch (err) {
            console.error(err)
            setError('Erreur lors de la récupération des cartes')
          } finally {
            setLoading(false)
          }
        }
    
        fetchAllCards()
      }, [])
    

    const contextValue = {
        cards,
        loading,
        error
    }

    return (
        <CardContext.Provider value={contextValue}>
            {props.children}
        </CardContext.Provider>
    )
}

export default CardContextProvider