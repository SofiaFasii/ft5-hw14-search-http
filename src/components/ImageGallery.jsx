import ImageGalleryItem from "./ImageGalleryItem";

export default function ImageGallery({ images, modal, userLikes, handleLikes}) {
  return (
    <ul className="ImageGallery">
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} modal={modal} userLikes={userLikes} handleLikes={handleLikes}/>
      ))}
    </ul>
  );
}
