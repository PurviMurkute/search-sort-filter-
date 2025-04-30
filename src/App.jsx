import React, { useEffect, useState } from "react";
import { USERS } from "./config";
import { Boxes, MapPin } from "lucide-react";

export const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  const [filteredCity, setFilteredCity] = useState("");
  const [filteredAge, setFilteredAge] = useState("");

  useEffect(() => {
    if (!searchText) {
      setFilteredUsers(USERS);
      return;
    }
    const tempFilteredUsers = USERS.filter((user) => {
      if (user.name.toLowerCase().includes(searchText)) {
        return true;
      } else if (user.city.toLowerCase().includes(searchText)) {
        return true;
      } else if (user.age.toString().includes(searchText)) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredUsers(tempFilteredUsers);
  }, [searchText]);

  useEffect(() => {
    if (!filteredCity && !filteredAge) {
      setFilteredUsers(USERS);
      return;
    }

    const tempFilteredUsers = USERS.filter((user) => {
      if((filteredCity && user.city === filteredCity) && (parseInt(filteredAge) && user.age === parseInt(filteredAge))){
        return true;
      }

      if(filteredCity && !filteredAge && user.city === filteredCity){
        return true;
      }

      if(filteredAge && !filteredCity && user.age  === filteredAge){
        return true;
      }

      return false;
    });
    setFilteredUsers(tempFilteredUsers);
  }, [filteredCity, filteredAge]);

  return (
    <div>
      <h1 className="text-center font-bold text-4xl py-5">
        Search-Sort-Filter
      </h1>
      <input
        type="text"
        placeholder="Search.."
        className="px-2 py-1 block mx-auto my-3 w-2/4 bg-indigo-100 border-2 border-gray-300 focus:outline-none"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value.toLowerCase());
        }}
      />
      {searchText ? (
        <h3 className="text-center my-4 text-lg">
          {filteredUsers.length === 0
            ? "No User Found"
            : filteredUsers.length === 1
            ? "Total User"
            : "Total Users"}
          <span className="font-bold"> ({filteredUsers.length}) </span>
        </h3>
      ) : null}

      <div className="flex justify-evenly">
        <div>
          <span>Filter by City: </span>
          <select
            value={filteredCity}
            onChange={(e) => {
              setFilteredCity(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Nagpur">Nagpur</option>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Delhi">Delhi</option>
            <option value="Agra">Agra</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hydrabad">Hydrabad</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>
        <div>
          <span>Filter by Age: </span>
          <select value={filteredAge} onChange={(e)=> {setFilteredAge(e.target.value)}}>
            <option value="">All</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="30">30</option>
            <option value="35">35</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-evenly mx-20">
        {filteredUsers.map((user, i) => {
          const { name, age, city, image } = user;

          return (
            <div
              className="flex bg-indigo-200 border-2 border-indigo-400 shadow-xl rounded-lg m-5 px-5 py-2 w-[400px] hover:shadow-2xl"
              key={i}
            >
              <div>
                <img
                  src={image}
                  alt="user-avtar"
                  className="rounded-full h-[80px] my-2 me-5"
                />
              </div>
              <div className="block my-auto">
                <h2 className="font-bold">{name}</h2>
                <div className="flex flex-row">
                  <span>
                    <Boxes className="h-5" />
                  </span>
                  <p className="me-3">{age} </p>
                  <span>
                    <MapPin className="h-5" />
                  </span>
                  <p>{city}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
