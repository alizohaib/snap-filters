import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import ColorPickerMaa from './ColorPicker'
import FontList from '../fonts/list.json'


// Importing React Select
import Select from 'react-select';
import 'react-select/dist/react-select.css';


class StylerComponent extends React.Component{

	render(){
		return (

			<div className="modala">

				<div className="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                      <div className="panel panel-default">
                          <div className="panel-heading" role="tab" id="headingOne">
                              <h4 className="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne" className="collapsed">
                                      Font Changes
                                  </a>
                              </h4>
                          </div>
                          <div id="collapseOne" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingOne" aria-expanded="false" >
                            <div className="panel-body">
                              	Font Size:
								<Slider 
									defaultValue={this.props.selected_object.fontSize} 
									value = {this.props.selected_object.fontSize}
									onChange = {this.props.onFontSizeChange}
									included = {true}	
								/>				
							
								Color: 
								<ColorPickerMaa 
									color = {this.props.selected_object.fill}
									onChange = {this.props.onTextColorChange}
								/>

							
								Font Family:
							
								<Select 
								  name="form-field-name"
								  value={this.props.selected_object.fontFamily}
								  options={FontList}
								  simpleValue
								  onChange={this.props.onFontFamilyChange}
								  clearable = {false}
								/>
                        	</div>
                          </div>
                      </div>
                      <div className="panel panel-default">
                          <div className="panel-heading" role="tab" id="headingTwo">
                              <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                      Shadow
                                  </a>
                              </h4>
                          </div>
                          <div id="collapseTwo" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo" aria-expanded="false">
                            	<div className="panel-body">
                             		
									Shadow Color: 
									<ColorPickerMaa 
										color = {this.props.selected_object.shadow === null ? 'purple' : this.props.selected_object.shadow.color}
										onChange = {this.props.onShadowColorChange}
									/>

									Shadow Size: {this.props.selected_object.shadow === null ? 0 :this.props.selected_object.shadow.blur}
									<Slider 
										defaultValue={this.props.selected_object.shadow === null ? 0 : this.props.selected_object.shadow.blur} 
										value = {this.props.selected_object.shadow === null ? 0 : this.props.selected_object.shadow.blur}
										onChange = {this.props.onShadowSizeChange}
										
									/>

									OffsetX:
									<Slider 
										defaultValue={this.props.selected_object.shadow === null ? 0 : this.props.selected_object.shadow.offsetX} 
										value = {this.props.selected_object.shadow === null ? 0 : this.props.selected_object.shadow.offsetX}
										onChange = {this.props.onOffsetXChange}
										min={-15}
										max = {15}
										
									/>

									OffsetY:
									<Slider 
										defaultValue={this.props.selected_object.shadow === null ? 0 : this.props.selected_object.shadow.offsetY} 
										value = {this.props.selected_object.shadow === null ? 0 : this.props.selected_object.shadow.offsetY}
										onChange = {this.props.onOffsetYChange}
										min={-15}
										max = {15}
										
									/>
                            	</div>
                          </div>
                      </div>
                      <div className="panel panel-default">
                          <div className="panel-heading" role="tab" id="headingThree">
                              <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                      Stroke
                                  </a>
                              </h4>
                          </div>
                          <div id="collapseThree" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree" aria-expanded="false">
                              <div className="panel-body">
                                  	Stroke Color:
									<ColorPickerMaa 
										color = {this.props.selected_object.stroke === null ? 'purple' : this.props.selected_object.stroke}
										onChange = {this.props.onStrokeColorChange}
									/>
								
									Stroke Size :  {this.props.selected_object.strokeWidth}
									<Slider 
										defaultValue={this.props.selected_object.strokeWidth} 
										value = {this.props.selected_object.strokeWidth}
										onChange = {this.props.onStrokeWidthChange}
										included = {true}
										max = {15}
									/>
                              </div>
                          </div>
                      </div>
                      <div className="panel panel-default">
                          <div className="panel-heading" role="tab" id="headingFour">
                              <h4 className="panel-title">
                                  <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                      Spacing
                                  </a>
                              </h4>
                          </div>
                          <div id="collapseFour" className="panel-collapse collapse" role="tabpanel" aria-labelledby="headingFour" aria-expanded="false">
                              <div className="panel-body">
                                  	Line Height:
									<Slider 
										defaultValue={this.props.selected_object.lineHeight} 
										value = {this.props.selected_object.lineHeight}
										onChange = {this.props.onLineHeightChange}
										included = {true}
										min = {1}
										max = {5}
									/>
									
									Letter Spacing:
									<Slider 
										defaultValue={this.props.selected_object.charSpacing} 
										value = {this.props.selected_object.charSpacing}
										onChange = {this.props.onLetterSpacingChange}
										included = {true}	
									/>	
                              </div>
                          </div>
                      </div>
                </div>

				
				

                <div className="btn-toolbar">
				
					<button type="button" onClick={this.props.onObjectCopy} className="btn btn-primary btn-addon btn-sm m-b-sm"><i className="fa fa-copy"></i> COPY</button>
					<button type="button" onClick={this.props.onObjectDelete} className="btn btn-primary btn-addon btn-sm m-b-sm"><i className="fa fa-trash"></i> DELETE</button>  

				</div>
				
				<button type="button" onClick={this.props.onSaveCanvas} className="btn btn-primary btn-addon btn-sm m-b-sm"><i className="fa fa-save"></i> Save</button>
          

			</div>

		);
	}

}

export default StylerComponent;