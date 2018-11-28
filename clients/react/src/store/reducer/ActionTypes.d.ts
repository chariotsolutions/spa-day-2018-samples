// Action type interfaces
export interface Action<T> { type: T; }
export interface PayloadAction<T, P> extends Action<T> { payload: P; }
export interface ErrorAction<T> extends Action<T> { error: Error; }
