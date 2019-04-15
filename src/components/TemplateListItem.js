import React from 'react';


export default class TemplateListItem extends React.Component{


	localAddToCanvas = (e) => {
		e.preventDefault();
		// <img src={this.props.url} alt="..." />
		// Sanitised Text goes in this function
		this.props.addToCanvas(this.props.sanitisedText);
	}
	render(){

		return(

			<div className="col-xs-6 col-md-3">
                <a href="#" className="thumbnail" onClick={this.localAddToCanvas}>

                	<img src={this.props.url} />
                	
                </a>
            </div>
		);
	}
}