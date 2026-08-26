import ImageGalleryItem from "./ImageGalleryItem";

export default function ImageGallery({ images, modal }) {
  return (
    <ul className="ImageGallery">
      {images.map((image) => (
        <ImageGalleryItem key={image.id} image={image} modal={modal}/>
      ))}
    </ul>
  );
}
