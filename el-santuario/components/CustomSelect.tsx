import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import style from '@/styles/customSelect.module.scss';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value: string) => {
    if (!disabled) {
      onChange(value);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const selectedOption = options.find(option => option.value === value);

  return (
    <div className={`custom-select ${disabled ? 'disabled' : ''}`} ref={selectRef}>
      <div
        className={`custom-select__input ${disabled ? 'custom-select__input--disabled' : ''}`}
        onClick={handleSelectClick}
      >
        {selectedOption ? selectedOption.label : 'Select an option'}
        <Image
          src="/icons/arrow_down.png"
          width={20}
          height={20}
          alt="arrow down"
          className="custom-select__icon"
        />
      </div>
      {isOpen && !disabled && (
        <ul className="custom-select__options">
          {options.map(option => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className="custom-select__option"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
