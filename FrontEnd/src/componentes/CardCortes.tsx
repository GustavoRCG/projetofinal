import "./CardCortes.css";

type CardCortesProps = {
    image: string;
    title: string;
    valor?: string;
}

const CardCortes = ({image, title, valor}:CardCortesProps) => {
    return (
        <div className="cardCortes">
            <img src={image} alt="" className="imageCorte" />
            
            <div className="divH3">
                <h3 className="title">{title}</h3>
                <span>{valor}</span>
            </div>
        </div>
    );
}

export default CardCortes