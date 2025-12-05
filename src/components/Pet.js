import React, { useEffect, useState } from "react";
import "./PetRoom.css";
import { useNavigate } from "react-router-dom";
import { getPet, savePet } from '../api';

function PetRoom() {
    const userId = localStorage.getItem("userId");
    const navigate = useNavigate();

    const [petName, setPetName] = useState("");
    const [savedPetName, setSavedPetName] = useState("");
    const [happinessIndex, setHappinessIndex] = useState(0);
    const [hungerIndex, setHungerIndex] = useState(0);
    const [energyIndex, setEnergyIndex] = useState(0);

    const [popup, setPopup] = useState(null);
    const [messagePopup, setMessagePopup] = useState(null);

    const happinessIcons = ["/happiness.png", "/happiness2.png", "/happiness3.png"];
    const hungerIcons = ["/hunger.png", "/hunger2.png", "/hunger3.png"];
    const energyIcons = ["/energy.png", "/energy2.png", "/energy3.png"];

    const popupMessages = {
        happiness: "Your pet feels loved! ❤️",
        hunger: "Your pet enjoyed the food! 🍖",
        energy: "Your pet gained energy! 🔋"
    };

    // Save pet to backend
    const savePetToBackend = async (updatedName = savedPetName) => {
        if (!userId) return;
        try {
            await savePet({
                userId,
                name: updatedName,
                happiness: happinessIndex,
                hunger: hungerIndex,
                energy: energyIndex
            });
            // Cache in localStorage
            localStorage.setItem(`${userId}_petName`, updatedName);
            localStorage.setItem(`${userId}_happinessIndex`, happinessIndex);
            localStorage.setItem(`${userId}_hungerIndex`, hungerIndex);
            localStorage.setItem(`${userId}_energyIndex`, energyIndex);
            localStorage.setItem(`${userId}_lastUpdateTime`, Date.now());
        } catch (err) {
            console.error("Failed to save pet:", err);
        }
    };

    const resetStatus = (type) => {
        if (type === "happiness") setHappinessIndex(0);
        if (type === "hunger") setHungerIndex(0);
        if (type === "energy") setEnergyIndex(0);
        savePetToBackend();
    };

    // Fetch pet from backend on mount
    useEffect(() => {
        if (!userId) return;
        const fetchPet = async () => {
            try {
                const res = await getPet(userId);
                const pet = res.data;
                if (pet && pet.name) {
                    setSavedPetName(pet.name);
                    setPetName(pet.name);
                    setHappinessIndex(pet.happiness ?? 0);
                    setHungerIndex(pet.hunger ?? 0);
                    setEnergyIndex(pet.energy ?? 0);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchPet();
    }, [userId]);

    // Timers to increase indices
    useEffect(() => {
        const timer = (setter, max) => setInterval(() => setter(prev => Math.min(prev + 1, max)), 20000);

        const happinessTimer = timer(setHappinessIndex, happinessIcons.length - 1);
        const hungerTimer = timer(setHungerIndex, hungerIcons.length - 1);
        const energyTimer = timer(setEnergyIndex, energyIcons.length - 1);

        return () => {
            clearInterval(happinessTimer);
            clearInterval(hungerTimer);
            clearInterval(energyTimer);
        };
    }, []);

    // Popup handlers
    const handleStatusClick = (type) => setPopup(type);
    const handleMessagePopup = (type) => {
        setPopup(null);
        setMessagePopup(type);
        resetStatus(type);
        setTimeout(() => setMessagePopup(null), 2000);
    };

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
                            await savePetToBackend(petName);
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

            {/* Pet & room */}
            <img className="pet" src="/pet.png" alt="pet" />
            <img className="room" src="/room.png" alt="room" />
            <img className="cabinet" src="/cabinet.png" alt="cabinet"/>
            <img className="bed" src="/bed.png" alt="bed" />

            {/* Status buttons */}
            <div className="dogstatus">
                <div className="statushappiness">
                    <button onClick={() => handleStatusClick('happiness')}>
                        <img src={happinessIcons[happinessIndex]} alt="happiness"/>
                        <span>Happiness</span>
                    </button>
                </div>
                <div className="statushunger">
                    <button onClick={() => handleStatusClick('hunger')}>
                        <img src={hungerIcons[hungerIndex]} alt="hunger"/>
                        <span>Hunger</span>
                    </button>
                </div>
                <div className="statusenergy">
                    <button onClick={() => handleStatusClick('energy')}>
                        <img src={energyIcons[energyIndex]} alt="energy"/>
                        <span>Energy</span>
                    </button>
                </div>
            </div>

            {/* Popups */}
            {popup && (
                <div className={`popup-frame-${popup}`}>
                    <div className="popup-images">
                        {popup === "happiness" && ["football","basketball","netball"].map((img,i) => (
                            <img key={i} src={`/${img}.png`} className="popup-img" alt={img} onClick={() => handleMessagePopup("happiness")} />
                        ))}
                        {popup === "hunger" && ["fish","meat","prawn"].map((img,i) => (
                            <img key={i} src={`/${img}.png`} className="popup-img" alt={img} onClick={() => handleMessagePopup("hunger")} />
                        ))}
                        {popup === "energy" && ["drink1","drink2"].map((img,i) => (
                            <img key={i} src={`/${img}.png`} className="popup-img" alt={img} onClick={() => handleMessagePopup("energy")} />
                        ))}
                    </div>
                </div>
            )}

            {messagePopup && (
                <div className="popup-frame-message">
                    <p className="popup-text">{popupMessages[messagePopup]}</p>
                </div>
            )}

            <button className="back-button" onClick={() => navigate('/homepage')}>Back</button>
        </div>
    );
}

export default PetRoom;



