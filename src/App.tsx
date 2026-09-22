import { useState } from 'react';
import './App.css'
import { Card } from './componentes/card/card/card'
import { useFoodData } from './hooks/useFoodData'
import { CreateModal } from './componentes/create-modal/create-modal';

function App() {
  const { data } = useFoodData()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>
      <div className="card-grid">
       {data?.map(foodData => 
        <Card 
         price={foodData.price} 
         title={foodData.title} 
         img={foodData.image}
         key={foodData.id}
        />
      )}            
    </div>
    
    {isModalOpen && <CreateModal closeModal={() => setIsModalOpen(false)} />}
    
    <button onClick={handleOpenModal}>novo</button> 
    </div>
  )
}
export default App