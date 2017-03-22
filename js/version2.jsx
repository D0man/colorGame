import React from 'react';
import ReactDOM from 'react-dom';

class ColorPicker extends React.Component{
   constructor(props){
     super(props);
      this.state={
         color1: '#FF0000',
         color2: '#0000FF',
         color3: '#00FF00',
         color4: '#FF69B4',
         color5: '#ffff00',
         color6: '#ff00ff',
      }
   }
   handleChange =(event)=>{
      this.setState({color1: event.target.value});
   }
   handleChange1 =(event)=>{
      this.setState({color2: event.target.value});
   }
   handleChange2 =(event)=>{
      this.setState({color3: event.target.value});
   }
   handleChange3 =(event)=>{
      this.setState({color4: event.target.value});
   }
   handleChange4 =(event)=>{
      this.setState({color5: event.target.value});
   }
   handleChange5 =(event)=>{
      this.setState({color6: event.target.value});
   }
   render(){
      return <div><label> color1:<input type="color" onChange={this.handleChange} value={this.state.color1}/></label>
      <label> color2:<input type="color" onChange={this.handleChange1} value={this.state.color2}/></label>
      <label> color3:<input type="color" onChange={this.handleChange2} value={this.state.color3}/></label>
      <label> color4:<input type="color" onChange={this.handleChange3} value={this.state.color4}/></label>
      <label> color5:<input type="color" onChange={this.handleChange4} value={this.state.color5}/></label>
      <label> color6:<input type="color" onChange={this.handleChange5} value={this.state.color6}/></label>
      </div>
   }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <ColorPicker/>,
        document.getElementById('app')
    );
});
