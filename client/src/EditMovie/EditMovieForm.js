import React from 'react';
// import { Redirect } from 'react-router-dom';
import axios from 'axios';

class EditMovieForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.match.params.id,
      title: '',
      director: '',
      metascore: 0,
      star: '',
      stars: []
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name] : event.target.value })
  }

  addStar = event => {
    this.setState({
      star: event.target.value,
      stars: [...this.state.stars, this.state.star]
    })
  }
  
  editMovie = event => {
    event.preventDefault()

    axios.put(`http://localhost:5000/api/movies/${this.state.id}`, this.state)
      .then(response => {
        console.log('EditMove PUT req res', response)
        this.setState({
          title: '',
          director: '',
          metascore: 0,
          star: ''
        })
        this.props.getMovieList()
        this.props.history.push(`/movies/${this.state.id}`)
      })
      .catch(err => console.log(err))
  }
  
  render() {
    console.log('EditMovie props', this.props)
    console.log('edit movie id', this.state.id)
    console.log('star', this.state.star)
    return(
      <div>
        <h2>Edit Movie</h2>

        <div>
          <form onSubmit={this.editMovie}>
            <input 
              type='text'
              name='title'
              onChange={this.handleChange}
              value={this.state.title} 
              placeholder='title'
            />

            <input 
              type='text'
              name='director'
              onChange={this.handleChange} 
              value={this.state.director}
              placeholder='director'
            />

            <input 
              type='number'
              name='metascore'
              onChange={this.handleChange} 
              value={this.state.metascore}
              placeholder='metascore'
            />

            <input 
              type='text'
              name='star'
              onChange={this.handleChange}
              value={this.state.star}
              placeholder='Add A Star'
            />
            <button type='button' onClick={this.addStar} >Add star</button>

            <button type='submit'>Submit Changes</button>
          </form>
        </div>

      </div>
    )
  }
}

export default EditMovieForm;
