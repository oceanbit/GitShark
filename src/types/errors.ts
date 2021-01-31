export interface StoreError {
  // EG: undefined is not a function
  errorMessage: string;
  // EG: "_callee2$@http://localhost:8081/ind..."
  callStack: string;
}

export interface FullError extends StoreError {
  // EG: "An error occured while loading staged files."
  explainMessage: string;
}
