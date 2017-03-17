import "./style.scss";
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
let intro = true;
let colorArr =['blue','red','green','pink'];
let colorText =['blue','red','green','pink'];
let colorMainText=['blue','red','green','pink'];
let answer=randomize(colorMainText)[0];
// class RandomColor extends React.Component{
//    constructor(props){
//       super(props);
//       this.state={
//       color: colorArr,
//       colorText: colorText,
//       score: 0,
//       wrong: 0
//       }
//    }
//    handleClick = (i)=>{
//       if (this.state.color[i]=="red"){
//          this.setState({score: this.state.score+1})
//          console.log("dobrze:"+ this.state.score);
//       }
//       else{
//       this.setState({wrong: this.state.wrong+1})
//       console.log("zle:"+this.state.wrong);
//       }
//    }
//       render(){
//       randomize(colorArr);
//       randomize(colorText);
//       return <div>
//            {this.state.color.map((el,i)=>{
//              if(i>2)
//                return null;
//              else
//                return <span key={this.state.color[i]} style={{color: el}}  onClick={()=>this.handleClick(i)} >{this.state.colorText[i]}</span>;
//          })}
//          </div>
//    }
// }
// class Intro extends React.Component{
//    constructor(props){
//    super(props);
//    this.state={
//       napis: "start game"
//    }
// }
// render(){
//    return }
// }
class MainColor extends React.Component{
   constructor(props){
      super(props);
      this.state={
         color: randomize(colorArr),
         colorText: randomize(colorText),
         answer: this.props.answer
      }
   }
      render(){
            //answer = randomize(colorMainText)[0];
            return <span style={{color: `${this.props.answer}`}}>{this.state.colorText[0]}</span>;
   }
}
class GameTime extends React.Component{
   constructor(props){
   super(props)
   this.state ={
      counter: 30,
      score: this.props.score,
      wrong: this.props.wrong
   }
   }
   clear(){
     if(this.state.counter == 0){
       clearInterval(this.timerId);
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
     if (this.state.counter!=0){
         return <div>
            <div><span>{this.state.counter}S</span><span>Good:{this.props.score}</span><span>Wrong: {this.props.wrong}</span></div>
            </div>
         }
         else{
             return <div className='out'><div><span>Score: {this.props.score-this.props.wrong}</span></div><div>Play Again (push f5)</div><div>HighScore (nie dziala)</div></div>
      }
      }
}
class GameCore extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      score: 0,
      wrong: 0,
      color: randomize(colorArr),
      colorText: randomize(colorText),
      answer: randomize(colorMainText)[0],
      intro:true,
      napis: "start game"

    }
    console.log(this.state.colorText[0]);
    console.log(this.state.colorText[1]);
    console.log(this.state.colorText[2]);
    console.log("odpowiedz:"+this.state.answer);
}
    handleStart = ()=>{
      this.setState({
         intro: false
      })
   }
    handleClick = (i)=>{
      console.log(this.state.colorText[i]);
      console.log(this.state.colorText[0]);
      console.log(this.state.colorText[1]);
      console.log(this.state.colorText[2]);

      console.log("odpowiedz po kliku:"+this.state.answer);
      if (this.state.colorText[i]==this.state.answer){

         this.setState({
            score: this.state.score+1,
            color: randomize(colorArr),
            colorText: randomize(colorText),
            answer: randomize(colorMainText)[0]
         })
         //console.log("dobrze:"+ this.state.score);
      }
      else{
      this.setState({wrong: this.state.wrong+1,
         color: randomize(colorArr),
         colorText: randomize(colorText),
         answer: randomize(colorMainText)[0],
      })
      //console.log("zle:"+this.state.wrong);
      }
   }

  render(){
     console.log(this.state.intro);
         if (this.state.intro){
            return <div  className='gameBody' onClick={this.handleStart}><div>{this.state.napis}</div><div></div></div>
         }
         else{
         return <div className="gameBody">
            <GameTime className="gameNav" wrong={this.state.wrong} score={this.state.score}/>
            <div><MainColor answer={this.state.answer}/></div>
            <div><div>
                 {this.state.color.map((el,i)=>{
                   if(i>2)
                     return null;
                   else
                     return <span key={this.state.color[i]} style={{color: el}}  onClick={()=>this.handleClick(i)} >{this.state.colorText[i]}</span>;
               })}
               </div></div>
         </div>
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
