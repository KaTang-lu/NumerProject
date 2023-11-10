"use client";
import { useEffect, useState } from "react";
import "../../globals.css"

function gauss(matrix: number[][]): number[] {
  const n = matrix.length;
  const result: number[] = [];
  const B = matrix.map((column) => column[n]);
  const A = matrix.map((matrix) => matrix.slice(0, n));

  //Forwatd Elimination
  for(let i = 0; i < n; i++){
    for(let j = i+1; j < n; j++){
      const factor = A[j][i] / A[i][i];
      for(let k = i; k < n+1; k++){
        A[j][k] = A[j][k] - factor * A[i][k];
      }
      B[j] = B[j] - factor * B[i];
    }
  }

  //Backward Substitution
  const X = Array(n).fill(0);
  for(let i = n-1; i >= 0; i--){
    let sum = 0;
    for(let j = i+1; j < n; j++){
      sum = sum + A[i][j] * X[j];
    }
    X[i] = (B[i]-sum) / A[i][i];
  }
  result.push(...X);

  return result;
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    setResult(gauss(matrix));
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
  }, [dimension]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Gauss Elimination</h1>
        <input
          type="number"
          value={dimension}
          onChange={(e) => {
            setDimension(Number(e.target.value));
          }}
          className="p-2 rounded border border-gray-300 mr-2"
          
        />
        
        <h2 className="text-2xl mb-4">Matrix</h2>
        {Array.from({ length: dimension }, (_, i) => (
          <div key={i} className="mb-4">
            {Array.from({ length: dimension + 1 }, (_, j) => (
              <input
                type="number"
                key={j}
                onChange={(e) => {
                  const temp = [...matrix];
                  temp[i][j] = Number(e.target.value);
                  setMatrix(temp);
                }}
                className="p-2 rounded border border-gray-300 mr-2"
              />
            ))}
          </div>
        ))}
        <button onClick={cal} className="btn btn-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Calculate</button>
      </div>

      <div>
        {result.length > 1 ? (
          <>
            <div className="mt-4">
              <table className="border-collapse border border-gray-300">
                <tbody>
                  {result.map((r, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-2">X{i}:</td>
                      <td className="border border-gray-300 p-2">{r}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
