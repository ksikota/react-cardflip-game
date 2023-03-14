
export default function legend({turns, rounds,allowedMoves, highscore}) {

    return (
        <div className="block">
            <p alt={"High score"}> High Score: {highscore}</p>
            <p> Game Moves: {turns}</p>
            <p> Game Rounds: {rounds}</p>
            <p> Allowed Moves: {allowedMoves}</p>

        </div>

    );

}