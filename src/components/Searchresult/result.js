import React, { Component } from 'react'
import axios from 'axios'
import logo from './No_image.png'; 

class Results extends Component {
   constructor() {
        super();
          this.state = {
            query: '',
            results: [],
            pageOfItemsIndex:1,
            currentPage: 1,
            pageSet:1,
            currentnumber:1,
          };
          this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
     this.gitdata(1)
  }
  gitdata(page){
    axios.get("http://content.guardianapis.com/search?api-key=test&q="+this.props.match.params.topic+"&showfields=thumbnail,headline&page="+page+"&page-size=10")
    .then(({ data }) => {
      this.setState({
        query:this.props.match.params.topic,
        results: data.response.results,    
        pageOfItemsIndex: data.response.pages   
      });
    })
  }
  handleClick(event) {
      if(event.target.id!="Prev"&&event.target.id!="Next"){
        this.setState({
          currentPage: Number(event.target.id),
         });
         this.gitdata(Number(event.target.id))
      }else{
        if(event.target.id=="Prev"){
          this.setState({
            currentPage:--this.state.currentPage,
          });
          this.gitdata(this.state.currentPage)
        }
        if(event.target.id=="Next"){
          this.setState({
            currentPage:++this.state.currentPage,
          });
          this.gitdata(this.state.currentPage)
        }

      }
      
    }
    render() {
      
      const {results ,pageOfItemsIndex,currentPage} = this.state;
       // Logic for displaying current 
      let renderTodos = [...results].map(function(data){
        return (
        <li className="infodata"  key={data.id}>
        <div className="user">
            <img src={logo} alt="Image 001" className="owner-img" />
        </div>
        <div  className="infoDatasete">
          <span>{data.webTitle}</span>
          <span>{data.apiUrl}</span>
          <span>{data.id}</span>
          <span>{data.isHosted}</span>
          <span>{data.pillarId}</span>
          <span>{data.pillarName}</span>
          <span>{data.sectionId}</span>
          <span>{data.webPublicationDate}{data.type}</span>
          <span>{data.webTitle}{data.webUrl}</span>
         </div>
       </li>	
    )});
    // Logic for displaying page numbers
      const pageNumbers = [];
     let PageStageDate;
      for (let i = 1; i <= pageOfItemsIndex; i++) {
        pageNumbers.push(i);
      }
      
      PageStageDate=pageNumbers.slice(currentPage-1,currentPage+10)
      PageStageDate.unshift("Prev")
      PageStageDate.push("Next")
       const renderPageNumbers = PageStageDate.map(number => {
        return (
           <li key={number} id={number} onClick={this.handleClick} className={number==this.state.currentPage?"active":null}>{number} </li>
        );
      });
       return (
       <div className="result">
        <div className="headingCont"><span className="heading"><h1>results of {this.state.query} Page({currentPage}/{pageOfItemsIndex})</h1></span><span className="count"><h3></h3></span></div> 
        <section className="data">
           <ul >
              {renderTodos}
          </ul>
          <div>
        <div>
         <div>
            <ul id="page-numbers">
            {renderPageNumbers}
            </ul>
       
        </div>
        </div>
       </div>
      </section>
     </div> 
      )
  }
}

export default Results


