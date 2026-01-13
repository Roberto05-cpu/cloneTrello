import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CardHistory = () => {
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

  if (loading) return <div>Chargement...</div>
  if (error) return <div>{error}</div>
  if (!cards.length) return <div className='text-3xl flex items-center justify-center'>Aucune carte trouvée</div>

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Historique des cartes</h2>
      <div className="overflow-auto">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr>
              <th className="border px-2 py-1 text-left">Titre</th>
              <th className="border px-2 py-1 text-left">Description</th>
              <th className="border px-2 py-1 text-left">Board</th>
              <th className="border px-2 py-1 text-left">Liste</th>
              <th className="border px-2 py-1 text-left">Ordre</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card._id} className="odd:bg-gray-50">
                <td className="border px-2 py-1 align-top">{card.title}</td>
                <td className="border px-2 py-1 align-top">{card.description}</td>
                <td className="border px-2 py-1 align-top">{card.boardTitle}</td>
                <td className="border px-2 py-1 align-top">{card.listTitle}</td>
                <td className="border px-2 py-1 align-top">{card.order}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CardHistory