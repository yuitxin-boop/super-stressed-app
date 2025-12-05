import React, { useEffect, useState } from "react";
import "./PetRoom.css";
import { useNavigate } from "react-router-dom";
import { getPet, savePet } from '../api';

function PetRoom() {
    const userId = localStorage.getItem("userId");
    const [popup, setPopup] = useState(null);
    const [showMessage, setShowMessage] = useState(false);
    const [messagePopup, setMessagePopup] = useState(null);
    const navigate = useNavigate();
    
    const popupMessages = {
        happiness: "Your pet feels loved! ❤️",
        hunger: "Your pet enjoyed the food! 🍖",
        energy: "Your pet gained energy! 🔋"
    };

    const [happinessIndex, setHappinessIndex] = useState(0);
    const [hungerIndex, setHungerIndex] = useState(0);
    const [energyIndex, setEnergyIndex] = useState(0);

    const happinessIcons = ["/happiness.png", "/happiness2.png", "/happiness3.png"];
    const hungerIcons = ["/hunger.png", "/hunger2.png", "/hunger3.png"];
    const energyIcons = ["/energy.png", "/energy2.png", "/energy3.png"];

    const [petName, setPetName] = useState("");
    const [savedPetName, setSavedPetName] = useState("");

    const saveTime = () => {
        localStorage.setItem(`${userId}_lastUpdateTime`, Date.now());
    };

    const savePetToBackend = () => {
        if (!userId) return;
        savePet({
            userId,
            happiness: happinessIndex,
            hunger: hungerIndex,
            energy: energyIndex,
            name: savedPetName
        }).catch(err => console.error(err));
    };

    const resetHappinessIcon = () => {
        setHappinessIndex(0);
        saveTime();
        savePetToBackend();
    };

    const resetHungerIcon = () => {
        setHungerIndex(0);
        saveTime();
        savePetToBackend();
    };

    const resetEnergyIcon = () => {
        setEnergyIndex(0);
        saveTime();
        savePetToBackend();
    };

    // Load pet from localStorage or backend
    useEffect(() => {
        const savedName = localStorage.getItem(`${userId}_petName`);
        const savedHappiness = localStorage.getItem(`${userId}_happinessIndex`);
        const savedHunger = localStorage.getItem(`${userId}_hungerIndex`);
        const savedEnergy = localStorage.getItem(`${userId}_energyIndex`);
        const lastUpdate = localStorage.getItem(`${userId}_lastUpdateTime`);

        if (savedName) setSavedPetName(savedName);
        if (savedHappiness !== null) setHappinessIndex(Number(savedHappiness));
        if (savedHunger !== null) setHungerIndex(Number(savedHunger));
        if (savedEnergy !== null) setEnergyIndex(Number(savedEnergy));

        if (lastUpdate) {
            const hoursPassed = Math.floor((Date.now() - Number(lastUpdate)) / (1000 * 60 * 60));

            if (hoursPassed > 0) {
                setHappinessIndex(prev => Math.min(prev + hoursPassed, happinessIcons.length - 1));
                setHungerIndex(prev => Math.min(prev + hoursPassed, hungerIcons.length - 1));
                setEnergyIndex(prev => Math.min(prev + hoursPassed, energyIcons.length - 1));
            }
        }
    }, [userId]);

    // Fetch pet from backend (for new users or sync)
    useEffect(() => {
        if (!userId) return;

        getPet(userId)
            .then(res => {
                const pet = res.data;
                if (pet && pet.name) {
                    setSavedPetName(pet.name);
                    setPetName(pet.name);
                    setHappinessIndex(pet.happiness ?? 0);
                    setHungerIndex(pet.hunger ?? 0);
                    setEnergyIndex(pet.energy ?? 0);

                    localStorage.setItem(`${userId}_petName`, pet.name);
                    localStorage.setItem(`${userId}_happinessIndex`, pet.happiness ?? 0);
                    localStorage.setItem(`${userId}_hungerIndex`, pet.hunger ?? 0);
                    localStorage.setItem(`${userId}_energyIndex`, pet.energy ?? 0);
                }
            })
            .catch(err => console.error(err));
    }, [userId]);

    // Save changes to localStorage on update
    useEffect(() => {
        localStorage.setItem(`${userId}_happinessIndex`, happinessIndex);
    }, [happinessIndex]);

    useEffect(() => {
        localStorage.setItem(`${userId}_hungerIndex`, hungerIndex);
    }, [hungerIndex]);

    useEffect(() => {
        localStorage.setItem(`${userId}_energyIndex`, energyIndex);
    }, [energyIndex]);

    // Timers to increase indices
    useEffect(() => {
        const happinessTimer = setInterval(() => {
            setHappinessIndex(prev => {
              const newIndex = Math.min(prev + 1, happinessIcons.length - 1);
              saveTime();
              savePetToBackend();
              return newIndex;
            });
        }, 20000);

        const hungerTimer = setInterval(() => {
            setHungerIndex(prev => {
              const newIndex = Math.min(prev + 1, hungerIcons.length - 1);
              saveTime();
              savePetToBackend();
              return newIndex;
            });
        }, 20000);

        const energyTimer = setInterval(() => {
            setEnergyIndex(prev => {
              const newIndex = Math.min(prev + 1, energyIcons.length - 1);
              saveTime();
              savePetToBackend();
              return newIndex;
            });
        }, 20000);

        return () => {
            clearInterval(happinessTimer);
            clearInterval(hungerTimer);
            clearInterval(energyTimer);
        };
    }, []);

    const handleStatusClick = (statusType) => {
        setPopup(statusType);
        setShowMessage(false);
        setMessagePopup(null);
    };

    const handleMessagePopup = (statusType) => {
        setPopup(null);
        setShowMessage(false);
        setMessagePopup(statusType);
    };

    const closePopup = () => {
        setPopup(null);
        setShowMessage(false);
        setMessagePopup(null);
    };

    useEffect(() => {
        if (messagePopup) {
            const timer = setTimeout(() => {
                setMessagePopup(null);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [messagePopup]);

    return (
        <div className="background">
            {/* Pet name input only for new users */}
            {!savedPetName && (
                 <div className="petname-input">
                      <input
                         type="text"
                         placeholder="Enter pet name..."
                         value={petName}
                         onChange={(e) => setPetName(e.target.value)}
                     />
                     <button
                         onClick={async () => {
                            if (!petName.trim()) return;
                            setSavedPetName(petName);
                            localStorage.setItem(`${userId}_petName`, petName);
                            try{
                                await savePet ({
                                    userId,
                                    name: petName,
                                    happiness: happinessIndex,
                                    hunger: hungerIndex,
                                    energy: energyIndex,
                                });
                            } catch (err){
                                console.error("Failed to save pet name:",err);
                            }
                            setPetName("");
                         }}

                     >
                        Save
                     </button>
                 </div>
            )}

            {savedPetName && (
                <div className="pet-name-text">
                    {savedPetName}
                    <button
                        onClick={() => {
                            setSavedPetName("");
                            setPetName("");
                        }}
                        className="change-name-btn"
                    >
                        ✏️
                    </button>
                </div>
            )}

            <img className="pet" src="/pet.png" alt="pet" />
            <img className="room" src="/room.png" alt="room" />
            <img className="cabinet" src="/cabinet.png" alt="cabinet"/>
            <img className="bed" src="/bed.png" alt="bed" />

            <div className="dogstatus">
                <div className="statushappiness">
                    <button className="statushappiness" onClick={()=> handleStatusClick('happiness')} aria-label="Increase Pet Happiness">
                        <img src={happinessIcons[happinessIndex]} alt="happiness"/>
                        <span>Happiness</span>
                    </button>
                </div>

                <div className="statushunger">
                    <button className="statushunger" onClick={()=> handleStatusClick('hunger')} aria-label="Feed Pet">
                        <img src={hungerIcons[hungerIndex]} alt="hunger"/>
                        <span>Hunger</span>
                    </button>
                </div>

                <div className="statusenergy">
                    <button className="statusenergy" onClick={()=> handleStatusClick('energy')} aria-label="Rest Pet">
                        <img src={energyIcons[energyIndex]} alt="energy"/>
                        <span>Energy</span>
                    </button>
                </div>
            </div>

            {popup === "happiness" && (
                <div className="popup-frame-happiness">
                    {!showMessage && (
                        <div className="popup-images">
                            <img src="/football.png" className="popup-img" alt="ball1" onClick={() => {handleMessagePopup("happiness"); resetHappinessIcon();}}/>
                            <img src="/basketball.png" className="popup-img" alt="ball2" onClick={() => {handleMessagePopup("happiness"); resetHappinessIcon();}}/>
                            <img src="/netball.png" className="popup-img" alt="ball3" onClick={() => {handleMessagePopup("happiness"); resetHappinessIcon();}}/>
                        </div>
                    )}
                    {showMessage && <p className="popup-text">Your pet feels loved! ❤️</p>}
                    <button className="popup-close" onClick={closePopup}>Close</button>
                </div>
            )}

            {popup === "hunger" && (
                <div className="popup-frame-hunger">
                    {!showMessage && (
                        <div className="popup-images">
                            <img src="/fish.png" className="popup-img" alt="food1" onClick={() => {handleMessagePopup("hunger"); resetHungerIcon();}}/>
                            <img src="/meat.png" className="popup-img" alt="food2" onClick={() => {handleMessagePopup("hunger"); resetHungerIcon();}}/>
                            <img src="/prawn.png" className="popup-img" alt="food3" onClick={() => {handleMessagePopup("hunger"); resetHungerIcon();}}/>
                        </div>
                    )}
                    {showMessage && <p className="popup-text">Your pet enjoyed the food! 🍖</p>}
                    <button className="popup-close" onClick={closePopup}>Close</button>
                </div>
            )}

            {popup === "energy" && (
                <div className="popup-frame-energy">
                    {!showMessage && (
                        <div className="popup-images">
                            <img src="/drink1.png" className="popup-img" alt="strength1" onClick={() => {handleMessagePopup("energy"); resetEnergyIcon();}}/>
                            <img src="/drink2.png" className="popup-img" alt="strength2" onClick={() => {handleMessagePopup("energy"); resetEnergyIcon();}}/>
                        </div>
                    )}
                    {showMessage && <p className="popup-text">Your pet gained energy! 🔋</p>}
                    <button className="popup-close" onClick={closePopup}>Close</button>
                </div>
            )}

            {messagePopup && (
                <div className="popup-frame-message">
                    <p className="popup-text">{popupMessages[messagePopup]}</p>
                    <button className="popup-close" onClick={() => setMessagePopup(null)}>Close</button>
                </div>
            )}

            <button className="back-button" onClick={() => navigate('/homepage')}>Back</button>
        </div>
    );
}

export default PetRoom;


