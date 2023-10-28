"use client";

import { evaluate, derivative } from "mathjs";
import { useState } from "react";
import "../../app/globals.css"

function Differentiation(fx: string, x: number, h: number) : {result:number[], error:number[], diff:number} {
    let error: number [] = [];
    let result: number [] = [];
    Number(fx);

    const diff = derivative(fx, 'x');

    const fxi_s1: number = evaluate(fx, { x: x-h });
    const fxi: number = evaluate(fx, { x: x });
    const fxi_p1: number = evaluate(fx, { x: x+h });
    
    const forward: number = (fxi_p1 - fxi) / h;
    const backward: number = (fxi - fxi_s1) / h;
    const central: number = (fxi_p1 - fxi_s1) / (2*h);
    result.push(forward, backward, central);

    for(let i=0; i<3; i++){
        error[i] = Math.abs((diff.evaluate({x}) - result[i]) / diff.evaluate({x})) * 100;
    }

    return {result, error, diff:diff.evaluate({x})};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [x, setX] = useState("");
  const [h, setH] = useState("");
  const [diff, setDiff] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    console.log(fx, x, h)
    const value = Differentiation(fx, Number(x), Number(h));
    setResult(value.result);
    setError(value.error);
  };

  const word = ["Forward", "Backward", "Central"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">First Divided Differentiation</h1>
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
        placeholder="x"
        value={x}
        onChange={(e) => setX(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />

      <input
        type="number"
        placeholder="h"
        value={h}
        onChange={(e) => setH(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />

      <button onClick={cal} className="bg-blue-500 text-white p-2 rounded">
        Calculate
      </button>

      </div>

      {result ? (
        <>
          <p className="text-xl font-bold mb-4">Exact value of f({x}): {diff} </p>
          
          <div className="mx-auto">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Method</th>
                        <th className="px-4 py-2">f'({x})</th>
                        <th className="px-4 py-2">True error</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => (
                        <tr key={index}>
                            <td className="border px-4 py-2">{word[index]}</td>
                            <td className="border px-4 py-2">{item}</td>
                            <td className="border px-4 py-2">{error[index]} %</td>
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
