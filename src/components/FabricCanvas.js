import React from 'react';
import {fabric} from 'fabric';
import onClickOutside from 'react-onclickoutside'
import {Button} from 'react-bootstrap';

import StylerComponent from './StylerComponent'

// Things Needed to fill in the form
/******************
1. Selected Fabric Object()
2. Select Preview -- > not required yet
3. Selected Character Spacing
4. Selected Font Family
5. Selected Font Size
6. Selected Line Height
7. Selected Object
8. Selected Object type
9. Selected ScaleX and ScaleY
10. Selection Cleared..
11. Selected Shadow
********************/


// Global Canvas Variable
var the_canvas;
 
class FabricCanvas extends React.Component{

	constructor(props){

		super(props);

		this.state = {

			// For Selected Object
			selected_object : null, //Objec
			isCanvasLoading: false,
			// backgroundImage: './img/bg-canvas.png'

		}
		
	}



	componentDidMount(){

		// Make a New Canvas
		the_canvas = new fabric.Canvas('main-canvas', {
			height:604,
			width:279,
		});

		// Customised Controls
		fabric.Object.prototype['setControlVisible']('mb', false);
		fabric.Object.prototype['setControlVisible']('ml', false);
		fabric.Object.prototype['setControlVisible']('mr', false);
		fabric.Object.prototype['setControlVisible']('mt', false);

		fabric.Object.prototype.set({
    		transparentCorners: false,
    		borderColor: '#48b7ef',
    		cornerColor: '#48b7ef',
    		cornerStyle: 'circle',
    		cornerSize: 8,
    		padding : '3',
    		setConrolVisible : false,
    		borderDashArray : [5,10],
    		rotatingPointOffset :24 
		})


		fabric.Text.prototype._renderText = function(ctx) {

		   	this._renderTextFill(ctx)
  			this._renderTextStroke(ctx)
  			this._renderTextFill(ctx)
  			
		};


		// // Will Be Removed Later
		// var text = new fabric.IText('Manchester', { 
		// 	left: 50, 
		// 	top: 100, 
		// 	fill: 'red',
		// 	fontSize:59, 
		// 	scaleX: 0.7, 
		// 	scaleY:0.7,
	 // 		stroke: 'orange',
  // 			strokeWidth: 14,
		// 	strokelineCap: "butt"});
		// the_canvas.add(text);
		// var text = new fabric.Text('Hello world', { 
		// 	left: 50,
		// 	top: 50,
		// 	fontSize:59,
		// 	fontFamily: 'Nexa Bold',
		// 	strokeWidth: 0, 
		// })
		// //text.setShadow({ color: 'rgba(0,0,0,1)', blur : '12', offsetX: '2', offsetY : '2'  });
		// the_canvas.add(text)


		// On object Selection
		the_canvas.on('object:selected', this.handleObjectSelection)
		the_canvas.on('selection:cleared', this.handleObjectCleared)


	}

	

	componentWillReceiveProps = (newprops) =>{
		
		if(newprops.image != this.props.image){
			this.updateCanvasforImage(newprops.image);
		}
		if(newprops.template != this.props.template){
			this.updateCanvas(newprops.template);
		}
	}

	saveToCanvas = () => {

        let link = document.createElement("a");
        link.href = the_canvas.toDataURL({format: 'png'});
        link.download = "filter.png";
        link.click();

    }

	updateCanvasforImage = (the_image) => {
		if(the_image){
			fabric.Image.fromURL(the_image.preview, function(myImg) {
 				the_canvas.add(myImg); 
			});
		}
	}


	updateCanvas = (the_template) =>{

  			
  		if(the_template != null){
  			
  			this.setState({isCanvasLoading: true}, () => {
  			if(the_template != null){
  				
  				// console.log(the_template.serialized_content["objects"])
  				// console.log(the_template.serialized_content.objects)
  				// console.log(the_template.preview)
  				var aurl = 'http://pepperfilters.com' + the_template.background_url
  				aurl = aurl.replace(/ /g,"%20");
  				// aurl = encodeURIComponent(aurl.trim())
  				// url = decodeURIComponent(url);
  				console.log(aurl)

  				this.setState({backgroundImage: aurl})


  				the_canvas.loadFromJSON(the_template.serialized_content, () => {
  					this.setState({isCanvasLoading :false});
  					// console.log(this.state.isCanvasLoading,'2');
  					
  				});
  				
  			}

  			});
  		}


  		
  	}


	// Handle Events After Object Selection
	handleObjectSelection = () => {

		// Get Object Type:
		this.setState({
			selected_object : the_canvas.getActiveObject(), //Object
		});

	}


	// Handle Events After Cleared -> Not when moved from one object to another
	handleObjectCleared = () => {

		this.setState({
			selected_object : null,
		});

	}

	// Handle Events After Object Modification
	handleObjectModification = () => {

	}


	// For Handling Clicks outside the component

	handleClickOutside = () => {
  	
    	// Render Only if there is an active object
    	if(the_canvas.getActiveObject()){
    		the_canvas.discardActiveObject().renderAll();
    	}
  	}
	



	// Form Element Items
  	onFontSizeChange = (the_value) => {

  		this.state.selected_object.set({fontSize: the_value});
  		this.setState(this.state);
  		the_canvas.renderAll();
  		
  	}

  	onTextColorChange = (the_value) => {

  		this.state.selected_object.set({fill: the_value.hex});
  		this.setState(this.state);
  		the_canvas.renderAll();

  	}

  	onFontFamilyChange = (the_value) => {

  		this.state.selected_object.set({fontFamily: the_value});
  		this.setState(this.state);
  		the_canvas.renderAll();

  	}

  	onObjectDelete = () => {
		
		
		the_canvas.getActiveObject().remove();
		this.setState({selected_object : null});
  		the_canvas.renderAll();

  	}

  	onObjectCopy = () => {

	    var Aobj = the_canvas.getActiveObject(); //canLayer.item(0);
	    Aobj.clone(function (o) {
	        var vobj = o;
	        if (vobj) {
	            vobj.set({
	                left: 14,
	                top: 14
	            });
	            the_canvas.add(vobj);
	            the_canvas.renderAll();
	            the_canvas.calcOffset();
	        } else {
	            alert("Sorry Object Not Initialized");
	        }
	    });

  	}

  	onLineHeightChange = (the_value) => {
  		// This one's too sensitive
  		this.state.selected_object.set({lineHeight: the_value});
  		this.setState(this.state);
  		the_canvas.renderAll();
  	}

  	onLetterSpacingChange = (the_value) => {
  		this.state.selected_object.set({charSpacing: the_value});
  		this.setState(this.state);
  		the_canvas.renderAll();	
  	}

  	onStrokeColorChange = (the_value) => {
  		this.state.selected_object.set({stroke: the_value.hex});
  		this.setState(this.state);
  		the_canvas.renderAll();	
  	}

  	onStrokeWidthChange = (the_value) => {
  		

  		//Stroke Details // These Should be the default values
  		let temp = {
  			strokeWidth : the_value,
  			strokeLineCap:"butt",
			strokeLineJoin:"round",
			strokeMiterLimit:5,
		}
		
		if(this.state.selected_object.stroke === null){
		
			temp.stroke = "purple";
		}


  		this.state.selected_object.set(temp);
  		this.setState(this.state);
  		the_canvas.renderAll();	
  	}

  	onShadowColorChange = (the_value) => {

  		// If there's no shadow:
  		if(this.state.selected_object.shadow === null){
  			// Add a white shadow of size 1px and color of black
  			this.state.selected_object.set({shadow:`1px 1px 2px ${the_value.hex}`});
  			this.setState(this.state);
  			the_canvas.renderAll();
  			return;
  		}

  		let temp = {
  			color: the_value.hex,
  			blur: this.state.selected_object.shadow.blur,
  			offsetX:this.state.selected_object.shadow.offsetX,
  			offsetY:this.state.selected_object.shadow.offsetY,
  		}

  		this.state.selected_object.setShadow(temp);
		this.setState(this.state);
  		the_canvas.renderAll();

  	}

  	onShadowSizeChange = (the_value) => {

  		// If the shadow's empty
  		if(this.state.selected_object.shadow === null){
	  		this.state.selected_object.set({shadow: `1px 1px ${the_value} black`});
			this.setState(this.state);
	  		the_canvas.renderAll();
	  		return;
  		}


  		let temp = {
  			color:this.state.selected_object.shadow.color,
  			blur: the_value,
  			offsetX:this.state.selected_object.shadow.offsetX,
  			offsetY:this.state.selected_object.shadow.offsetY,
  		}

  		this.state.selected_object.setShadow(temp);
		this.setState(this.state);
  		the_canvas.renderAll();

  	}

  	onOffsetXChange = (the_value) =>{

  		// If the shadow's empty
  		if(this.state.selected_object.shadow === null){
	  		this.state.selected_object.set({shadow: `${the_value} 1px 2px red`});
			this.setState(this.state);
	  		the_canvas.renderAll();
	  		return;
  		}


  		let temp = {
  			color:this.state.selected_object.shadow.color,
  			blur: this.state.selected_object.shadow.blur,
  			offsetX:the_value,
  			offsetY:this.state.selected_object.shadow.offsetY,
  		}

  		this.state.selected_object.setShadow(temp);
		this.setState(this.state);
  		the_canvas.renderAll();

  	}

  	onOffsetYChange = (the_value) =>{

  		// If the shadow's empty
  		if(this.state.selected_object.shadow === null){
	  		this.state.selected_object.set({shadow: `1px ${the_value} 2px red`});
			this.setState(this.state);
	  		the_canvas.renderAll();
	  		return;
  		}


  		let temp = {
  			color:this.state.selected_object.shadow.color,
  			blur: this.state.selected_object.shadow.blur,
  			offsetX:this.state.selected_object.shadow.offsetX,
  			offsetY:the_value,
  		}

  		this.state.selected_object.setShadow(temp);
		this.setState(this.state);
  		the_canvas.renderAll();

  	}



  	

	render(){
		
		return (
			<div className= "main-canvas-container">
				{
					this.state.selected_object ?
					<StylerComponent 
						selected_object = {this.state.selected_object}
						onFontSizeChange={this.onFontSizeChange}
						onTextColorChange = {this.onTextColorChange}
						onFontFamilyChange = {this.onFontFamilyChange}
						onObjectCopy = {this.onObjectCopy}
						onObjectDelete = {this.onObjectDelete}
						onLineHeightChange= {this.onLineHeightChange}
						onLetterSpacingChange = {this.onLetterSpacingChange}
						onStrokeColorChange = {this.onStrokeColorChange}
						onStrokeWidthChange = {this.onStrokeWidthChange}
						onShadowColorChange = {this.onShadowColorChange}
						onShadowSizeChange = {this.onShadowSizeChange}
						onOffsetXChange = {this.onOffsetXChange}
						onOffsetYChange = {this.onOffsetYChange}
					/>
					:
					null
				}

				{
				this.state.isCanvasLoading ?
					<div className="pre_loader" style={{position:'absolute',width:'270px', zIndex: 10000, top:'300px'}}>
						<p className="text-center" style={{fontSize:'40px'}}> <i className="fa fa-spinner fa-spin"/> </p>
					</div>
				: null
				}
				
				<canvas id= 'main-canvas' style={{backgroundImage: `url(${this.state.backgroundImage})` }} >
				</canvas>
				<br/><br/>
				 <Button bsStyle="warning" onClick = {this.saveToCanvas} bsSize="large" block>
                    Download Filter
                  </Button>
			</div>
		);

	}
}


// export default FabricCanvas;
export default onClickOutside(FabricCanvas);