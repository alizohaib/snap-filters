import React from 'react';
import { TwitterPicker } from 'react-color';
//Twitter Picker for color

class ColorPickerMaa extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      displayPicker :false,
      color: this.props.color
    }

  }

  componentWillReceiveProps(nextProps){

    if(this.props.color !== nextProps.color){
      this.setState({color: nextProps.color})
    }

  }

  handleClick = () => {
    this.setState({ displayPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState( {displayPicker : false} )
  }
 

  render(){

    return(
      <div>
        <div style ={ 
            { width:'50px', 
              height:'30px', 
              background:this.state.color,
              cursor: 'pointer',
              borderRadius: '5px', 
              boxShadow: 'rgba(125, 125, 125, 0.227) 0px 8px 24px 0px'
            
            } }

              onClick = {this.handleClick} 

        />

        {this.state.displayPicker ? 
            
            <div style={{position:'absolute',zIndex:'999'}}>
              <div style = {{position:'fixed', top:'0px', right:'0px', bottom:'0px', left:'0px'}} onClick = {this.handleClose}/>
              <TwitterPicker 
                color={ this.state.color } 
                onChange={this.props.onChange}
              />
            </div> 

            : null
        }

      </div>
    );
  }


}

export default ColorPickerMaa;