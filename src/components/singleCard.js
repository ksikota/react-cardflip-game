import './singleCard.css'
export default function singleCards({card, handleChoice, flipped, disabled}){
    const handleClick = () =>{
        if(!disabled){
            handleChoice(card)
        }
    }
    return (
        <div className="card" >
            <div  className={flipped ? "flipped" : "" }>
                <img className="front" src={card.src} alt="card front"/>
                <img onClick={handleClick}
                     className="back" src="/img/cover.jpg"
                     alt="card back"/>
            </div>
        </div>
    )
}