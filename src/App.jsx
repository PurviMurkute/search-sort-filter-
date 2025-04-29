import React, { useEffect, useState } from "react";
import { USERS } from "./config";
import { Boxes, MapPin } from "lucide-react";

export const App = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(USERS);
  
  useEffect(()=>{
    if(!searchText){
      setFilteredUsers(USERS);
      return;
    }
    const tempFilteredUsers = USERS.filter((user)=>{
      if(user.name.toLowerCase().includes(searchText)){
        return true;
      }
      else if(user.city.toLowerCase().includes(searchText)){
        return true;
      }
      else if(user.age.toString().includes(searchText)){
        return true;
      }else{
        return false;
      }
    })
    setFilteredUsers(tempFilteredUsers);
  }, [searchText])

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
      <h3 className="text-center my-4 text-xl">Total Users<span className="font-bold">({filteredUsers.length})</span></h3>
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
                <p className="flex flex-row">
                  <span>
                    <Boxes className="h-5" />
                  </span>
                  <p className="me-3">{age} </p>
                  <span>
                    <MapPin className="h-5" />
                  </span>
                  <p>{city}</p>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
