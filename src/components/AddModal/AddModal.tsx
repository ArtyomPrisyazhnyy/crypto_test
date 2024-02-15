import React from 'react';
import Button from '../Button/Button';
import './AddModal.scss';

export interface AddModalProps {
    setAddCoinValue: React.Dispatch<React.SetStateAction<string>>;
    addCoin: () => void;
    addCoinValue: string;
}

const AddModal: React.FC<AddModalProps> = ({ addCoin, addCoinValue, setAddCoinValue }) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value.replace(/\D/g, '');

        setAddCoinValue(newValue);
    };

    const handleAddCoin = () => {
        // Вызываем функцию добавления монеты
        addCoin();
        // Очищаем поле ввода после нажатия на кнопку "Add"
        setAddCoinValue('');
    };

    return (
        <div className="coin">
            <div className="coin__count">
                <input
                    className="coin__count__input"
                    type="number"
                    value={addCoinValue}
                    onChange={handleInputChange}
                    pattern="\d*"
                    placeholder="add count"
                />
            </div>

            <Button onClick={handleAddCoin} variant="add-button">
                Add
            </Button>
        </div>
    );
};

export default AddModal;
