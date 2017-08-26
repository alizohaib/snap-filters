import React from 'react';
import TemplateListItem from './TemplateListItem';

// Check condition when nothing is available in the result

export default class TemplateList extends React.Component{


	render(){

		console.log(this.props.data)
		
		const results = this.props.data;

		let templates = results.map(item =>



			<TemplateListItem 
				url={`https://pepperfilters.com/${item.preview}`} 
				addToCanvas = {this.props.addtocanvas}
				sanitisedText = {item}
				key={item.id}
				/>

		);

		
		return(

			<div className="row">
               {templates}   
            </div>    

			);
	}
}