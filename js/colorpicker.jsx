import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){
class ColorInfo extends React.Component{
   constructor(props){
               super(props)
               this.state = {
                   color: "Loading ..."
               }
           }

           componentWillMount() {

           }

      render() {

        return <div>
            <h1>{this.state.color}</h1>
        </div>;
    }
}
class ColorInput extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         value: "#FF0000"
      }
   }
   handleChangeColor = (event)=>{
      this.setState({value: event.target.value});
      fetch('http://www.thecolorapi.com/id?hex='+this.props.value.replace('#',""))
     .then(resp => {
         console.log(resp);
         return resp.json()}
     )
     .then((arr) => {
         const color = arr.name;
         console.log(color.value);
         this.setState({color: color.value})

     })
     .catch((err) => {
         console.log(err);
         this.setState({title: "Error!!!"});
     });

   }
   render(){
      return <div><input type="color" value={this.state.value} onChange={this.handleChangeColor}/>
      <ColorInfo value={this.state.value}/></div>
   }
}
    ReactDOM.render(
        <ColorInput/>,
        document.getElementById('app')
    );
});
