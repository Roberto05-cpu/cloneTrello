import React, { useContext } from 'react'
import { CardContext } from '../Context/CardContext'

const CardHistory = () => {

  const {cards, loading, error} = useContext(CardContext)

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