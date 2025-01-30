import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';
import { selectFilterParams } from './filter/filterSlice';
import type { FilterParams } from './filter/filterSlice';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Auth hooks
export const useAuth = () => useAppSelector((state) => state.auth);
export const useIsAuthenticated = () => useAppSelector((state) => state.auth.isAuthenticated);

// Filter hooks
export const useFilter = () => useAppSelector((state) => state.filter);
export const useFilterParams = (): FilterParams => useAppSelector(selectFilterParams); 