"use client";
import { useEffect, useState } from "react";
import "../../globals.css"

function determinant(matrix: number[][]): number {
  const n = matrix.length;
  let det = 0;

  if (n == 1) {
    return matrix[0][0];
  }

  for (let i = 0; i < n; i++) {
    const subMatrix = matrix
      .slice(1)
      .map((row) => row.filter((_, j) => j !== i));
      
    det += matrix[0][i] * determinant(subMatrix) * Math.pow(-1, i);
  }

  return det;
}

function cramer(matrix: number[][]): number[] {
  const n = matrix.length;
  const result: number[] = [];
  const detA = determinant(matrix);
  const B = matrix.map((column) => column[n]);

  for(let i = 0; i < n; i++){
    const Ax = matrix.map((matrix) => [...matrix]);
    for(let j = 0; j < n; j++){
      Ax[j][i] = B[j];
    }
    result.push(determinant(Ax) / detA);
  }

  return result;
}

export default function Page() {
  const [dimension, setDimension] = useState<number>(2);
  const [matrix, setMatrix] = useState<number[][]>([]);
  const [result, setResult] = useState<number[]>([]);

  const cal = () => {
    setResult(cramer(matrix));
  };
  console.log(result);

  useEffect(() => {
    setMatrix(Array.from({ length: dimension }, () => []));
  }, [dimension]);

  return (
    <div className="p-4">
      <div>
        <h1 className="text-2xl font-bold mb-4">Cramer Rule</h1>
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
        <button onClick={cal} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Calculate</button>
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
