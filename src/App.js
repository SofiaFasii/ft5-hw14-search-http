import { useMemo, useCallback, useEffect, useState } from "react";
import "./App.css";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Button from "./components/Button";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import { useGalleryReducer } from "./hooks/useGalleryReducer";
const API_KEY = "57280664-73e0c70a0e8748ccf6861f56f";


const creatUrl = (query, pages) =>
  `https://pixabay.com/api/?q=${query}&page=${pages}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

function App() {
  const {state, dispatch} = useGalleryReducer()
  const [selectedImg, setSelectedImg] = useState(null);
  const [showLikes, setShowLikes] = useState(false)

  const {query, images, page, loading, userLikes} = state

  useEffect(() => {
    if (!query) return;
    dispatch({type: 'loading', payload: true})
    fetch(creatUrl(query, page))
      .then((resp) => resp.json())
      .then((data) => dispatch({type: 'images', payload: data.hits}))
      .catch((error) => console.log(error))
      .finally(() => dispatch({type: 'loading', payload: false}));
  }, [query, page]);
  useEffect(() => {
    localStorage.setItem("userLikes", JSON.stringify(userLikes))
  }, [userLikes])

  const handleSearch = useCallback((word) => {
    dispatch({type: 'query', payload: word})
    dispatch({type: 'reset'})
    setShowLikes(false)
  }, []);
  const handleMore = useCallback(() => {
    dispatch({type: 'page'})
  }, []);
  const handleModal = useCallback((image) => {
    setSelectedImg(image);
  }, []);
  const handleCloseModal = useCallback(() => {
    setSelectedImg(null);
  }, []);
  const handleLikes = useCallback((image) => {
    dispatch({type: 'userLikes', payload: image})
  }, [userLikes])
  const visibleImages = useMemo(() => {
    return showLikes ? userLikes : images
  }, [showLikes, userLikes, images])

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      <button className="UserLikesBtnShow" onClick={() => setShowLikes(!showLikes)}>
        {showLikes ? 'Hide your likes❤️' : 'Your likes❤️'}
      </button>
      <ImageGallery images={visibleImages} modal={handleModal} userLikes={userLikes} handleLikes={handleLikes}/>
      <div className="Wrapper">
        <Loader loading={loading} />
        {!showLikes && images.length > 0 && <Button onClick={handleMore} />}
      </div>
      <Modal selectedImg={selectedImg} closeModal={handleCloseModal} />
    </div>
  );
}
export default App;


// class App extends Component{
//   state = {
//     query: '',
//     images: [],
//     page: 1,
//     loading: false,
//     selectedImg: null
//   }
//   componentDidUpdate(prevProps, prevState){
//     if(prevState.query !== this.state.query || prevState.page !== this.state.page){
//       const url = this.creatUrl(this.state.query, this.state.page)
//       this.setState({loading: true})
//       fetch(url)
//         .then(res => res.json())
//         .then(data => this.setState(preve => ({images: [...preve.images, ...data.hits]})))
//         .catch(error => console.log(error))
//         .finally(() => {this.setState({loading: false})})
//       console.log(this.state.query)
//     }
//   }
//   creatUrl = (query, pages) => {
//     return `https://pixabay.com/api/?q=${query}&page=${pages}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
//   }
//   handleSearch = (word) => {
//     this.setState({
//       query: word,
//       page: 1,
//       images: []
//     })
//   }
//   handleMore = () => {
//     this.setState(preveState => ({
//       page: preveState.page + 1
//     }))
//   }
//   handleModal = (image) => {
//     console.log(image);
//     this.setState({
//       selectedImg: image,
//     })
//   }
//   handleCloseModal = () => {
//     this.setState({
//       selectedImg: null
//     })
//   }
//   render(){
//     return (
//       <div className="App">
//         <Searchbar onSubmit={this.handleSearch}/>
//         <ImageGallery images={this.state.images} modal={this.handleModal}/>
//         <div className='Wrapper'>
//           <Loader loading={this.state.loading}/>
//           {this.state.images.length > 0 && <Button onClick={this.handleMore}/>}
//         </div>
//         <Modal selectedImg={this.state.selectedImg} closeModal={this.handleCloseModal}/>
//       </div>
//     );
//   }

// }

// export default App;
