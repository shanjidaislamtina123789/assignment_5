1. What is the difference between var, let, and const?
Ans:-> var : function/global scope,can be re‑declared,hoisted with undefined.
 let : block scope,cannot be re‑declared in same block,can be re‑assigned.
 const : block scope,cannot be re‑declared or re‑assigned,value fixed.

2. What is the spread operator (...)?
Ans:->Spread operator:Expand arrays/objects into individual elements.
Example:

const arr=[1,2,3];

const newArr=[...arr, 4];//[1,2,3,4]

3. What is the difference between map(),filter(),and forEach()?
Ans;>
 map() : return a new array, transforms each element.
 filter() : return a new array, keeps elements that match condition.
 forEach() : return nothing, just loops for side effects (like logging)

4. What is an arrow function?
Ans:> Arrow function : Short syntax for functions.
const add=(a,b)=>a+b;

5. What are template literals?
Ans:-> Strings with backticks(`).
Example:

       const name="Shanjida";
       console.log(`Hello,${name}!`);







