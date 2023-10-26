"use client";

import { evaluate } from "mathjs";
import { useState } from "react";
import "../../globals.css"


function bisection(fx: string, xl: number, xr: number) : {result:number[], error:number[]} {
  let xm: number = 0;
  let xold: number = xm;
  let error = [];
  let result = [];
  Number(fx);

  for (let i = 0; i < 100; i++) {
    xold = xm;
    xm = (xl + xr) / 2;

    const fxr: number = evaluate(fx, { x: xr });
    const fxl: number = evaluate(fx, { x: xl });
    const fxm: number = evaluate(fx, { x: xm });

    if (fxm * fxr > 0) {
      xr = xm;
    } else {
      xl = xm;
    }

    error[i] = Math.abs((xm - xold) / xm) * 100;
    if (error[i] < 0.00001) {
      break;
    }
    result.push(xm);
  }

  return {result, error};
}

export default function Page() {
  const [fx, setFx] = useState("");
  const [xl, setxl] = useState("");
  const [xr, setxr] = useState("");
  const [error, setError] = useState<number[]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    // console.log(fx, xl, xr)
    const value = bisection(fx, Number(xl), Number(xr));
    setResult(value.result);
    setError(value.error);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Bisection Method</h1>
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
        placeholder="xl"
        value={xl}
        onChange={(e) => setxl(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />

      <input
        type="number"
        placeholder="xr"
        value={xr}
        onChange={(e) => setxr(e.target.value)}
        className="w-1/3 p-2 border border-gray-300 rounded mr-2"
      />

      <button onClick={cal} className="bg-blue-500 text-white p-2 rounded">
        Calculate
      </button>
      </div>

      {result ? (
        <>
          <p className="text-xl font-bold mb-4">Result: {result.at(-1)} </p>

          <div className="mx-auto">
            <table className="table-auto">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Iteration</th>
                        <th className="px-4 py-2">XM</th>
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
