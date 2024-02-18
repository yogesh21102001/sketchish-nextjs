import { createGlobalState } from 'react-hooks-global-state';

const { useGlobalState, setGlobalState } = createGlobalState({
    isCompact: false
});
export const setIsCompact = (v) => {
    setGlobalState('isCompact', v);
};
export { useGlobalState };