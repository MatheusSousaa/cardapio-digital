import './card.css';

interface CardProps {

    price: number;
    title: string;
    img: string;
}
export function Card({price, title, img}: CardProps) {
    return (
        <div className="card">
            <img src={img} alt={title} />
            <h2>{title}</h2>
            <p><b>Valor:</b> R$ {price}</p>
        </div>
    )
}
                 