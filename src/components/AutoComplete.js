import { useEffect, useRef, useState } from "react"
import "../components/AutoComplete.css"


function AutoComplete({options = [], inputValue, text, inputClass, required}) {
    const [value, setValue] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const suggestions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()))

    const autocompleteRef = useRef()

    useEffect(() => {
        const handleClick = (Event) => {
            if(autocompleteRef.current && !autocompleteRef.current.contains(Event.target)) {
                setShowSuggestions(false)
            }
        }
        document.addEventListener("click", handleClick)
        return () => {
            document.removeEventListener("click", handleClick)
        }
    }, [])

    const handleChange = (Event) => {
        setValue(Event.target.value)
        inputValue(Event.target.value)
    }

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion)
        setShowSuggestions(false)
        inputValue(suggestion)
    }

    return (
        <div className="autocomplete" ref={autocompleteRef}>
            <input value={value} onChange={handleChange} placeholder={text} className={inputClass} required={required} type="text" onFocus={() => setShowSuggestions(true)}/>
            {showSuggestions && (
                <ul className="suggestions">
                    {suggestions.map(suggestion => (
                        <li onClick={() => handleSuggestionClick(suggestion)} key={suggestion}>{suggestion}</li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AutoComplete