import { FaRegHeart, FaHeart  } from "react-icons/fa6";

export default function ImageGalleryItem({image, modal, userLikes, handleLikes}){
    const isLiked = userLikes.some((item) => item.id === image.id)
    return(
         <li className="ImageGalleryItem">
          <img className="ImageGalleryItem-image" src={image.webformatURL} alt={image.name} onClick={() => modal(image)}/>
          <button className="UserLikesBtn" onClick={() => handleLikes(image)}>{isLiked ? <FaHeart color="#ff4343"/> : <FaRegHeart color="#ff4343"/>}</button>
        </li>
    )
}