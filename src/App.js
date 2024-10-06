import './App.css';
import {useEffect, useState} from "react";
import config from "./config";
import Card from "./components/Card";
import Popup from 'reactjs-popup';

function App() {
    const [cards, setCards] = useState([...config.cards]);
    const [hidedCards, setHidedCards] = useState([...config.cards]);
    const [matches, setMatches] = useState(0);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [isPopupOpened, setIsPopupOpened] = useState(false);

    useEffect(() => {
        const countMatches = () => {
            let matchCount = 0;
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].name === hidedCards[i].name) {
                    matchCount++;
                }
            }
            if(matchCount === cards.length) {
                setIsPopupOpened(true);
            }
            return matchCount;
        };
        setMatches(countMatches());

    }, [cards, hidedCards]);

    const handleCardClick = (index) => {
        if (selectedCardIndex === null) {
            setSelectedCardIndex(index);
        } else {
            const newCards = [...cards];
            const temp = newCards[selectedCardIndex];
            newCards[selectedCardIndex] = newCards[index];
            newCards[index] = temp;
            setCards(newCards);
            setSelectedCardIndex(null);
        }
    };

    useEffect(() => {
        startGame();
    }, [])
    const startGame = () => {
        setCards(prepareOpenedCards());
        setHidedCards(prepareClosedCards());
        setIsPopupOpened(false);
        setSelectedCardIndex(null);
    }
    const prepareOpenedCards = () => {
        let id = 1;
        return [...config.cards]
            .sort(() => Math.random() - 0.5)
            .map(item => ({...item, id: id++}));


    }
    const prepareClosedCards = () => {
        let id = 1;
        return [...config.cards]
            .sort(() => Math.random() - 0.5)
            .map(item => ({...item, id: id++}));
    }

    const closePopup = () =>{
        startGame();
    }


  return (
      <div className="App">
        <div className="game">
          <div className="score">
            Совпадений: {matches} / {cards.length}
          </div>


          <div className="cards">
              <div className="cards-top">
                  {
                      cards.map((item, index) => (
                          <div key={item.id} onClick={() => handleCardClick(index)}>
                              <Card item={item}></Card>
                          </div>
                      ))
                  }

              </div>
              <div className="cards-bottom">
                  {
                      hidedCards.map(item => (
                          <Card item={item} key={item.id}></Card>
                      ))
                  }
              </div>
              <Popup open={isPopupOpened} closeOnDocumentClick onClose={closePopup}>
                  <div className="modal">
                    <span className="close" onClick={() => closePopup()}>
                        &times;
                    </span>
                      Игра завершена!
                  </div>
              </Popup>
          </div>
        </div>
          <button className='change-btn' type="button" onClick={startGame}>Новая игра</button>
      </div>
  );
}

export default App;
