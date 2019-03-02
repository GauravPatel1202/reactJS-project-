import React, { Component } from 'react'
import axios from 'axios'

import Autosuggest from 'react-autosuggest';
let languages = [];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function getSuggestionValue(suggestion) {
    return suggestion.webTitle;
  }
  
  function renderSuggestion(suggestion) {
    return (
      <span>{suggestion.webTitle}</span>
    );
  }
function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
   
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  return languages.filter(language => regex.test(language.id));
}
class Search extends Component {
  state = {
    query: '',
    results: [],
    value: '',
    suggestions: [],
    suggestionsdata:[]
  }
  deboundApi(){
    axios.get("http://content.guardianapis.com/tags?show-references=all&api-key=test")
    .then(({ data }) => {
         this.setState({
        results: data.response.results
        })
     
    })
  }
  handleInputChange = (e) => {
    this.setState({
      query: e.target.value
    }, 
    () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          this.deboundApi()
        }
      } 
    })
  }

  handleClick= (e) =>{
      this.props.history.push("/Searchresult/"+this.state.query);
    e.preventDefault();
  }
  onChange = (event, { newValue, method }) => {
    axios.get("http://content.guardianapis.com/tags?show-references=all&api-key=test&type = "+this.state.value)
    .then(({ data }) => {
         this.setState({
        results: data.response.results,
        suggestions:data.response.results,
        })
        languages=[...this.state.results]
        console.log(this.state.suggestions)

    })
    this.setState({
      value: newValue
    });
    console.log(this.state.value)
  };
  getSuggestions(){
   return this.state.suggestionsdata.map((data)=>{
        data.name=data.id
    })
  } 
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  handleClick= (e) =>{
      this.props.history.push("/Searchresult/"+this.state.value);
    e.preventDefault();
  }
  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "What can I help you with today?",
      value:this.state.value,
      onChange: this.onChange
    };
    return (
    <div className="SearchBar">
        <h1>News Lister</h1>
        <div className="row">
        <Autosuggest 
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} />
         {/* <input ref="search" type="search" id="search-bar"  onChange={this.handleInputChange}placeholder="What can I help you with today?" /> */}
		 <button className="btn btn-default" onClick={this.handleClick}>Search</button>
        </div>
     </div>
    )
  }
}

export default Search