import { useReducer } from "react";

const initialState = {
    query: "",
    images: [],
    page: 1,
    loading: false,
    userLikes: JSON.parse(localStorage.getItem("userLikes")) || [],
} 
const galleryReducer = (state, action) => {
    switch(action.type){
        case 'query':
            return {...state, query: action.payload}
        case 'images':
            return {...state, images: [...state.images, ...action.payload]}
        case 'page':
            return {...state, page: state.page + 1}
        case 'loading':
            return {...state, loading: action.payload}
        case 'userLikes':
            if(state.userLikes.some((item) => item.id === action.payload.id)){
                return {...state, userLikes: state.userLikes.filter(item => item.id !== action.payload.id)}
            } else{
                return {...state, userLikes: [...state.userLikes, action.payload]}
            }
        case 'reset':
            return {...state, page: 1, images: [], } 
        default:
            return state
    }
}
export const useGalleryReducer = () => {
    const [state, dispatch] = useReducer(galleryReducer, initialState)
    return {state, dispatch}
}