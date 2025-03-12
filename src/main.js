import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";

import apiClient from "./apiClient";
import MatchedDogModal from "./matchedDogModal";
import { Button, Card } from "./components";

import wrapperStyles from "./styles/Wrapper.module.scss";
import DogSearchHeader from "./dogSearchHeader";


const fetchBreeds = async () => {
    const { data } = await apiClient.get("/dogs/breeds");
    return data;
  };
const fetchDogIds = async ({ queryKey }) => {
  const [, filters] = queryKey; 
  const { data } = await apiClient.get("/dogs/search", { params: filters });
  return data;
};
const fetchDogsByIds = async ({ queryKey }) => {
    const [, ids] = queryKey;
    if (!Array.isArray(ids) || ids.length === 0) return [];
  const { data } = await apiClient.post("/dogs", ids);
  return data;
};
const generateMatch = async (favoriteIds) => {
    const { data } = await apiClient.post("/dogs/match", favoriteIds);
    return data.match;
  };

const DogSearchPage = () => {
  const [filters, setFilters] = useState({
    breeds: [],
    zipCodes: [],
    ageMin: null,
    ageMax: null,
    size: 6,
    from: null,
    sort: "breed:asc",
  });
  const [zipInput, setZipInput] = useState("");
  const [favorites, setFavorites] = useState(new Set());
  const [matchedDog, setMatchedDog] = useState(null);

  const { data: breedList, isLoading: isBreedsLoading } = useQuery({
    queryKey: ["breeds"],
    queryFn: fetchBreeds,
  });
  const { data: searchResults } = useQuery({
    queryKey: ["dogIds", filters],
    queryFn: fetchDogIds,
  });
  const { data: dogList, isLoading } = useQuery({
    queryKey: ["dogs", searchResults?.resultIds],
    queryFn: fetchDogsByIds,
    enabled: !!searchResults?.resultIds?.length,
  });

  const { mutate: generateMatchMutation, isPending } = useMutation({
    mutationFn: generateMatch,
    onSuccess: async (matchId) => {
      if (!matchId) {
        alert("No match found!");
        return;
      }
  
      try {
        const matchedDogs = await fetchDogsByIds({ queryKey: ["dogs", [matchId]] });
        if (matchedDogs.length > 0) {
            setMatchedDog(matchedDogs[0]);
          } else {
            alert("Failed to fetch match details.");
          }
      } catch (error) {
        console.error("Error fetching matched dog:", error);
        alert("Failed to fetch match details.");
      }
    },
  });

  const toggleFavorite = (dogId) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(dogId)) {
        newFavorites.delete(dogId);
      } else {
        newFavorites.add(dogId);
      }
      return newFavorites;
    });
  };


  return (
    <div style={{"margin-top": "218px"}}>  
      <div>
        <DogSearchHeader 
          breedList={breedList}
          filters={filters} 
          setFilters={setFilters}
          zipInput={zipInput}
          setZipInput={setZipInput}
          isBreedsLoading={isBreedsLoading}
        />
            <Button
                disabled={!searchResults?.prev}
                onClick={() => {
                    const params = new URLSearchParams(searchResults?.prev.split("?")[1]);
                    const fromValue = params.get("from");
                    setFilters({ ...filters, from: fromValue})
                }}
                text="Previous"
            />
            <Button
                disabled={!searchResults?.next}
                onClick={() => {
                    const params = new URLSearchParams(searchResults?.next.split("?")[1]);
                    const fromValue = params.get("from");
                    setFilters({ ...filters, from: fromValue})
                }}
                text="Next"
            />
            <Button
                disabled={favorites.size === 0 || isPending}
                onClick={() => {
                    setMatchedDog(null);
                    generateMatchMutation([...favorites]);
                }}
                text="Generate Match"
            />
        {isLoading ? (
          <p>Loading dogs...</p>
        ) : (
          <div className={wrapperStyles.Wrapper}>
            {dogList?.map((dog) => (
              <Card key={dog.id} dog={dog} favorites={favorites} toggleFavorite={toggleFavorite} />
            ))}
          </div>
        )}
      </div>
      {matchedDog && (
        <MatchedDogModal
          dog={matchedDog}
          onClose={() => setMatchedDog(null)}
        />
      )}
    </div>
  );
};

export default DogSearchPage;
