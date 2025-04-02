import React, { useState } from 'react';
import '../styles/price-range.css';

const PriceRange = () => {
    // Estado para los valores de los sliders
    const [minValue, setMinValue] = useState(2500);
    const [maxValue, setMaxValue] = useState(7500);

    // Funciones para manejar los cambios en los sliders
    const handleSliderMinChange = (e) => {
        const value = Math.min(e.target.value, maxValue); // Limitar minValue para que no sea mayor que maxValue
        setMinValue(value);
    };

    const handleSliderMaxChange = (e) => {
        const value = Math.max(e.target.value, minValue); // Limitar maxValue para que no sea menor que minValue
        setMaxValue(value);
    };

    // Calcular el porcentaje de la barra de progreso
    const minPercentage = (minValue / 10000) * 100;
    const maxPercentage = (maxValue / 10000) * 100;

    return (
        <div className="price-range-container">
            {/* Barra de progreso */}
            <div className="slider">
                <div
                    className="progress"
                    style={{
                        left: `${minPercentage}%`,
                        width: `${maxPercentage - minPercentage}%`,
                    }}
                ></div>
            </div>

            {/* Deslizadores */}
            <div className="range-input">
                <input
                    type="range"
                    className="range-min"
                    min="0"
                    max="10000"
                    value={minValue}
                    step="100"
                    onChange={handleSliderMinChange}
                />
                <input
                    type="range"
                    className="range-max"
                    min="0"
                    max="10000"
                    value={maxValue}
                    step="100"
                    onChange={handleSliderMaxChange}
                />
            </div>

            {/* Mostrar los valores de los sliders */}
            <div className="values">
                <span>Min: ${minValue}</span> - <span>Max: ${maxValue}</span>
            </div>
        </div>
    );
};

export default PriceRange;