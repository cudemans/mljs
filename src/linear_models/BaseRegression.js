// Inspired by Patrick's Loeber's YouTube tutorial on
// building ML algorithms in Python

import { dot } from "mathjs";

export default class BaseRegression {
  constructor(learningRate = 0.001, numIters = 1000) {
    this.learningRate = learningRate;
    this.numIters = numIters;
    this.weights = null;
    this.bias = null;
    this.numSamples = null;
    this.numFeatures = null;
  }

  fit(X, y) {
    this.numSamples = X.length;
    this.numFeatures = X[0].length;

    this.weights = new Array(this.numFeatures).fill(0);
    this.bias = 0;

    for (let i = 0; i < this.numIters; i++) {
      let yPred = this._approximation(
        this.numFeatures,
        X,
        this.weights,
        this.bias
      );

      let dw =
        (1 / this.numSamples) *
        dot(
          X,
          yPred.map((d, i) => d - y[i])
        );

      let db =
        (1 / this.numSamples) *
        yPred.map((d, i) => d - y[i]).reduce((a, b) => a + b, 0);

      this.weights -= this.learningRate * dw;
      this.bias -= this.learningRate * db;
    }
  }
  _approximation(features, X, weights, bias) {
    return;
  }

  score(y_pred, y_test) {
    const mapped = y_pred.map((d, i) => d == y_test[i]);
    return mapped.reduce((a, b) => a + b, 0) / mapped.length;
  }
}
