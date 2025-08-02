//Used to randomly generate an ID for each new book so they can be
//moved among the three arrays in my db.json file and each book
//will still have a unique id that goes with it.
export default function RandomIdGenertor(min:number, max:number) {
  return Math.random() * (max - min) + min;
}
