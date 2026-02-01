/**
 * Percept - Perceptron Educational Blog Types
 * Core type definitions for the Perceptron simulation
 */

/**
 * Available activation functions for the Perceptron
 */
export type ActivationFunctionType = "step" | "sigmoid" | "relu";

/**
 * Configuration for a Perceptron
 */
export interface PerceptronConfig {
  /** Array of input values (normalized 0-1) */
  inputs: number[];
  /** Array of weights corresponding to each input */
  weights: number[];
  /** Bias value added to the weighted sum */
  bias: number;
  /** Type of activation function to apply */
  activationFunction: ActivationFunctionType;
  /** Threshold for step function (default: 0) */
  threshold?: number;
}

/**
 * Output from the Perceptron computation
 */
export interface PerceptronOutput {
  /** Raw weighted sum: Σ(input_i × weight_i) + bias */
  weightedSum: number;
  /** Final output after applying activation function (0-1) */
  finalOutput: number;
  /** Normalized value for visual representation (0-100%) */
  fillLevel: number;
}

/**
 * Individual neuron state for visualization
 */
export interface NeuronState {
  /** Unique identifier for the neuron */
  id: string;
  /** Current value (0-1) */
  value: number;
  /** Fill level percentage (0-100) */
  fillLevel: number;
  /** Label for the neuron */
  label: string;
}

/**
 * Connection between neurons (for visualization)
 */
export interface Connection {
  /** Source neuron ID */
  from: string;
  /** Target neuron ID */
  to: string;
  /** Weight of the connection */
  weight: number;
}
