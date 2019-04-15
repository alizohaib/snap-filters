import React from 'react';
import {fabric} from 'fabric';
import Dropzone from 'react-dropzone'


export default class ImageUpload extends React.Component{

	constructor() {
	    super()
	    this.state = {
	      accepted: null,
	      rejected: null
	    }
  	}
  	onDrop = (accepted,rejected) =>{
  		console.log(rejected);
  		this.setState({
  			accept: accepted[0],
  			rejected: rejected[0]
  		})
  		this.props.addToCanvas(accepted[0]);
  	}

  	render() {

  		var style = {
  			background: '#232323',
  			textAlign: 'center',
  			border: '1px dashed rgba(255,255,255,0.1)',
  			borderRadius: '10px',
  			padding: '50px 10px',
  			marginBottom:'10px',

  		}

	    return (
	      <section>
	        <div className="dropzone">
	          <Dropzone
	          	style={style}
	            accept="image/svg, image/png"
	            onDrop={this.onDrop}
	          >
				
	            <p>Drag files here or click to upload.</p>
	            <p>Only *.svg and *.png images will be accepted</p>
	            <button className ="btn btn-success"> <i className="fa fa-plus-circle"/> Upload Media </button> 
	          </Dropzone>
	        </div>
	        <aside style={{textAlign:'center'}}>     
	          
	            {
	            	(this.state.rejected != null)
	            	? 'File was not is not in the right format. Please upload svg or png images'
	            	: null
	            }
	          
	        </aside>
	      </section>
	    );
  	}
}