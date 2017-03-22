import "./style.scss";
import React from 'react';
import ReactDOM from 'react-dom';

//function that randomize position in array

function randomize(arr){
   let currentIndex = diff        //number of colors
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
let diff=2;
let colorArr = ['blue','red','green','pink','yellow','orange','black','violet','grey']; //array with colors of text
let colorText = ['blue','red','green','pink','yellow','orange','black','violet','grey']; //array with words
let colorMainText = ['blue','red','green','pink','yellow','orange','black','violet','grey'];
// array with colors of main text
let answer = randomize(colorMainText)[0];
class Title extends React.Component{
   render(){
   return <h1>Color Game</h1>
   }
}
// class ColorPicker extends React.Component{
//    render(){
//       return <select>{colorArr.map((el)=>{return <option key={el}>{el}</option>})}</select>
//       }
// }
class Rules extends React.Component{
   render(){
      return <div><Title/><div  className='gameBody'>Clik on name of what color is word on the up
         <div onClick={this.props.mode}> back</div> </div> </div>
   }
}
class Option extends React.Component{
   constructor(){
      super();
      this.state = {
         difficult:["easy","medium","hard"],
         index: 0,
         diff: 2
      }
   }
   handleLevelDown(){
      if(this.state.index!=0){
      this.setState({
         index: this.state.index-1,
      })
      diff=diff-3;
   }
   }
   handleLevelUp(){
      if(this.state.index!=2){
      this.setState({
         index: this.state.index+1,
         })
      diff=diff+3;
   }
   }
   render(){
      return <div><Title/><div  className='gameBody'>
         <div className="difficult"><div>difficult</div>
            <div onClick={()=>{this.handleLevelDown()}} >&#8592;</div><div>{this.state.difficult[this.state.index]}</div>
            <div onClick={()=>{this.handleLevelUp()}}>&#8594;</div></div>




            <div onClick={this.props.mode}> back</div>

         </div>

         </div>
   }
}
class MainColor extends React.Component{
   constructor(props){
      super(props);
      this.state={
         color: randomize(colorArr),
         colorText: colorText,
         answer: this.props.answer
      }
   }
      render(){
            return <span style={{color: `${this.props.answer}`}}>{this.state.colorText[0]}</span>;
   }
}
class GameTime extends React.Component{
   constructor(props){
   super(props)
   this.state = {
      counter: 10,
      score: this.props.score,
      wrong: this.props.wrong,
      over: 0
   }
   }
   handleRestart(){
      this.setState({
         over:0,
         score:0,
         counter:10
      })
      this.props.restart();
      this.timerId= setInterval(()=>{
      this.setState(
        { counter : this.state.counter-1 }
        , this.clear
      );
    },1000);
      }
   clear(){
     if(this.state.counter == 0){
       clearInterval(this.timerId);
       this.setState({
          counter: 10,
          over:1
       })
     }
  }
  componentDidMount() {
     this.timerId= setInterval(()=>{
      this.setState(
        { counter : this.state.counter-1 }
        , this.clear
      );
    },1000);
  }
  componentWillUnmount(){
    clearInterval(this.timerId);
  }
  render(){
     if (this.state.over != 1){
         return <div>
            <div><span>{this.state.counter}S</span><span>Good:{this.props.score}</span><span>Wrong: {this.props.wrong}</span></div>
            </div>
         }
         else{
             return <div className='out'><div><span>Score: {this.props.score-this.props.wrong}</span></div><div onClick={()=>this.handleRestart()}>Play Again </div><div></div></div>
      }
      }
}
class GameCore extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      score: 0,
      wrong: 0,
      color: colorArr,
      colorText: colorText,
      answer: colorMainText[0],
      mode:0,
      start: "start game",
      diff: 4
    }
}
componentWillMount() {
   console.log(diff);
   this.setState({
      diff: diff
   });
}

handleStart = ()=>{
      this.setState({
         mode: 1,
         score: 0,
         wrong: 0
      })
   }
   handleRules = ()=>{
     this.setState({
        mode: 3,
     })
  }
  handleOption = ()=>{
    this.setState({
      mode: 2,
    })
    diff=2;
}
   handleMenu = ()=>{
     this.setState({
        mode: 0,
        score: 0,
       wrong: 0
     })
  }
    handleClick = (i)=>{
      if (this.state.colorText[i]==this.state.answer){
         this.setState({
            score: this.state.score+1,
            color: randomize(colorArr),
            colorText: randomize(colorText),
            answer: randomize(colorMainText)[0]
         })
      }
      else{
      this.setState({wrong: this.state.wrong+1,
         color: randomize(colorArr),
         colorText: randomize(colorText),
         answer: randomize(colorMainText)[0],

      })
      }
   }

  render(){

         if (this.state.mode == 0){
            return <div><Title/><div  className='gameBody' ><div onClick={this.handleStart}>{this.state.start}</div><div onClick = {this.handleOption} >options</div><div onClick = {this.handleRules}>Instruction</div></div></div>
         }
         else if(this.state.mode == 2){
            return <Option mode = {()=>this.handleMenu()} diff={this.state.diff}/>
         }
         else if(this.state.mode == 3){
            return <Rules mode= {()=>this.handleMenu()}/>
         }
         else{
         return <div><Title/><div className="gameBody">
            <GameTime className="gameNav" wrong = {this.state.wrong} score = {this.state.score}
               restart = {()=>this.handleStart()}/>
            <div><MainColor answer={this.state.answer}/></div>
<div><div>
               {console.log(diff)}
                 {this.state.color.map((el,i)=>{
                   if(i>diff){
                     return null;
                  }
                   else{
                     if(i == 2||i == 5){
                        return <span key = {this.state.color[i]} style = {{color: el}}  onClick = {()=>this.handleClick(i)}>{this.state.colorText[i]}<br/></span>;
                        }
                     else{
                        return <span key = {this.state.color[i]} style = {{color: el}}  onClick = {()=>this.handleClick(i)}>{this.state.colorText[i]}</span>;
                     }
                     }
               })}
               </div></div>
            <div onClick = {this.handleMenu}>back</div>
         </div></div>
  }
}
}
class App extends React.Component{
  render(){
      return <GameCore/>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
      <App/>,
        document.getElementById('app')
    );
});
