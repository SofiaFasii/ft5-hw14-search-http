import { Component } from 'react';
import './App.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
const API_KEY = '57280664-73e0c70a0e8748ccf6861f56f';

class App extends Component{
  state = {
    query: '',
    images: [],
    page: 1,
    loading: false,
    selectedImg: null
  }
  componentDidUpdate(prevProps, prevState){
    if(prevState.query !== this.state.query || prevState.page !== this.state.page){
      const url = this.creatUrl(this.state.query, this.state.page)
      this.setState({loading: true})
      fetch(url)
        .then(res => res.json())
        .then(data => this.setState(preve => ({images: [...preve.images, ...data.hits]})))
        .catch(error => console.log(error))
        .finally(() => {this.setState({loading: false})})
      console.log(this.state.query)
    }
  }
  creatUrl = (query, pages) => {
    return `https://pixabay.com/api/?q=${query}&page=${pages}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;
  }
  handleSearch = (word) => {
    this.setState({
      query: word,
      page: 1,
      images: []
    })
  }
  handleMore = () => {
    this.setState(preveState => ({
      page: preveState.page + 1
    }))
  }
  handleModal = (image) => {
    console.log(image);
    this.setState({
      selectedImg: image,
    })
  }
  handleCloseModal = () => {
    this.setState({
      selectedImg: null
    })
  }
  render(){
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSearch}/>
        <ImageGallery images={this.state.images} modal={this.handleModal}/>
        <div className='Wrapper'>
          <Loader loading={this.state.loading}/>
          {this.state.images.length > 0 && <Button onClick={this.handleMore}/>}
        </div>
        <Modal selectedImg={this.state.selectedImg} closeModal={this.handleCloseModal}/>
      </div>
    );
  }
  
}

export default App;
