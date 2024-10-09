import { useEffect, useRef, useState } from "react";

export function useDropdown<T extends HTMLElement>() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<T | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const toggleDropdown = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);

    useEffect(()=>{
        const handleClickOutside = (event: MouseEvent) =>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)){
                closeDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return ()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        };
    },[]);

    return {isOpen, toggleDropdown, dropdownRef, buttonRef};
}