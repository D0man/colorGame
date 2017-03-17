import React from 'react';
import ReactDOM from 'react-dom';

function randomize(arr){
   let currentIndex = 3        //arr.length jak wiecej kolorow
   let randomIndex = 0;
   let temp = 3;
   while(currentIndex != 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      temp = arr[currentIndex];
      arr[currentIndex] =arr[randomIndex];
      arr[randomIndex] = temp;
   }
   return arr;
}
let colorArr =['blue','red','green','pink'];


class Click extends React.Component{
  handleClick = ()=>{
    if ( typeof this.props.countClick === 'function' ){
      this.props.countClick();
    }
  }
  render(){
    return<div>
      <button style={{backgroundColor:`${randomize(colorArr)[0]}`}} onClick={this.handleClick}>x</button>
      </div>
  }
}
//Maliczyć ile razy dzieci zostały klikniete
class App extends React.Component{
  constructor(props){
    super(props);
    //info o ilosci klikniec
    this.state={
      counter : 0,
      counter1: 0,
      napis: 'napis',
      color: randomize(colorArr)[0],
      color2: colorArr[1],
      color3:colorArr[2]
    };
  }
  //wywolanie tej funkcji zwieksza ilosc klikniec o 1
  //jest to => dlatego zawsze bedzie wykonywana w kontekscie
  //w ktorym jest napisana
  countClickFunc=()=>{
     console.log(this.state.color);
     if (this.state.color=="blue"){
    this.setState({
      counter:this.state.counter+1,
      napis: 'text',
      color: randomize(colorArr)[0],
      color2: randomize(colorArr)[0]
   });
}
else{
   this.setState({
     counter1:this.state.counter1+1,
     napis: 'text',
     color: randomize(colorArr)[0],
     color2: randomize(colorArr)[0]
  });
}
  }
  render(){
    //Komponentom ButtonToClick przekazujemy metode countClickFunc
    //Korzystajac z atrybutu countClick
    // ButtonToClick otrzymuje takie props
    //{countClick : ButtonCounter.countClickFunc}
    return<div>
      <h1>dobrze{this.state.counter}  zle{this.state.counter1}</h1>
      <h2 style={{color:this.state.color}}>{this.state.napis}</h2>
      <div><Click countClick={this.countClickFunc}/><Click countClick={this.countClickFunc}/><Click countClick={this.countClickFunc}/></div>
      </div>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
