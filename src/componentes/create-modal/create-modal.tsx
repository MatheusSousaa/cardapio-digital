import { useState } from 'react';
import './create-modal.css';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import type { FoodData } from '../../interface/FoodData';

interface InputProps {
    label: string;
    value: string | number;
    updateValue(value: any): void;
}

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input 
                value={value} 
                onChange={event => updateValue(event.target.value)} 
            />
        </>
    );
};

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const { mutate } = useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        };
        mutate(foodData, {
            onSuccess: () => {
                closeModal();
            }
        });
    };

    return (
        <div className="modal-overflow">
            <div className="modal-body">
                <button onClick={closeModal} className="btn-close">Cancelar</button>
                <h2>Cadastre um novo item no cardápio</h2>
                <form className="input-container">
                    <Input 
                        label="title" 
                        value={title} 
                        updateValue={setTitle} 
                    />
                    <Input 
                        label="price" 
                        value={price} 
                        updateValue={setPrice} 
                    />
                    <Input 
                        label="image" 
                        value={image} 
                        updateValue={setImage} 
                    />             
                </form>
                <button onClick={submit} className="btn-secondary">Cadastrar</button>
            </div>
        </div>
    );
}