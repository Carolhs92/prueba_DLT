import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

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

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelectClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    onChange(value);
    setIsOpen(false);
  };

  //  clics fuera del componente
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
    <div className="custom-select" ref={selectRef}>
      <div className="custom-select__input" onClick={handleSelectClick}>
        {selectedOption ? selectedOption.label : 'Select an option'}
        <Image
          src="/icons/arrow_down.png"
          width={20}
          height={20}
          alt="arrow down"
          className="custom-select__icon"
        />
      </div>
      {isOpen && (
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
