import React, { Component } from 'react';
import './App.css';
import 'react-bootstrap';
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
      <div>
        <div className="jumbotron text-center">
            <div className="App-title">Github API Application - Developed By - {this.state.name}</div>
        </div>
        <div className="container">
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
    let url=`https://api.github.com/search/users?q=${this.state.username}`;
    //let url="data/users.json";
    axios.get(url)
      .then(resp =>{
        this.props.onSubmit(resp.data);
      })
  }
  
  render(){
    return(
      <form onSubmit={this.searchUser} className="form-horizontal">
        <div class="form-group">
          <label for="pName" class="control-label col-sm-2">Github Profile Name:</label>
          <div class="col-sm-10">
            <input id="pName" type="text" value={this.state.username}
            onChange={(event)=> this.setState({username:event.target.value})} placeholder="Enter the github user name." required className="form-control"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10 ">
            <button type="submit" className="btn btn-primary">Search</button>
          </div>
        </div>
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
      <div className="panel panel-default">
        <div className="panel-heading">Result</div>
        <div className="panel-body">
        {this.props.userInfo.map((user,index) => 
        
          <UserProfile key={index} {...user} getSelect={this.getSelection}/>
        )}
        </div>
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
    let repo_url=this.props.repos_url;
    //let repo_url="data/repo.json";
    this.props.getSelect(repo_url);
   
  }
  render(){
    return(
      <a href="#" className="list-group-item" onClick={this.getRepo}>
        <img src={this.props.avatar_url1} width="100px"/>
        <div className="box">
          <span>{this.props.login}</span> - <span>{this.props.id}</span><br/>
          <a href={this.props.html_url} target="_blank">Profile</a>
          
        </div>
      </a>
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
      <div className="panel panel-default">
      <div className="panel-heading">Repositories List</div>
      <div className="panel-body">
        <div className="row center-items skill">
          {this.props.repoInfo.map((repos,index) =>(
            <Repository key={index} {...repos} />
          ))}
        </div>
      </div>
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
      <div className="col-sm-2">
        <div>{this.props.name}</div>
        <div></div>
        
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
      <div></div>
    );
  }
}

export default App;
