export default function ImageGalleryItem({image, modal}){
    return(
         <li className="ImageGalleryItem">
          <img className="ImageGalleryItem-image" src={image.webformatURL} alt={image.name} onClick={() => modal(image)}/>
        </li>
    )
}