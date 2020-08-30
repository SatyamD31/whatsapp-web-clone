import React, { createContext, useContext, useReducer } from 'react';

// prepare the data layer
export const StateContext = createContext();

// actual data layer; higher order component
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// useStateValue hook to pull data from DataLayer 
export const useStateValue = () => useContext(StateContext);