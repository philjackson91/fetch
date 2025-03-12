import { Button } from "./components";

import headerStyles from "./styles/DogSearchHeader.module.scss";
import inputStyles from "./styles/Input.module.scss";

const DogSearchHeader = ({breedList, filters, setFilters, zipInput, setZipInput, isBreedsLoading = false}) => {

  const updateZipFilter = () => {
    const newZipCodes = zipInput ? zipInput.split(",").map((zip) => zip.trim()) : [];
    if (JSON.stringify(newZipCodes) !== JSON.stringify(filters.zipCodes)) {
      setFilters((prev) => ({ ...prev, zipCodes: newZipCodes }));
    }
  };

  return (
    <header className={headerStyles.Header}>
      <h2>Dog Search</h2>

       <div> 
        <label>Breed: </label>
        <select
          className={inputStyles.Input}
          onChange={(e) =>
            setFilters({ ...filters, breeds: e.target.value ? [e.target.value] : [] })
          }
        >
          <option value="">All Breeds</option>
          {isBreedsLoading ? (
            <option>Loading...</option>
          ) : (
            breedList?.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <Button
          onClick={() => setFilters({ ...filters, sort: "age:asc" })}
          text="Sort by Age (Ascending)"
        />
        <Button
          onClick={() => setFilters({ ...filters, sort: "age:desc" })}
          text="Sort by Age (Descending)"
        />
                
        {filters.breeds.length === 0 ? (
          <>
            <Button onClick={() => setFilters({ ...filters, sort: "breed:asc" })} text="Sort by Breed (A-Z)" />
            <Button onClick={() => setFilters({ ...filters, sort: "breed:desc" })} text="Sort by Breed (Z-A)" />
          </>
        ) : (
          <>
            <Button onClick={() => setFilters({ ...filters, sort: "name:asc" })} text="Sort by Name (A-Z)" />
            <Button onClick={() => setFilters({ ...filters, sort: "name:desc" })} text="Sort by Name (Z-A)" />
          </>
        )}
      </div>
      <div>
        <input 
          className={inputStyles.Input}
          type="text"
          placeholder="Enter ZIP codes (comma-separated)"
          value={zipInput}
          onChange={(e) => setZipInput(e.target.value)}
        />
        <Button onClick={updateZipFilter} text="Search ZIP" />
        {/* {filters.zipCodes.length > 0 && (
          <Button 
            onClick={() => {
              setFilters({ ...filters, zipCodes: [] });
              setZipInput(""); 
            }}
            text="Clear ZIP"
          />
        )} */}
      </div> 
    </header>
  )
}

export default DogSearchHeader;