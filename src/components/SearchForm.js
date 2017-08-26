import React from 'react';



export default class SearchForm extends React.Component{

	
	handleSubmit = e => {
		e.preventDefault();
		console.log(this.query.value);
		this.props.onSearch(this.query.value);
		e.currentTarget.reset();
	}

	render(){

		return(

			<div className="search p bg-dark">
				<form onSubmit={this.handleSubmit}>
				  <div className="input-group">
				      <input 
				      	onChange={this.onSearchChange} 
				      	type="text" 
				      	name="search" 
				      	ref = {(input) => this.query = input}
				      	className="form-control input-search" 
				      	placeholder="Search..." 
				      />
				      <span className="input-group-btn">
				          <button className="btn btn-primary" type="submit"><i className="fa fa-search"></i></button>
				      </span>
				  </div>
				</form>
          	</div>
		);
	}
}