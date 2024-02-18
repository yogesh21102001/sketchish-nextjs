import { getKeywords } from "../../common-apis/keywords/keywords";

export default function useKeywords (){
    const UseKeyword = ()=>{
        const url = `/services/keywords`
        const resp = getKeywords(url)
        return resp
    }

    return {
        UseKeyword
    }
}