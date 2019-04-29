import React, { Component } from 'react';
import FabricCanvas from './components/FabricCanvas';
import axios from 'axios';
import TemplateList from './components/TemplateList';
import SearchForm from './components/SearchForm';

// import { BlockPicker } from 'react-color';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Img from './img/img.png';
import ImageUpload from './components/ImageUpload';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      templates : [],
      loadingTemplates : true,
      activeTemplate: null,
      activeImage: null,
    };
  }

  componentDidMount(){

    this.performSearch();

  }

  performSearch = (query = 'donkey') => {

    axios.get(`https://www.pepperfilters.com/api/templates/All/8/0`)
      .then(response => {
        
        // const hey = response.data;
        // let start = "https://pepperfilters.com";
        // var count;
        // hey.forEach( (element) => {
        
        //   // let link = document.createElement("a");
        //   // link.href = start.concat(element.background_url) ;
          
        //   // link.download = "avatar.png";
        //   // link.click();
        //   // console.log(link);
          
        //   const innerelements = JSON.parse(element.serialized_content);
        //   const innn = innerelements.objects;
        //   innn.forEach( (inner_e) => {

        //     const str = inner_e.src;
        //     if(str && str.includes('hidden_template_items')){
              

        //       let link = document.createElement("a");
        //       if( !str.includes('http') ){
        //         link.href = start.concat(str);
        //       }else{
        //       link.href = str;
        //       }
        //       link.download = 'avatar.png';
        //       link.click();

        //       console.log(str);
        //     }

        //   } );


        // });



        this.setState({
          templates : response.data,
          loadingTemplates: false
        })
      })
      .catch(error => {

        console.log("Error in tracing data", error);

      });

  }

  something = (e) => {
    this.setState({loadingTemplates:true});
    this.performSearch('cats');
  }

  addtocanvas = (the_thing) =>{

    // this.activeTemplate = the_thing;
    // console.log(this.activeTemplate);
    
    console.log(the_thing)

    // console.log(the_thing);
    this.setState({activeTemplate: the_thing})    
    // console.log(this.state)
  }
  addImagetoCanvas = (the_image) => {

    this.setState({activeImage : the_image});
  }

  render() {
    return (
      <div className="App">
        
        <nav className="navbar navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#" >

                <img src="https://lensfilters.live/wp-content/uploads/2018/01/lensfilters-snapchat-augmented-reality-filter-lens-maker-2.png" />

              </a>

            </div>
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                
              </ul>
              <ul className="nav navbar-nav navbar-right">
              </ul>
            </div>
          </div>
        </nav>

        <div className="content-editor container">
          <div className ="row">
            
            <div className="col-md-7">
              <div className="panel panel-transparent" >
                
             

                <div className="panel-body">

                  

                  <div role="tabpanel">
                    
                    <ul className="nav nav-tabs nav-justified " role="tablist">
                      <li role="presentation" className="active "><a  href="#tab21" role="tab" data-toggle="tab" aria-expanded="true"><i className="fa fa-file" /> Templates</a></li>
                      <li role="presentation" className=""><a onClick = {this.something} href="#tab21" role="tab" data-toggle="tab" aria-expanded="false"><i className="fa fa-file-image-o" /> Graphics</a></li>
                      <li role="presentation" className=""><a href="#tab23" role="tab" data-toggle="tab" aria-expanded="false"><i className="fa fa-bold" /> Upload</a></li>
                      
                    </ul>
                    
                    <SearchForm onSearch ={this.performSearch} />


                    <div className="post-options bg-dark dark">
                      


                      <a href="#"><i className="glyphicon glyphicon-fire"></i> Trending <span className="badge badge-danger pull-right m-l-xs">NEW</span></a>
                      <a href="#"><i className="glyphicon glyphicon-flash"></i> Popular</a>
                      <a href="#"><i className="glyphicon glyphicon-gift"></i> Birthday</a>
                      <a href="#"><i className="glyphicon glyphicon-heart"></i> Wedding</a>
                    

                      
                    </div>
                    

                    <div className="tab-content bg-dark">

                      
                      <div role="tabpanel" className="tab-pane fade active in" id="tab21">
                        
                        {
                          (this.state.loadingTemplates) 
                          ? <p className="text-center"> <i className="fa fa-spinner fa-spin"/> </p>
                          :<TemplateList 
                            data={this.state.templates} 
                            addtocanvas ={this.addtocanvas}/>


                        }


                      </div>
                      
                      

                      <div role="tabpanel" className="tab-pane fade" id="tab23">
                          <ImageUpload addToCanvas = {this.addImagetoCanvas}/>

                      </div>
                      
                    </div>
                  </div>
                </div>



              
              </div>
            </div>

            <div className="col-md-5">
                <FabricCanvas 
                  template = {this.state.activeTemplate}
                  image = {this.state.activeImage}

                />
            </div>

          </div>
        </div>


      </div>
    );
  }
}

export default App;


