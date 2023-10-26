"use client";

import { evaluate, derivative } from "mathjs";
import { useState } from "react";
import "../../globals.css"

function Newton(fx: string, start: number) : {result:number[], error:number[]} {
  let xnext: number = 0;
  let xstart: number = start;
  let error = [];
  let result = [];
  Number(fx);   

  for (let i = 0; i < 100; i++) {
    const diviend = derivative(fx, "x").evaluate({ x: xstart });
    xnext = evaluate(fx, { x: xstart });

    xnext = xstart - xnext / diviend;

    error[i] = Math.abs((xnext - xstart) / xnext) * 100;
    if (error[i] < 0.00001) {
      break;
    }
    xstart = xnext;
    result.push(xnext);
  }

  return {result, error};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [start, setStart] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    console.log(fx, start)
    const value = Newton(fx, Number(start));
    setResult(value.result);
    setError(value.error);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Newton Raphson</h1>
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
        value={start}
        onChange={(e) => setStart(e.target.value)}
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
                        <th className="px-4 py-2">X Next</th>
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
