import { useState } from "react";

export default function RandomIdGenertor() {
  const [randomId, setRandomId] = useState<null | number>(null);

  const fetchBookId = async () => {
    try {
  const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
      const dbData = await response.json();
      let maxId = 0;
      for (const arrayName in dbData) {
        if (Array.isArray(dbData[arrayName])) {
          dbData[arrayName].forEach((obj) => {
            if (obj.id && obj.id > maxId) {
              maxId = obj.id;
            }
          });
        }
      }
      setRandomId(maxId + 1)
      }    
    } catch (error: unknown) {
      console.error("Error fetching or parsing JSON:", error);
    }
  }

  return (
    <Navigation
    setRandomId={setRandomId}    
    fetchBookId={fetchBookId}
    />
  )
}
