import { useMemo, useState } from "react";
import type { PerceptronConfig, PerceptronOutput } from "../types";

/**
 * Activation Functions
 */
const activationFunctions = {
  /**
   * Step Function: Returns 1 if input >= threshold, else 0
   */
  step: (x: number, threshold = 0): number => {
    return x >= threshold ? 1 : 0;
  },

  /**
   * Sigmoid Function: Smooth S-curve between 0 and 1
   * σ(x) = 1 / (1 + e^(-x))
   */
  sigmoid: (x: number): number => {
    return 1 / (1 + Math.exp(-x));
  },

  /**
   * ReLU (Rectified Linear Unit): Returns max(0, x), capped at 1
   */
  relu: (x: number): number => {
    return Math.min(1, Math.max(0, x));
  },
};

/**
 * Custom hook for Perceptron computation
 *
 * The Perceptron is the fundamental building block of neural networks.
 * It takes inputs, multiplies them by weights, adds a bias, and applies
 * an activation function to produce an output.
 *
 * @param config - Configuration object containing inputs, weights, bias, and activation function
 * @returns PerceptronOutput with weightedSum, finalOutput, and fillLevel
 *
 * @example
 * ```tsx
 * const { weightedSum, finalOutput, fillLevel } = usePerceptron({
 *   inputs: [0.5, 0.8],
 *   weights: [0.7, 0.3],
 *   bias: -0.2,
 *   activationFunction: 'sigmoid',
 * });
 * ```
 */
export function usePerceptron(config: PerceptronConfig): PerceptronOutput {
  const { inputs, weights, bias, activationFunction, threshold = 0 } = config;

  const output = useMemo(() => {
    // Validation: Ensure inputs and weights arrays have the same length
    if (inputs.length !== weights.length) {
      console.warn("Inputs and weights arrays must have the same length");
      return {
        weightedSum: 0,
        finalOutput: 0,
        fillLevel: 0,
      };
    }

    // Calculate weighted sum: Σ(input_i × weight_i) + bias
    const weightedSum =
      inputs.reduce((sum, input, index) => {
        return sum + input * weights[index];
      }, 0) + bias;

    // Apply activation function
    const activationFn = activationFunctions[activationFunction];
    let finalOutput: number;

    if (activationFunction === "step") {
      finalOutput = activationFn(weightedSum, threshold);
    } else {
      finalOutput = activationFn(weightedSum);
    }

    // Calculate fill level (0-100%) for visualization
    // For step function, it's binary (0% or 100%)
    // For sigmoid/relu, we use the output directly as it's already 0-1
    const fillLevel = finalOutput * 100;

    return {
      weightedSum,
      finalOutput,
      fillLevel,
    };
  }, [inputs, weights, bias, activationFunction, threshold]);

  return output;
}

/**
 * Helper hook for managing multiple inputs with their own state
 * Useful for controlling input sliders
 */
export function usePerceptronInputs(initialInputs: number[]) {
  const [inputs, setInputs] = useState(initialInputs);

  const updateInput = (index: number, value: number) => {
    setInputs((prev) => {
      const newInputs = [...prev];
      newInputs[index] = value;
      return newInputs;
    });
  };

  return { inputs, setInputs, updateInput };
}

/**
 * Helper hook for managing weights
 */
export function usePerceptronWeights(initialWeights: number[]) {
  const [weights, setWeights] = useState(initialWeights);

  const updateWeight = (index: number, value: number) => {
    setWeights((prev) => {
      const newWeights = [...prev];
      newWeights[index] = value;
      return newWeights;
    });
  };

  return { weights, setWeights, updateWeight };
}
