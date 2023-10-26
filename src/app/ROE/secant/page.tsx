"use client";

import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css"

function Secant(fx: string, x0: number, x1: number) : {result:number[], error:number[]} {
    let x2: number = 0;
    let error = [];
    let result = [];

    for(let i=0; i<100; i++){
        const fx0 = evaluate(fx, { x: x0 });
        const fx1 = evaluate(fx, { x: x1 });

        x2 = x1 - (fx1*(x0-x1))/(fx0-fx1);
        
        error[i] = Math.abs((x2-x1)/x2)*100;
        if(error[i] < 0.00001){
            break;
        }
        result.push(x2);
        
        x0 = x1;
        x1 = x2;
    }

    return {result, error};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [x0, setX0] = useState("");
  const [x1, setX1] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    console.log(fx, x0, x1)
    const value = Secant(fx, Number(x0), Number(x1));
    setResult(value.result);
    setError(value.error);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Secant method</h1>
      <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="f(x)"
        value={fx}
        onChange={(e) => setFx(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />

      <input
        type="number"
        placeholder="x0 (start)"
        value={x0}
        onChange={(e) => setX0(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />
      <input
        type="number"
        placeholder="x1 "
        value={x1}
        onChange={(e) => setX1(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />

      <button onClick={cal} className="bg-blue-500 text-white p-2 rounded">Calculate</button>
      </div>

      {result ? (
        <>
          <p className="text-xl font-bold mb-4">Result: {result.at(-1)} </p>

          <div className="mx-auto">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Iteration</th>
                        <th className="px-4 py-2">X2</th>
                        <th className="px-4 py-2">Error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{index+1}</td>
                            <td className="border px-4 py-2">{item}</td>
                            <td className="border px-4 py-2">{error[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
}
