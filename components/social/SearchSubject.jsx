"use client";

import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { SearchIcon } from "@/components/navbar/SearchIcon";
import { Button } from "@nextui-org/button";

const SearchSubject = ({ searchPostFunction }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = () => {
    searchPostFunction(searchQuery);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    const newSuggestions = ["Python", "C#", "Swift", "C++"];
    setSuggestions(newSuggestions.filter((s) => s.startsWith(value)));
  };

  return (
    <div className="flex gap-2 justify-center items-center">
      <Input
        classNames={{
          base: "max-w-full sm:max-w-[40rem] h-10",
          mainWrapper: "h-full",
          input: "text-small",
          inputWrapper:
            "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
        }}
        contenteditable="true"
        spellcheck="true"
        placeholder="მოძებნე თემის მიხედვით"
        size="sm"
        radius="full"
        startContent={
          <SearchIcon size={18} width={undefined} height={undefined} />
        }
        type="search"
        value={searchQuery}
        onChange={handleInputChange}
        list="suggestions" // Link to the datalist element
      />
      <datalist id="suggestions">
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
      <br />
      <Button  color="primary" onClick={handleSearch}>
        ძებნა
      </Button>
    </div>
  );
};

export default SearchSubject;
