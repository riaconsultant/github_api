import React, { Component } from 'react';
import './App.css';
var axios = require('axios');

class App extends Component {
  constructor(){
    super();
    //this.state = {name:"Manoj"}
  }
  state = {
    name:"Manoj",
    userInfo:[{
      
    }],
    repoInfo:[{

    }]
  }
  fetchData = (userData) =>{
    if(userData.total_count>0){
      console.log(userData.items);
      this.setState({userInfo:userData.items})
      //this.state.userInfo = userData
      console.log(this.state.userInfo);
    }else{
      console.log("No result Found..");
    }
  }
  getRepo = (repoData) =>{
    this.setState({repoInfo:repoData})
    console.log(repoData);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="App-title">Github API Application - Developed By - {this.state.name}</div>
        </div>
        <div className="App-body">
          <SearchBox onSubmit={this.fetchData}/><br/>
          <SearchResult userInfo={this.state.userInfo} getReposEvt={this.getRepo}/>
          <RepositoryList repoInfo={this.state.repoInfo}/>
        </div>
      </div>
    );
  }
}
// Search Box
class SearchBox extends Component{
  
  state = {username:""}
  searchUser = (event) =>{
    event.preventDefault();
    console.log(this.state.username);
    axios.get(`https://api.github.com/search/users?q=${this.state.username}`)
      .then(resp =>{
        this.props.onSubmit(resp.data);
      })
  }
  
  render(){
    return(
      <form onSubmit={this.searchUser}>
        <input type="text" value={this.state.username}
        onChange={(event)=> this.setState({username:event.target.value})} placeholder="Enter the github user name." required/>
        <button type="submit">Search</button>
      </form>
    );
  }
}
// Search result panel
class SearchResult extends Component{
  constructor(props){
    super(props)
    //console.log(props);
  }
  getSelection=(url)=>{
    console.log(url);
     axios.get(url)
      .then(repos=>{
        //console.log(repos.data);
        this.props.getReposEvt(repos.data)
      })
  }
  render(){
    //let userInfo = this.props.userInfo |[];
    return(
      <div className="resultPanel">
        <div className="resultHeader">Result</div>
        {this.props.userInfo.map((user,index) => <UserProfile key={index} {...user} getSelect={this.getSelection}/>)}
      </div>
    );
  }
}
// User Profile panel
class UserProfile extends Component{
  constructor(props){
    super(props);
  }
  getRepo=()=>{
    this.props.getSelect(this.props.repos_url);
   
  }
  render(){
    return(
      <div className="usrprofile" onClick={this.getRepo}>
        <img src={this.props.avatar_url} width="100px"/>
        <div className="box">
          <div>{this.props.login}</div>
          <a href={this.props.html_url} target="_blank">Profile</a>
        </div>
      </div>
    );
  }
}
// List of Repositories
class RepositoryList extends Component{
  constructor(props){
    super(props);
  }
  render(){
    //let repoInfo = this.state
    return(
      <div className="contain">
        <h3> Repositories List </h3>
        {this.props.repoInfo.map((repos,index) =>(<Repository key={index} {...repos} />))}
      </div>
    );
  }
}

class Repository extends Component{
  state={langData:[]}
  constructor(){
    super();
  }
  getLanguage(){
    axios.get(this.props.languages_url)
      .then(langData =>{
        this.setState({langData:langData});
      })
    //console.log(this.props.languages_url);
  }
  render(){
    return(
      <div>
        <div>{this.props.name}</div>
        <div></div>
        <LanguageBox detail={this.state.langData} />
      </div>
    );
  }
}
// Show Language and percentages
class LanguageBox extends Component{
  constructor(){
    super();
    
  }
  percentCal = () =>{
    return "Hello";
  }
  render(){
    return(
      {this.props.detail.map((language,index) =>(
        
      
      ))}
    );
  }
}

export default App;
