import React from 'react';
import ReactDOM from 'react-dom';
import "./style.scss";
let colorArr = ['#0000FF','#FF0000','#00FF33','#ff69b4','#FFFF00','#FFA500','#000000','#8a2be2','#808080'];
let arrReplacer=["blue",'red','green'];
document.addEventListener('DOMContentLoaded', function(){
class ColorInfo extends React.Component{
   constructor(props){
               super(props)
               this.state = {
                   colorname: this.props.value
               }
           }
      render() {

        return <div>
            <h1></h1>
        </div>;
    }
}
class CacheProxy {
    _fetchData(url) {
        /*
         * @TODO - Uzupełnij tą metodę tak, aby zwracała Promise,
         * które spełnia się do rozkodowanego z JSON
         * obiektu. Wykorzystaj fetch() do pobrania zawartości z argumentu url.
         */
        return fetch(url).then(resp => resp.json())

    }

    constructor() {
        this.cache = {}

        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData(url).then(data => {
                    this.cache[url] = data;
                    return data;
                });
            }
        }
}

class ColorInput extends React.Component{
   constructor(props) {
      super(props);
      this.state = {
         value: colorArr[this.props.id]
      }
      fetch('http://www.thecolorapi.com/id?hex='+this.state.value.replace('#',""))
     .then(resp => {
         //console.log(resp);
         return resp.json()}
     )
     .then((arr) => {
         let color = arr.name;
         //console.log(color.value);
         this.setState({colorname: color.value})

     })
     .catch((err) => {
         //console.log(err);
         this.setState({title: "Error!!!"});
     });

   }
   handleChangeColor = (event)=>{
      this.setState({value: event.target.value});
      fetch('http://www.thecolorapi.com/id?hex='+this.state.value.replace('#',""))
     .then(resp => {
         //console.log(resp);
         return resp.json()}
     )
     .then((arr) => {
         let color = arr.name;
         //console.log(color.value);
         console.log(arrReplacer);
         this.setState({colorname: color.value})


     })
     .catch((err) => {
         //.log(err);
         this.setState({title: "Error!!!"});
     });
     arrReplacer[this.props.id]=(this.state.colorname);


   }
   render(){
      return <div><input type="color" value={this.state.value}  onChange={this.handleChangeColor}/>
      <ColorInfo value={this.state.value}/><span>{this.state.colorname}</span></div>
   }
}
    ReactDOM.render(
       <div className="colors">
        <ColorInput id='0'/>
        <ColorInput id='1'/>
        <ColorInput id='2'/>
        <br></br>
        <ColorInput id='4'/>
        <ColorInput id='6'/>
        <ColorInput id='7'/>
        <ColorInput id='8'/>
        </div>,
        document.getElementById('app')
    );
});
