//import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import SingleCard from './components/singleCard'
import Legend from './components/legend'
import { useRef } from 'react';
import { firestore } from "./firebase_setup/firebase"
import { collection, getDocs, doc, setDoc} from "firebase/firestore";
import {firestore as db}  from './firebase_setup/firebase';

//image paths
const images = [
    { "src": "/img/1.avif", matched: false },
    { "src": "/img/2.avif", matched: false },
    { "src": "/img/3.avif", matched: false },
    { "src": "/img/4.avif", matched: false },
    { "src": "/img/5.avif", matched: false }
]
function App() {
    // all my states
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    const [choiceOne, setChoiceOne] = useState(null)
    const [choiceTwo, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const [rounds, setRounds] = useState(0)
    const [matches, setMatches] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [highScore, setHighScore] = useState(0);
    const [allowedMoves, setAllowedMoves] = useState(13)
    const [localHighScore, setLocalHighScore] = useState(0);

    //const dataRef = useRef()
    //fatching my high score from Firebase
    const fetchHighScore = async () => {
        await getDocs(collection(db, "highscore"))
            .then((querySnapshot)=>{
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setHighScore(newData[0].score);
            })
    }
    //Update High Score from firebase after game has ended with full matches
    const updateScore = (Newhighscore) => {
        const docRef = doc(db, "highscore", "yKkoSxjcOIQe3rlOGg6o");
        console.log("updating score with : ", Newhighscore)
        const data = {
            score: Newhighscore
        };
         setDoc(docRef, data)
            .then(docRef => {
                console.log("Score has been updated successfully");
            })
            .catch(error => {
                console.log(error);
            })
    }

    //shuffle cards randomly
    const shuffleCards = () => {
        const shuffledCards = [...images, ...images]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({ ...card, id: Math.random()}))
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }
    //count my matches and end game when matches reach
    const  gamematchescounter = () => {
        setMatches(prevMatches => prevMatches + 1)
        if (matches === 4){
            setRounds(prevRounds => prevRounds + 1)
            if (turns < highScore){
                setTurns(prevTurns => prevTurns + 1)
                updateScore(turns)
            }
            setMatches( 0)
            setGameOver(true)
            if(gameOver){
                calcHighScore()
            }
            setAllowedMoves(13)
            console.log("game Complete")
            setTimeout(() => shuffleCards(), 4000)

        }
    }
    //handle a choice on flip
    const handleChoice = (card) => {
        choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }
    const calcHighScore = () => {
        updateScore(localHighScore)
        setGameOver(false)
    }
    //compare two selected cards
    useEffect(() => {
        if (choiceOne && choiceTwo){
            setDisabled(true)
            setAllowedMoves(prevAllowedMoves => prevAllowedMoves - 1)
            if(allowedMoves === 0){
                console.log("game over")
                setRounds(prevRounds => prevRounds + 1)
                setGameOver(true)
                setAllowedMoves(13)
                shuffleCards()
            }
            if (choiceOne.src === choiceTwo.src){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if (card.src === choiceOne.src){
                            return {...card, matched:true}
                        } else{
                            return card
                        }
                    })
                })
                resetTurn()
                gamematchescounter()
            }
            else {
                setTimeout(() => resetTurn(), 1000)
            }
        }
    }, [choiceOne, choiceTwo])
    //reset choices & increase turn
    const resetTurn = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)
    }
    useEffect(() =>{
        shuffleCards()
        fetchHighScore()

    }, [])
  return (
    <div className="App">
      <h1>Flip Game</h1>
      <div><button className="mybutton" onClick={shuffleCards}>New Game</button></div>
        <div className="legend">
            <Legend
                rounds={rounds}
                turns={turns}
                gameOver={gameOver}
                allowedMoves={allowedMoves}
                highscore={highScore}
                updateScore={updateScore}
            />
    </div>
      <div className="card-grid">
          {cards.map(card => (
            <SingleCard
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
            />
          ))}
        </div>
    </div>
  );
}
export default App;
